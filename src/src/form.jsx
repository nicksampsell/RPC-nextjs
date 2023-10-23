import react, { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import EmployeeInformation from './formSections/employeeInformation'
import DepartmentSelector from './formSections/departmentSelector'
import EmployeeSelector from './formSections/employeeSelector'
import PositionInformation from './formSections/positionInformation'
import RPCRequirements from './formSections/rpcRequirements'
import FormTitle from './formSections/formTitle'
import RPCTypeSelector from './formSections/rpcTypeSelector'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RPCSchema } from './RPCSchema'
import { DevTool } from "@hookform/devtools";
import { AnimatePresence, motion } from 'framer-motion'
import { SubmissionToolbar } from './components/SubmissionToolbar'
import { useMutation, useQueryClient } from 'react-query'
import { useImmer } from 'use-immer';

import { useGetOrganizations, useGetDepartments, useLoadRPCById, useCreateRPCMutation, useUpdateRPCMutation } from './queries/autofill.hooks'
import { Notes } from './components/Notes';





export default function RPCEditor(props) {
	
	const [rpcType, setRPCType] = useState("") //newEmployee, selectEmployee, bulk
	const [allOrganizations, setAllOrganizations] = useState([])
	const [allPositions, setAllPositions] = useState([])
	const [allEmployees, setAllEmployees] = useState([])
	const [allDepartments, setAllDepartments] = useState([])
	const [submitAction, setSubmitAction] = useState('')
	const [rpcInfo, setRPCInfo] = useState({
		CategoryId: -1,
		Action: -1
	})

	const submissionStatus = useRef('draft')

	const [selectedOrganization, setSelectedOrganization] = useState({})
	const [selectedDepartment, setSelectedDepartment] = useState({})
	const [selectedEmployee, setSelectedEmployee] = useState({})
	const [currentPosition, setCurrentPosition] = useState({})

	const getAllOrganizations = useGetOrganizations();
	const getAllDepartments = useGetDepartments(selectedOrganization.id);
	const {data: getRPCData, status: RPCStatus} = useLoadRPCById(props.RPCId)
	const CreateRPCMutation = useCreateRPCMutation();
	const UpdateRPCMutation = useUpdateRPCMutation();
	const queryClient = useQueryClient()




	const defaultValues = {
		'firstName':'',
		'middleName':'',
		'lastName':'',
		'address':'',
		'address2':'',
		'city':'',
		'state':'',
		'zipCode':'',
		'phone':'',
		'email':'',
		'ssn':'',
		'employeeNumber':'',
		'schedule':'',
		'grade':'',
		'wages':'',
		'formerEmployee':'',
		'department':'',
		'currentEmployee':'',
		'position':'',
		'deptAccountNumber':'',
		'bulkEmployees':''
	}

	const methods = useForm({
		defaultValues: defaultValues
	});



	const originalState = {
		department: 'hidden',
		selectEmployee: 'hidden',
		employeeInfo: 'hidden',
		position: 'hidden',
		requirements: 'hidden'
	}

	const [sectionState, setSectionState] = useImmer({
		...originalState,
		rpcType: '',
		rpcSelector: 'edit'
		})

	const doSetSectionState = (val) => {
			setSectionState({
			...sectionState, val
		})
	}

/**
	useEffect(() => {
		if(Object.keys(selectedDepartment).length > 0)
		{
			setSectionState(state => {
				state.employeeInfo = (sectionState.rpcType == 'selectEmployee') ? 'view' : 'edit',
				state.position = (sectionState.rpcType == 'selectEmployee') ? 'view' : 'edit',
				state.requirements = 'edit'
			})	
		}
		else
		{
			setSectionState(state => {
				state.employeeInfo = 'hidden',
				state.position = 'hidden',
				state.requirements = 'hidden'
			})
		}
	}, [RPCData])

**/


	const changeFormType = (val) =>
	{
		switch(val){
			case 'bulk':
				setRPCType('bulk')
			break;
			case 'selectEmployee':
				setRPCType('selectEmployee')
			break;
			case 'newEmployee':
				setRPCType('newEmployee')			
			break;
			default:
				setRPCType("")
			break;
		}
	}


	const hardReset = () => {
		methods.reset(defaultValues)
		setSelectedEmployee({})
		setSelectedOrganization({})
		setSelectedDepartment({})
		setCurrentPosition({})
		setAllPositions([])
		setAllEmployees([])
	}

	useEffect(() => {
		//load all RPC information

		if(props.DataMode !== 'create')
		{
			setSectionState(state => {
				state.rpcType = 'selectEmployee',
				state.rpcSelector = 'dim',
				state.department = 'edit',
				state.selectEmployee = 'edit',
				state.employeeInfo = 'edit',
				state.position = 'edit',
				state.requirements = 'edit'
			})


			if(RPCStatus == 'success' && typeof(getRPCData) !== 'undefined' && Object.keys(getRPCData).length > 0)
			{
				setAllEmployees(getRPCData?.Employees)
				setAllPositions(getRPCData?.Positions)
				setCurrentPosition({})
				setSelectedEmployee({})
				setSelectedDepartment({})
				setSelectedOrganization({...selectedOrganization, id: getRPCData?.RPC?.organization?.value})

				setRPCInfo({
					...rpcInfo,
					CategoryId: getRPCData?.RPC?.rpcActionCategory.value,
					Action: getRPCData?.RPC?.rpcAction.value
				});

				methods.reset({
					'originatingDate': getRPCData?.RPC?.originatingDate,
					'organization': getRPCData?.RPC?.organization,
					'firstName': getRPCData?.RPC?.firstName,
					'middleName':getRPCData?.RPC?.middleName,
					'lastName': getRPCData?.RPC?.lastName,
					'address': getRPCData?.RPC?.address,
					'address2': getRPCData?.RPC?.address2,
					'city': getRPCData?.RPC?.city,
					'state': getRPCData?.RPC?.state,
					'zipCode': getRPCData?.RPC?.zipCode,
					'phone': getRPCData?.RPC?.phone,
					'email': getRPCData?.RPC?.email,
					'ssn': getRPCData?.RPC?.ssn,
					'employeeNumber': getRPCData?.RPC?.employeeNumber,
					'schedule': getRPCData?.RPC?.schedule?.schedule,
					'grade': getRPCData?.RPC?.grade,
					'step': getRPCData?.RPC?.step,
					'wages': getRPCData?.RPC?.wages,
					'formerEmployee':'',
					'department': getRPCData?.RPC?.currentDepartment,
					'currentEmployee': getRPCData?.RPC?.currentEmployee,
					'position': getRPCData?.RPC?.currentPosition,
					'deptAccountNumber': getRPCData?.RPC?.deptAccountNumber,
					'rpcCategory': getRPCData?.RPC?.rpcActionCategory,
					'rpcAction': getRPCData?.RPC?.rpcAction,
					'bulkEmployees':''	
				})


				const rpcRequirementData = getRPCData?.RPC?.rpcData?.filter(x => x?.rpcActionId == getRPCData?.RPC?.rpcAction?.id && x?.rpcId == props?.RPCId).map(item => {
					
					/**
					0. PlainText
					1. RichText
					2. Attachment
					3. Date
					4. DateTime
					5. DateSpan
					6. DateTimeSpan
					7. Salary
					8. Boolean
					9. RadioButtons
					10. Toggle
					11. Checkboxes
					**/


					switch(item?.requirementType)
					{
						case 2:
							methods.setValue(item?.fieldName, item?.content)
						break;
						case 6:
						case 5:
							const json = JSON.parse(item?.content);
							methods.setValue(item?.fieldName + '_start', json[0])
							methods.setValue(item?.fieldName + '_end', json[1])
						break;
						case 8:
							methods.setValue(item?.fieldName, item?.content)
						break;
						case 9:
							methods.setValue(item?.fieldName, item?.content)
						break;
						case 10:
							methods.setValue(item?.fieldName, item?.content)
						break;
						case 11:
							try
							{
								const json = JSON.parse(item.content)	
								methods.setValue(item.fieldName, json)
							}
							catch
							{
								methods.setValue(item?.fieldName, [])
							}


							
						break;
						default:
							methods.setValue(item?.fieldName, item?.content)
						break;
					}

				})


			}
		}
		}, [getRPCData]) //queryToLoadRPCData,Department,Positions,Employees
	

	const beforeSubmit = (statusVal) => {
		submissionStatus.current = statusVal;

		if(statusVal == 'draft' || statusVal == 'draftRedirect')
		{
			onSubmit(methods.getValues())
		}
		else if(statusVal == 'noSave')
		{
			window.location.href = '/'
		}
		
	}


	const onSubmit = (data) => {

		let userInformation = {};


		//If there is a blanket/bulk RPC, send a list of employee ids as an aray
		if(data?.bulkEmployees?.length > 0)
		{
			 userInformation = {
			 	bulk: [...data.bulkEmployees.map(x => x.value)]
			 }
		}
		else
		{
			//otherwise send an object containing the information about a single user
			userInformation = {
				employeeId: !!data?.currentEmployee?.value ? data?.currentEmployee?.value : null,
				firstName: data.firstName,
				middleName: data.middleName,
				lastName: data.lastName,
				address:  data.address,
				address2: data.address2,
				city:  data.city,
				state: data.state.value,
				zipCode: data.zipCode,
				email: data.email,
				ssn: data.ssn,
				phone: data.phone,
				employeeNumber: data.employeeNumber,
				currentEmployee: data.currentEmployee?.value,
				department: data.department?.value,
				position: data.position?.value,
				step: data.step?.value,
				schedule: data.schedule,
				wages: parseFloat(data.wages),
				grade: data.grade,
				formerEmployee: data.formerEmployee,
				deptAccountNumber: data.deptAccountNumber,
				organizationId: !!data.organization ? data.organization?.value : null
			}
		}

		let rpcData = Object.keys(data)
			.filter((key) => key.includes('req_'))
			.reduce((cur, key) => { 
				
				if(key.includes('req_'))
				{
					const commonKey = key.replace(/_(start|end)$/, '');

					if(key.endsWith('_start') || key.endsWith('_end'))
					{
						if(!Array.isArray(cur[commonKey]))
						{
							cur[commonKey] = []
						}

						cur[commonKey].push(!!data[key] ? data[key] : '');
					}
					else
					{
						cur[key] = !!data[key] ? data[key] : '';
					}
				}
				else
				{
					cur[key] = !!data[key] ? data[key] : '';
				}

				return cur;
			}


				//return Object.assign(cur, { [key]: data[key] })}


			, {});

		let rpcInformation = {
			originatingDate: data.originatingDate,
			status: submissionStatus.current,
			category: data.rpcCategory?.value,
			action: data.rpcAction?.value,
			data: rpcData
		}

		let payLoad = {
			employee: userInformation,
			rpc: rpcInformation
		}

		console.log(payLoad)


		if(props.DataMode == "edit")
		{
			CreateRPCMutation.mutate(payLoad,
			{
				//a mutation is about to happen
				onMutate: (variables) => {},
				//mutation was successful
				onSuccess: (data, variables, context) => {
					console.log("Successfully posted: " + data)
				},
				//any sort of error happened
				onError: (error, variables, context) => console.log("Error"),
				//runs regardless of error or success
				onSettled: (data, error, variables, context) => {

				}
			});
		}
		else
		{

			switch(submitAction)
			{
				case "returnDepartment":
					console.log("")
				break;
				case "returnPrevious":

				break;


				case "returnQueue":
					window.location.href = '/'
				break;
				case "saveChanges":
					UpdateRPCMutation.mutate(
						{
							rpcId: props.RPCId,
							payload: payLoad
						},
					{
						//a mutation is about to happen
						onMutate: (variables) => {},
						//mutation was successful
						onSuccess: (data, variables, context) => {
							console.log("Successfully updated: " + data)
							queryClient.invalidateQueries('getRPCNotes')
						},
						//any sort of error happened
						onError: (error, variables, context) => console.log("Error"),
						//runs regardless of error or success
						onSettled: (data, error, variables, context) => {

						}
					});
				break;


				case "confirmProceed":

				break;				
			}
			console.log("Verify");
			console.log(submitAction)
		}




	}


	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="mb-5">
				<div className={cn("grid grid-cols-6 gap-5 w-full m-auto mt-5", sectionState.rpcType)}>
					<FormTitle className="col-span-6 bg-white" />

					{(props.DataMode == 'create') && (<RPCTypeSelector 
						className={cn("col-span-6 bg-white")}
						rpcType={rpcType}
						doSetRPCType={e => changeFormType(e) }
						sectionState={sectionState}
						doSetSectionState={e => {
							if(e == 'selectEmployee')
							{
								setSectionState(state => {
									state.rpcType = e,
									state.rpcSelector = 'dim',
									state.department = 'edit',
									state.selectEmployee = 'edit',
									state.employeeInfo = 'edit',
									state.position = 'edit',
									state.requirements = 'edit'
								})
							}
							else if(e == 'newEmployee')
							{
								setSectionState(state => {
									state.rpcType = e,
									state.rpcSelector = 'dim',
									state.department = 'edit',
									state.selectEmployee = 'hidden',
									state.employeeInfo = 'edit',
									state.position = 'edit',
									state.requirements = 'edit'
								})
							}
							else
							{
								setSectionState(state => {
									state.rpcType = e,
									state.rpcSelector = 'dim',
									state.department = 'edit',
									state.selectEmployee = 'edit',
									state.employeeInfo = 'hidden',
									state.position = 'hidden',
									state.requirements = 'edit'
								})
							}

							hardReset()

							
						}}
					/>)}



							{(sectionState.rpcType != '') && (
							<DepartmentSelector 
								className={cn("col-span-6 bg-white", 
									{ 'md:col-end-7 md:col-span-2' : sectionState.rpcType == 'newEmployee' },
									{ 'md:col-span-3' : sectionState.rpcType != 'newEmployee'})}
								sectionState={sectionState}
								allOrganizations={getAllOrganizations}
								allDepartments={getAllDepartments}
								selectedDepartment={selectedDepartment}
								doSetAllEmployees={e => setAllEmployees(e) }
								doSetAllPositions={e =>	setAllPositions(e) }
								doSetSelectedOrganization={e => setSelectedOrganization(e) }
								doSetSelectedDepartment={e => {
									setSelectedDepartment(e) 
									setAllPositions(e?.positions)
									setSelectedEmployee({})
									setCurrentPosition({})

								}}
								doSetSectionState={e => {
									setSectionState(state => {
										state.department = e							
									})
									
								}}
							/>
							)}

							{(sectionState.selectEmployee != 'hidden') && (
								<EmployeeSelector 
									className={cn("col-span-6 md:col-span-3 bg-white")} 
									rpcType={rpcType} onIdentityFormType={changeFormType} 
									selectedDepartment={selectedDepartment}
									allEmployees={allEmployees}
									doSetSelectedEmployee={e => setSelectedEmployee(e)}
									doSetCurrentPosition={e => setCurrentPosition(e)}
									selectedEmployee={e => setSelectedEmployee(e)}
									doSetAllEmployees={e => setAllEmployees(e)}
									sectionState={sectionState}
									doSetSectionState={e => {
										setSectionState(state => {
											state.selectEmployee = e							
										})
									}}
								/>
							)}
								{(sectionState.employeeInfo != 'hidden') && (

									<EmployeeInformation 
										className={cn("col-span-6 md:col-span-4 bg-white", 
										{ 'md:row-start-3 md:row-span-2' : sectionState.rpcType == 'newEmployee' })}
										rpcType={rpcType} 
										key="employeeInfo" 
										selectedDepartment={selectedDepartment}
										selectedEmployee={selectedEmployee}
										
										doUpdateSelectedEmployee={e => setSelectedEmployee({...selectedEmployee,e})}
										sectionState={sectionState}
										doSetSectionState={e => {
											setSectionState(state => {
												state.employeeInfo = e
											})
										}}
									/>
								)}

								{(sectionState.position != 'hidden') && (
									<PositionInformation 
										className={cn("col-span-6 md:col-span-2 bg-white")} 
										rpcType={rpcType} 
										key="positionInfo" 
										selectedDepartment={selectedDepartment}
										allPositions={allPositions}
										currentPosition={currentPosition}
										currentEmployee={selectedEmployee}
										doUpdateCurrentPosition={e => setCurrentPosition(e)}
										sectionState={sectionState}
										doSetSectionState={e => {
											setSectionState(state => {
												state.position = e							
											})
										}}				
									/>
								)}

							{(sectionState.requirements != 'hidden') && (
							<div {...framer_sections} className="col-span-6 grid grid-cols-6 gap-5 bg-white" key="second2">
								<RPCRequirements 
									className={cn("col-span-6")}
									rpcType={rpcType} 
									rpcInfo={rpcInfo}
									formName={props.FormName}
									RPCId={props.RPCId}
									dataMode={props.DataMode}
									selectedDepartment={selectedDepartment}
									sectionState={sectionState}
									doSetSectionState={e => {
										setSectionState(state => {
											state.requirements = e							
										})
									}}	
								/>
							</div>
							)}


						<div className="col-span-6">
							{props.DataMode == "verify" && (
								<Notes RPCId={props.RPCId}/>
							)}
						</div>
						<div className="col-span-6">
							<SubmissionToolbar 
								mode={props.DataMode} 
								doSetRPCSubmissionState={e => beforeSubmit(e) } 
								sectionState={sectionState} 
								doSetSubmitAction={e => setSubmitAction(e)} 
								/>
						</div>
				</div>
			</form>
			<DevTool control={methods.control} />
		</FormProvider>
	)
}

const framer_sections = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.5 }
}
