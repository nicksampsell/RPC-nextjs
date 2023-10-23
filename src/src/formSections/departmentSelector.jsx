import { useState, useEffect, useMem, useContext } from 'react'
import cn from 'classnames'
import InputField from '../fieldTypes/inputField'
import { useFormContext, Controller } from 'react-hook-form'
import { RPCDataSetContext } from '../RPCDataSetContext'
import { EditButton } from '../components/EditButton'


export default function DepartmentSelector(props) {

	const dataset = useContext(RPCDataSetContext)

	const { register, formState: { errors }, control, watch, setValue, getValues } = useFormContext()

	const { data: organizations, error: orgError, isFetching: orgFetching, isLoading: orgLoading, status: orgStatus } = props.allOrganizations

	const { status, data: departments, error, isFetching, isLoading } = props.allDepartments


	const departmentsFixed = departments?.map(item => ({ label: item.title, value: item.id }))

	const toggleMode = () => (props.sectionState.department == 'edit') ? props.doSetSectionState('view') : props.doSetSectionState('edit')
	return (
		<div className={cn("border shadow rounded p-5",props.className)}>
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">

				<h2 className="text-xl">
				{(props.sectionState.rpcType == 'newEmployee') ? 'Step 2: Department Information' : 'Step 1: Department Information'}
				</h2>

				<EditButton buttonAction={props.sectionState.department}  rules={{required: "Required"}} {...props} onClick={toggleMode} />

			</div>
			<div className="flex flex-col justify-between md:space-y-3 w-full">
				<div className="flex flex-row justify-between space-x-3 w-full">
					<InputField 
						type="select" 
						name="organization" 
						id="organization" 
						placeholder="Select an organization" 
						label="Organization" 
						options={organizations?.map(item => ({ label: item.organization.title, value: item.organization.id }))} 
						outerClass="basis-full" 
						rules={{required: "Required", valueAs: v => parseInt(v)}}
						sectionState={props.sectionState.organization}
						isLoading={orgLoading}
						extraOnChange={e => {
							let chosenOrganization = organizations.find(x => x.organization.id == e.value)

							if(chosenOrganization !== undefined)
							{
								props.doSetSelectedOrganization(chosenOrganization)
							}
						}}
					/>
				</div>

				<div className="flex flex-row justify-between space-x-3 w-full">
					<InputField 
						type="select" 
						name="department" 
						id="department" 
						placeholder="Select a Department" 
						label="Department" 
						options={departments?.map(item => ({ label: item.title, value: item.id }))} 
						outerClass="basis-full" 
						rules={{required: "Required", valueAs: v => parseInt(v)}}
						sectionState={props.sectionState.department}
						isLoading={isLoading}
						extraOnChange={e => {
							let chosenDepartment = departments.find(x => x.id == e.value)

							if(chosenDepartment !== undefined)
							{
								props.doSetSelectedDepartment(chosenDepartment)
								setValue('deptAccountNumber',chosenDepartment?.departmentNumber, { shouldTouch: true, shouldDirty: true })
								props.doSetSectionState('dim')
							}
						}}
					/>
				</div>
				<div>





					<InputField 
						type="number" 
						name="deptAccountNumber" 
						id="deptAccountNumber" 
						placeholder="Account Number" 
						label="Account Number" 
						outerClass="basis-full md:basis-2/5" 
						className="hideSpinner" 
						rules={{required: "Required", valueAs: v => parseInt(v)}}
					/>
				</div>
			</div>
		</div>
	)
}