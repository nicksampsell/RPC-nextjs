import { useState, useRef, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import cn from 'classnames'
import InputField from '../fieldTypes/inputField'
import { MdChevronRight } from 'react-icons/md'
import { fieldTypes } from '../rpcSchema'
import * as yup from 'yup'
import { AnimatePresence, motion } from 'framer-motion'
import { findInputError, isFormInvalid } from '../helpers/InputHelper'
import { InputError, framer_error } from '../fieldTypes/inputField'
import { useGetRPCActions } from '../queries/autofill.hooks'







export default function RPCRequirements(props) {

	const { register, formState: { errors }, control, getValues } = useFormContext()
	const [formState, setFormState] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(-1)
	const [selectedAction, setSelectedAction] = useState(-1)
	const [validationSchemaAdditions, setValidationSchemaAdditions] = useState(props.validationSchema);

	const { status, data: rpcActions, error, isFetching, isLoading } = useGetRPCActions();

	const categoriesFixed = rpcActions?.map(item => ({ label: item.title, value: item.id }))

	const actionsFixed = rpcActions?.find(x => x.id == parseInt(selectedCategory))?.rpcActions.map(item => ({ label: item.title, value: item.id, requirements: item.requirements, }));
	
	const requiredFields = actionsFixed?.find(x => x.value == parseInt(selectedAction))?.requirements

	const doUpdateAction = (actionId) => {
		setSelectedAction(actionId)
	}

	useEffect(() => {
		setSelectedCategory(props.rpcInfo.CategoryId)
		setSelectedAction(props.rpcInfo.Action)
	}, [props.rpcInfo])


	return (
		<div className={cn("border shadow rounded p-5",props.className)}>
			<h2 className="text-xl bg-blue-300 -m-5 mb-5 p-5 rounded-t">
			{	(props.sectionState.rpcType == 'newEmployee') ? 'Step 4' :  
				(props.sectionState.rpcType == 'bulk') ? 'Step 3' : 'Step 5' }: Requirements &amp; Supporting Documentation
			</h2>
			<div className="flex flex-col md:flex-row  items-center md:space-x-3 w-full">
				<InputField type="select" onChange={e => setSelectedCategory(e) } 
				options={categoriesFixed} 
				name="rpcCategory" 
				id="rpcCategory" 
				placeholder="Select a Type of Change" 
				label="Select a Type of Change" 
				outerClass="basis-full md:basis-1/3" 
				rules={{required: "Required"}}
				isLoading={isLoading}
				readOnly={false}
				/>
				<MdChevronRight className="text-4xl" />
				<InputField type="select" 
				onChange={doUpdateAction} 
				options={actionsFixed} 
				readOnly={false} 
				name="rpcAction" 
				id="rpcAction" 
				placeholder="Select an Action" 
				label="Select an Action" 
				outerClass="basis-full md:basis-1/3" 
				isLoading={isLoading} 
				rules={{required: "Required"}} />
			</div>
			{
				(selectedAction != "undefined" && requiredFields != "undefined") && (
					<div className="flex flex-col items-center">
						{ 
							requiredFields?.map(field => (
								<div className="flex flex-row justify-between w-full items-center" key={field.id}>
									<div className="basis-1/4">
										<span>{field.title}</span>

									{(field.requirementType != 5 && field.requirementType != 6) && (
									<AnimatePresence mode="wait" initial={false}>
										{isFormInvalid(findInputError(errors, `req_${field.id}`)) && (
											<InputError message={findInputError(errors, `req_${field.id}`).error.message}
											key={findInputError(errors, `req_${field.id}`).error.message}
											/>
										)}
										</AnimatePresence>
										)}
									</div>

									{(field.requirementType == 5 || field.requirementType == 6) ? (

										<div className="basis-3/4 flex flex-col md:flex-row md:space-x-3">

											<InputField
												type={(field.requirementType == 5) ? 'date' : 'datetime-local'} 
												name={`req_${field.id}_start`} 
												id={`req_${field.id}_start`}
												label={(field.field == 5) ? 'Start Date' : 'Start Date with Time'} 
												outerClass="basis-full md:basis-1/2" 
												formState={formState}
												rules={field.isRequired ? {required: "Required" } : {required: false}}
												readOnly={false}
												formName={props.formName}
												RPCId={props.RPCId}
												dataMode={props.dataMode}
												/>

											<InputField
												type={(field.requirementType == 5) ? 'date' : 'datetime-local'} 
												name={`req_${field.id}_end`} 
												id={`req_${field.id}_end`}
												label={(field.field == 5) ? 'End Date' : 'End Date with Time'} 

												outerClass="basis-full md:basis-1/2" 
												formState={formState}
												rules={field.isRequired ? {required: "Required" } : {required: false}}
												readOnly={false}
												formName={props.formName}
												RPCId={props.RPCId}
												dataMode={props.dataMode}
												/>
										</div>

									) : (									
										<div className="basis-3/4">
											<InputField
												type={fieldTypes[field.requirementType]} 
												name={`req_${field.id}`} 
												id={`req_${field.id}`}
												label={field.title} 
												labelClass="hidden"
												outerClass="basis-full md:basis-5/12"
												radioOptions={field.radioOptions}
												formState={formState}
												options={(field.requirementType == 9 || field.requirementType == 11) ? field.categories ?? [] : ''}
												hideError="true"
												rules={field.isRequired ? {required: "Required" } : {required: false}}
												actionId={getValues('rpcAction')}
												readOnly={false}
												formName={props.formName}
												RPCId={props.RPCId}
												dataMode={props.dataMode}
												/>
										</div>

									)}

								</div>


							)
						)}



					</div>
				)
			}
		</div>
	)
}