import { useState, useContext, useEffect} from 'react'
import cn from 'classnames'
import { useFormContext } from 'react-hook-form'
import InputField from '../fieldTypes/inputField'
import { RPCDataSetContext } from '../RPCDataSetContext'
import { EditButton } from '../components/EditButton'
import { useImmer } from 'use-immer';
import { useGetEmployeesAndPositions } from '../queries/autofill.hooks'

export default function EmployeeSelector(props) {

	const dataset = useContext(RPCDataSetContext)

	const toggleMode = () => (props.sectionState.selectEmployee == 'edit') ? props.doSetSectionState('view') : props.doSetSectionState('edit')


	const { register, formState: { errors }, control, watch, setValue, getValues } = useFormContext()
	const [allEmployees, setAllEmployees] = useState([])
	const [allPositions, setAllPositions] = useState([])
	const [employeesFixed, setEmployeesFixed] = useState([])


	const [searchOptions, setSearchOptions] = useImmer({
		includeAllEmployees: false,
		includeFormerEmployees: false
	})



	const { status, data: employeesAndPositions, error, isFetching, isLoading } = 
		useGetEmployeesAndPositions(
			props.selectedDepartment.id, 
			searchOptions.includeAllEmployees
		);

	useEffect(() => {
		props.doSetAllEmployees(employeesAndPositions?.employees)
	}, [employeesAndPositions]);





	const currentAndPastEmployees = employeesAndPositions?.employees?.map(item => ({ label: `${item.firstName} ${item.lastName}`, value: item.id }))

	const currentEmployees = employeesAndPositions?.employees?.filter(x => x?.positions?.some(item => item?.status != 0)).map(item => ({ label: `${item.firstName} ${item.lastName}`, value: item.id }))


	useEffect(() => {
		if(Object.keys(props.selectedDepartment).length > 0)
		{
			props.doSetSectionState('edit')
		}
	}, [props.selectedDepartment])

	useEffect(() => {
		//bulk can never include former employees
		if(searchOptions.includeFormerEmployees && props.sectionState.rpcType != 'bulk')
		{
			setEmployeesFixed(currentAndPastEmployees)
		}
		else
		{
			setEmployeesFixed(currentEmployees)

		}
	}, [employeesAndPositions])

	useEffect(() => {
		//bulk can never include former employees
		if(searchOptions.includeFormerEmployees && props.sectionState.rpcType != 'bulk')
		{
			setEmployeesFixed(currentAndPastEmployees)
		}
		else
		{
			setEmployeesFixed(currentEmployees)
		}
	}, [searchOptions.includeFormerEmployees])


	const positionsFixed = employeesAndPositions?.positions.map(item => ({ label: item.title, value: item.id}))

	useEffect(() => {
		if(props.allEmployees)
		{
			setEmployeesFixed(props.allEmployees.map(item => 
				(
					{
						value: !!item.id ? item.id : item?.employee?.id, 
						label: !!item.firstName ? item.firstName + ' ' + item.lastName : item?.employee?.firstName + ' ' + item?.employee?.lastName
					}
				)
			))
		}

	}, [props.allEmployees]);


	const selectAllEmployees = (employees) => {
		setValue('bulkEmployees', [...employees])
	};

	return (
		
			<>
			

			{ props.sectionState.rpcType == 'bulk' ? (
					<div className={cn("border shadow rounded p-5",props.className)}>
						<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">

							<h2 className="text-xl">Step 2: Select Employees</h2>

							<EditButton buttonAction={props.sectionState.selectEmployee}  rules={{required: "Required"}} {...props} onClick={toggleMode} />

						</div>
						<div className="flex flex-col justify-between w-full">
							<InputField 
							type="select" 
							name="bulkEmployees" 
							id="bulkEmployees" 
							placeholder="Select Employees" 
							label="Select Employees" 
							hideSelectedOptions="true"
							isMulti={true}
							options={employeesFixed} 
							isLoading={isLoading}
							delimiter=","						
							outerclassName="basis-full md: basis-2/3"

							/>
							<div className="flex flex-row items-center ml-1">

								<input type="checkbox" 
								id="includeAllEmployees"
								value={searchOptions.includeAllEmployees}
								onChange={e => {
									setSearchOptions(e => {
										e.includeAllEmployees = !searchOptions.includeAllEmployees
									})
								}}
								className="mr-2"
								disabled={props.sectionState.selectEmployee == 'edit' ? false : true}
								/>
								<label htmlFor="includeAllEmployees">Include employees from other departments you manage in dropdown?</label>
							</div>
						</div>
					</div>

				) : (
					<div className={cn("border shadow rounded p-5",props.className)}>
						<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">

							<h2 className="text-xl">Step 2: Select an Employee</h2>

							<EditButton buttonAction={props.sectionState.selectEmployee}  rules={{required: "Required"}} {...props} onClick={toggleMode} />

						</div>
						<div className="flex flex-col justify-between w-full">
							<InputField 
							type="select" 
							name="currentEmployee" 
							id="curremtEmployee" 
							placeholder="Select an Employee" 
							label="Select Employee" 
							options={employeesFixed} 
							isLoading={isLoading}
							sectionState={props.sectionState.selectEmployee}
							extraOnChange={e => {
								let chosenEmployee = employeesAndPositions?.employees?.find(x => x.id == e.value)

								if(chosenEmployee !== undefined)
								{
									props.doSetSelectedEmployee(chosenEmployee)
									if(chosenEmployee.positions.length > 0)
									{

										props.doSetCurrentPosition(chosenEmployee.positions[0].position.id)

									}
									props.doSetSectionState('dim')
								}
							
							}}						
							outerclassName="basis-full md: basis-2/3"/>
							<div className="flex flex-row items-center ml-1">
								<input type="checkbox" 
								id="includeAllEmployees" 
								className="mr-2"
								value={searchOptions.includeAllEmployees}
								onChange={e => {
									setSearchOptions(e => {
										e.includeAllEmployees = !searchOptions.includeAllEmployees
									})
								}}
								disabled={props.sectionState.selectEmployee == 'edit' ? false : true}
								/>
								<label htmlFor="includeAllEmployees">Include employees from other departments you manage in dropdown?</label>
							</div>
							<div className="flex flex-row items-center ml-1">
								<input type="checkbox" 
								id="includeFormerEmployees" 
								className="mr-2"
								value={searchOptions.includeFormerEmployees}
								onChange={e => {

									setSearchOptions(e => {
										e.includeFormerEmployees = !searchOptions.includeFormerEmployees
									})

								}}
								disabled={props.sectionState.selectEmployee == 'edit' ? false : true}
								/>
								<label htmlFor="includeFormerEmployees">Include former employees in dropdown?</label>
							</div>
						</div>
					</div>
				) 

			}
		</>

	)
}



/**
	<div className="flex w-full flex-row items-center">
		<hr className="inline-block h-px grow border-0 bg-gray-200" />
		<span className="ml-4 mr-4 inline-block text-gray-400">or</span>
		<hr className="inline-block h-px grow border-0 bg-gray-200" />
	</div>
**/
