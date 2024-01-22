import { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import InputField from '../fieldTypes/inputField'
import { useFormContext } from 'react-hook-form'
import { states } from '../helpers/States'
import { EditButton } from '../components/EditButton'
import { useLoadEmployeeBySSN } from '../queries/employee.hooks'
import debounce from 'lodash.debounce'

export default function EmployeeInformation(props) {

	const userInfo = props.selectedEmployee;
	const [sectionState, setSectionState] = useState(props.initialState)
	const { register, formState: { errors }, control, watch, setValue, getValues } = useFormContext()
	const [loadedSSN, setLoadedSSN] = useState('');
	const {data: getLoadedEmployeeData, status: LoadedEmployeeStatus} = useLoadEmployeeBySSN(loadedSSN, props.sectionState.rpcType)
	
	//console.log(props.sectionState.rpcType);

	useEffect(() => {
		//console.log(loadedSSN);
	}, [loadedSSN]);


	const debounceSetOldSSN = useRef(
	  debounce(async (value) => {
	    setLoadedSSN(value)
	  }, 300)
	).current;

	useEffect(() => {

		if(getLoadedEmployeeData && Object.keys(getLoadedEmployeeData).length > 0)
		{
			setValue('firstName', getLoadedEmployeeData.firstName);
			setValue('middleName', getLoadedEmployeeData.middleName);
			setValue('lastName', getLoadedEmployeeData.lastName);
			setValue('address', getLoadedEmployeeData.address);
			setValue('address2',getLoadedEmployeeData.address2);
			setValue('city', getLoadedEmployeeData.city);
			setValue('state', getLoadedEmployeeData.state);
			setValue('zipCode', getLoadedEmployeeData.postalCode);
			setValue('phone', getLoadedEmployeeData.phone);
			setValue('email', getLoadedEmployeeData.email);
			setValue('ssn', getLoadedEmployeeData.ssn);
			setValue('employeeNumber', getLoadedEmployeeData.employeeNumber);
		} else {
			setValue('firstName', '');
			setValue('middleName', '');
			setValue('lastName', '');
			setValue('address', '');
			setValue('address2', '');
			setValue('city', '');
			setValue('state', '');
			setValue('zipCode', '');
			setValue('phone', '');
			setValue('email', '');
			setValue('ssn', '');
			setValue('employeeNumber', '');
		}

	}, [getLoadedEmployeeData] )


	useEffect(() => {
		if(props.selectedEmployee && Object.keys(props.selectedEmployee).length > 0)
		{
			setValue('firstName',userInfo.firstName, { shouldTouch: true, shouldDirty: true })
			setValue('middleName', userInfo.middleName, { shouldTouch: true, shouldDirty: true })
			setValue('lastName', userInfo.lastName, { shouldTouch: true, shouldDirty: true })
			setValue('address', userInfo.address, { shouldTouch: true, shouldDirty: true })
			setValue('address2',userInfo.address2, { shouldTouch: true, shouldDirty: true })
			setValue('city', userInfo.city, { shouldTouch: true, shouldDirty: true })
			setValue('state', userInfo.state, { shouldTouch: true, shouldDirty: true })
			setValue('zipCode', userInfo.postalCode, { shouldTouch: true, shouldDirty: true })
			setValue('phone', userInfo.phone, { shouldTouch: true, shouldDirty: true })
			setValue('email', userInfo.email, { shouldTouch: true, shouldDirty: true })
			setValue('ssn', userInfo.ssn, { shouldTouch: true, shouldDirty: true })
			setValue('employeeNumber', userInfo.employeeNumber, { shouldTouch: true})
		}
	}, [props.selectedEmployee])


	const toggleMode = () => (props.sectionState.employeeInfo == 'edit') ? props.doSetSectionState('view') : props.doSetSectionState('edit')

	return (
		<div className={cn("border shadow rounded p-5",props.className)}>
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">
					{(props.sectionState.rpcType == 'newEmployee') ? 'Step 1: Employee Information' : 'Step 3: Employee Information'}
				</h2>
				<EditButton buttonAction={props.sectionState.employeeInfo}  rules={{required: "Required"}} {...props} onClick={toggleMode}  />
			</div>

			{props.sectionState.rpcType == 'newEmployee' && (
			<div className="flex flex-row bg-amber-100 p-3 justify-between items-center gap-5 rounded mb-5 shadow">
				<div className="flex flex-col md:flex-row justify-between md:space-x-3 w-full basis-1/2">
					<InputField onChange={e => debounceSetOldSSN(e.target.value)} alwaysShowMask={false} type="masked" mask="999-99-9999" canObscure="true" name="ssn" id="ssn" placeholder="Social Security Number" label="Social Security Number" outerClass="basis-full"  sectionState={props.sectionState.employeeInfo}  rules={{required: "Required"}}/>				
				</div>
				<div className="shrink basis-1/2 text-center">
					{getLoadedEmployeeData && Object.keys(getLoadedEmployeeData).length > 0 ? (
						<p class="text-green-500 font-semibold">We were able to find this employee and have filled out the fields with the information we have on file. Please make changes as appropriate.</p>
					) : (
					<p>Enter the new employee's Social Security Number and any information we have on file will automatically be filled in.</p>
					)}
				</div>
			</div>
			)}

			<div className="flex flex-col md:flex-row justify-between md:space-x-3 w-full">
				<InputField name="firstName" id="firstName" placeholder="First Name" label="First Name" outerClass="basis-full md:basis-5/12" sectionState={props.sectionState.employeeInfo} rules={{required: "Required"}}/>
				<InputField name="middleName" id="middleName" placeholder="Middle Name" label="Middle Name" outerClass="basis-full md:basis-2/12" sectionState={props.sectionState.employeeInfo} rules={{}} />
				<InputField name="lastName" id="lastName" placeholder="Last Name" label="Last Name" outerClass="basis-full md:basis-5/12" sectionState={props.sectionState.employeeInfo} rules={{required: "Required"}} />
			</div>
			<div className="flex flex-col md:flex-row justify-between flex-wrap w-full ">
				<InputField name="address" id="address1" placeholder="Street Address" label="Street Address" outerClass="w-full mb-0"  sectionState={props.sectionState.employeeInfo} rules={{required: "Required"}}/>
				<InputField name="address2" id="address2" placeholder="Apt/Suite" label="Apartment/Suite" outerClass="w-full -mt-5" labelClass="hidden"  sectionState={props.sectionState.employeeInfo} rules={{}}/>
			</div>
			<div className="flex flex-col md:flex-row justify-between md:space-x-3 w-full">
				<InputField name="city" id="city" placeholder="City" label="City" outerClass="basis-full md:basis-5/12" sectionState={props.sectionState.employeeInfo}  rules={{required: "Required"}}/>
				<InputField type="select" id="state" name="state" placeholder="State" label="State" options={states}outerClass="basis-full md:basis-2/12" errorIconOnly="true" sectionState={props.sectionState.employeeInfo}  rules={{required: "Required"}}/>
				<InputField name="zipCode" id="zipCode" placeholder="Zip Code" label="Zip Code" outerClass="basis-full md:basis-5/12" sectionState={props.sectionState.employeeInfo}  rules={{required: "Required"}} />
			</div>
			<div className="flex flex-col md:flex-row justify-between md:space-x-3 w-full">
				<InputField type="phone" 
				name="phone" id="phone" placeholder="Phone Number" label="Phone Number" outerClass="basis-full md:basis-1/2"  sectionState={props.sectionState.employeeInfo}  rules={{required: "Required"}}/>
				<InputField name="email" id="email" placeholder="Email Address" label="Email Address" outerClass="basis-full md:basis-1/2" sectionState={props.sectionState.employeeInfo}  rules={{required: "Required"}} />
			</div>
			<div className="flex flex-col md:flex-row justify-between md:space-x-3 w-full">
				<InputField name="employeeNumber" id="Employee Number" placeholder="Employee Number" label="Employee Number" outerClass="basis-full md:basis-1/2"  sectionState={props.sectionState.employeeInfo}  rules={{required: "Required"}}/>
				{props.sectionState.rpcType != 'newEmployee' && (
					<InputField type="mask" mask="999-99-9999" name="ssn" canObscure="true" id="ssn" placeholder="Social Security Number" label="Social Security Number" outerClass="basis-full md:basis-1/2"  sectionState={props.sectionState.employeeInfo}  rules={{required: "Required"}}/>				
				)}
			</div>
		</div>
	)
}