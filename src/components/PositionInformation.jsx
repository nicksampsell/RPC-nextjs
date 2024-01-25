'use client'
import {useRef, useEffect} from 'react'
import {useStore} from '@/app/editor/globalStore'
import { useGetPositions } from '@/queries/fetch.hooks';
import { useStepConversion } from '../hooks/employee.hooks'

export default function PositionInformation(props)
{
	const wageRef = useRef(null);
	const globalStore = useStore();

	const allPositions = useGetPositions(!!globalStore.currentOrganization && globalStore.currentOrganization?.organizationId,
										!!globalStore.currentDepartment && globalStore.currentDepartment?.departmentId);

	useEffect(() => {

		if(allPositions.isSuccess)
		{
			globalStore.setAllPositions(allPositions.data)
		}

	}, [allPositions]);
	
	useEffect(() => {

		const currentStep = useStepConversion(globalStore?.currentEmployee?.employeePositions?.filter(x => x.status == 1)?.[0]?.step)
		const currentPosition = globalStore.allPositions?.find(x => x.positionId == globalStore?.allEmployees?.find(x => x.employeeId == globalStore.currentEmployee?.employeeId)?.positions[0]?.positionId)

		globalStore.setCurrentPosition(currentPosition)
		globalStore.setCurrentPositionSchedule(currentPosition?.schedule[0])

		globalStore.setStep(currentStep)
		globalStore.setWage(currentPosition?.payScales?.[0]?.wages?.find(x => x.stepTitle == currentStep)?.wage)



	}, [globalStore.currentPosition, globalStore.step, globalStore.currentEmployee])



	return(
		<div className="p-5 border shadow rounded h-full space-y-3 bg-white">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">Step 3: Position Information</h2>
			</div>
			<div className="flex flex-col justify-between md:space-y-3 w-full">
				<div>
					<label htmlFor="positionId">Position</label>
					<select
					id="positionId" 
					value={globalStore.currentPosition?.positionId || ""}
					onChange={e => {
						globalStore.setCurrentPosition(globalStore.allPositions?.find(x => x.positionId == e.target.value))
						globalStore.setCurrentPositionSchedule(globalStore.allPositions?.find(x => x.positionId == e.target.value)?.schedule[0])
					}}
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						{!!globalStore.allPositions && globalStore.allPositions.map(item => (
							<option value={item.positionId} key={item.positionId}>{item.positionTitle}</option>
						))}

					</select>
				</div>
			</div>
			<div className="flex flex-row gap-3">
				<div className="flex flex-col justify-between md:space-y-3 w-full">
					<div>
						<label htmlFor="union">Union</label>
						<input type="text" 
						id="union"
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
						readOnly
						value={globalStore?.currentPositionSchedule?.unionTitle || ""} />
					</div>
				</div>

			</div>
			<div className="flex flex-row gap-3">
				<div className="flex flex-col justify-between md:space-y-3 w-full">
					<div>
						<label htmlFor="schedule">Schedule</label>
						<select
						value={globalStore?.currentPositionSchedule?.payScheduleId || "EntryWage"}
						onChange={e => globalStore.setCurrentPositionSchedule(globalStore?.currentPosition.schedule.find(x => x.positionId == e.target.value))}
						id="schedule" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
							{!!globalStore.currentPosition && globalStore?.currentPosition.schedule?.map(item => (
								<option value={item.payScheduleId} key={item.payScheduleId}>{item.title}</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex flex-col justify-between md:space-y-3 w-full">
					<div>
						<label htmlFor="grade">Grade</label>
						<input type="text" 
						id="grade" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
						readOnly
						value={globalStore?.currentPositionSchedule?.grade || ""} />
					</div>
				</div>
				<div className="flex flex-col justify-between md:space-y-3 w-full">
					<div>
						<label htmlFor="step">Step</label>
						<select
						id="step" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
						value={globalStore?.step || ""}
						onChange={e => {
							globalStore.setStep(e.target.value)
							globalStore.setWage(globalStore.currentPosition?.payScales?.[0]?.wages?.find(x => x.stepTitle == e.target.value)?.wage)
						}}
						>
							{!!globalStore.currentPosition?.payScales?.[0]?.wages && globalStore.currentPosition?.payScales?.[0]?.wages?.map(item => (
								<option value={item.stepTitle} key={item.stepTitle}>{item.niceName}</option>
							))}
							<option value="manual" key="fixed">Fixed Rate</option>
						</select>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-between md:space-y-3 w-full">
				<div>
					<label htmlFor="wage">Wage</label>
					<div className="flex flex-row">
						<span onClick={() => wageRef.current.focus()} className="bg-slate-100 py-3 px-5 font-medium rounded border border-slate-300 rounded-r-none cursor-default">$</span>
						<input
						ref={wageRef} 
						type="text" 
						id="wage" 
						className="p-3 font-medium rounded-md w-full border rounded-l-none border-slate-300 border-l-0 placeholder:opacity-60" 
						readOnly={(globalStore?.step == "manual" ? false : true)}
						onChange={e => globalStore.setWage(e.target.value)}
						onKeyDown={e => globalStore.step != 'manual' && globalStore.setStep('manual')}
						value={globalStore.wage ?? ""} />
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-between md:space-y-3 w-full">
				<div>
					<label htmlFor="lastEmployee">Last Employee in Position</label>
					
					<input type="text" 
					id="lastEmployee" 
					className="p-3 font-medium rounded-md w-full rounded-l-none border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justify-between md:space-y-3 w-full">
				<div>
					<label htmlFor="heldPosition">Currently Holding Rights to:</label>
					<input type="text" 
					id="heldPosition" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
					readOnly />
				</div>
			</div>																		
								
		</div>
	);
}

