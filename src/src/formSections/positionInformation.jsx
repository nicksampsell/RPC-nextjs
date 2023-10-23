import { useState, useEffect } from 'react'
import cn from 'classnames'
import InputField from '../fieldTypes/inputField'
import { useFormContext } from 'react-hook-form'
import { EditButton } from '../components/EditButton'

import { useGetPreviousEmployee } from '../queries/autofill.hooks'

export default function PositionInformation(props) {

	const posInfo = props.currentPosition;


	//The form field is really called currentEmployee.
	//The prop is really called currentEmployee, despite being referred to as selectedEmployee in form.jsx.
	//Please disregard this discrepancy
	const currentEmployee = props.currentEmployee;

	const { register, formState: { errors }, control, watch, setValue, getValues } = useFormContext()
	const [selectedPosition, setSelectedPosition] = useState({})
	const [step, setStep] = useState(props.currentPosition?.step)
	const { data: previousEmployee } = useGetPreviousEmployee(watch('position',false));


	const employeeObserver = watch("currentEmployee")


	const stepOptions = [
		{ value: 'entryWage', label: 'Entry'},
		{ value: 'step1', label: 'Step 1'},
		{ value: 'step2', label: 'Step 2'},
		{ value: 'step3', label: 'Step 3'},
		{ value: 'step4', label: 'Step 4'},
		{ value: 'step5', label: 'Step 5'},
		{ value: 'step6', label: 'Step 6', schedule: 'old'},
		{ value: 'step7', label: 'Step 7', schedule: 'old'},
		{ value: 'step8', label: 'Step 8', schedule: 'old'},
		{ value: 'step9', label: 'Step 9', schedule: 'old'},
		{ value: 'year10', label: 'Year 10'},
		{ value: 'year15', label: 'Year 15'},
		{ value: 'year20', label: 'Year 20'},
		{ value: 'year25', label: 'Year 25'},
		{ value: 'maxWage', label: 'Max Wage'},
		{ value: 'range', label: 'Range'}
	];
		//We need to fetch the original values, then watch for changes

useEffect(() => {


	if(props.sectionState.rpcType == 'selectEmployee')
	{

		if(currentEmployee?.positions?.length > 0)
		{

			let posInfo = currentEmployee?.positions[0]?.position
			setValue('position',{label: posInfo?.title, value: posInfo?.id})
			setValue('grade',currentEmployee?.positions[0]?.position?.grade)
			setValue('step', stepOptions.find(x => x.value == currentEmployee?.positions[0]?.step))
			setSelectedPosition(currentEmployee?.positions[0]?.position)

			if(currentEmployee?.positions?.[0]?.step)
			{
				setStep(currentEmployee?.positions?.[0]?.step)
			}

			if(currentEmployee?.positions[0]?.positionPaySchedule?.length > 0)
			{

				setValue('schedule', currentEmployee?.positions[0]?.positionPaySchedule[0]?.schedule)
				setValue('wages', currentEmployee?.positions[0]?.positionPaySchedule[0][currentEmployee?.positions[0]?.step])
			}
			setValue('formerEmployee', '', { shouldTouch: true, shouldDirty: true })

		}
	}
}, [employeeObserver])


const doUpdatePositionInformation = (positionId) => {

	let positionInfo = props.allPositions?.find(x => x.id == positionId);



	setValue('position',[{label: positionInfo.title, value: positionInfo?.id}])
	setValue('grade',positionInfo?.grade)
	setValue('step', step)


	if(positionInfo?.positionPaySchedule?.length > 0)
	{

		setValue('schedule', positionInfo?.positionPaySchedule?.[0]?.schedule)
		setValue('wages', positionInfo?.positionPaySchedule?.[0][step])
	}
	else
	{
		setValue('schedule', '')
		setValue('wages', '')		
	}
}
	
const updateWages = (newStep) => {

	if(selectedPosition?.positionPaySchedule?.length > 0)
	{
		setValue('wages', selectedPosition?.positionPaySchedule?.[0][newStep])
	}
	else
	{
		setValue('wages', '')
	}
}

const formerEmployeeName = (previousEmployee?.length > 0) ? `${previousEmployee[0].firstName} ${previousEmployee[0].lastName}` : ''

useEffect(() => {
	setValue('formerEmployee',formerEmployeeName)
}, [previousEmployee])





	//posInfo.position.positionPaySchedule -> loop through this to get all available payrates


	const [sectionState, setSectionState] = useState(props.initialState)

	const toggleMode = () => (props.sectionState.position == 'edit') ? props.doSetSectionState('') : props.doSetSectionState('edit')
	const positionsFixed = props?.allPositions?.map(item => ({ label: item.titleWithNickname, value: item.id}))

	return (
		<div className={cn("border shadow rounded p-5",props.className)}>
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">{(props.sectionState.rpcType == 'newEmployee') ? 'Step 3: Position Information' : 'Step 4: Position Information'}
				</h2>
				<EditButton sectionState={props.sectionState.position} {...props} onClick={toggleMode} />
			</div>

			<div className="flex flex-col md:flex-row justify-between md:space-x-3 w-full">
				<InputField 
				type="select" 
				name="position" 
				id="position" placeholder="Select a Position" 
				label="Position" 
				options={positionsFixed} 
				outerClass="basis-full" 
				rules={{required: "Required"}}
				sectionState={props.sectionState.position}
				extraOnChange={e => {
					doUpdatePositionInformation(e.value)
					setSelectedPosition(props.allPositions?.find(x => x.id == e.value))
				}}	
				/>
			</div>

			<div className="flex flex-col md:flex-row justify-between md:space-x-3 w-full">
				<InputField name="schedule" id="schedule" placeholder="Schedule" label="Schedule" outerClass="basis-full md:basis-1/3" errorIconOnly="true" sectionState={props.sectionState.position}  rules={{required: "Required"}}/>
				<InputField name="grade" id="grade" placeholder="Grade" label="Grade" outerClass="basis-full md:basis-1/3" errorIconOnly="true" sectionState={props.sectionState.position} rules={{required: "Required"}} />

				<InputField 
					type="select" 
					name="step" 
					id="step" 
					placeholder="Step" 
					label="Step" 
					outerClass="basis-full md:basis-1/3"
					errorIconOnly="true" s
					ectionState={props.sectionState.position} 
					rules={{required: "Required"}}
					options={stepOptions}
					extraOnChange={e => {
						updateWages(e.value)
						setStep(e)
					}}
					/>
			</div>
			<div className="flex flex-col md:flex-row justify-between md:space-x-3 w-full">
				<InputField name="wages" 
				id="wages" 
				placeholder="Wages" 
				label="Wages" 
				outerClass="basis-full md:basis-3/5" 
				sectionState={props.sectionState.position}  
				rules={{required: "Required"}}

				/>
			</div>

			<div className="flex flex-col md:flex-row justify-between md:space-x-3 w-full">
				<InputField name="formerEmployee" 
				id="formerEmployee" 
				placeholder="Former Employee" 
				label="Last Employee In Position" 
				outerClass="basis-full" 
				sectionState={props.sectionState.position}  
				rules={{required: "Required"}}
				value={formerEmployeeName}
				/>
			</div>
		</div>
	)
}
