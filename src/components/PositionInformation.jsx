'use client'
import {useRef} from 'react'
export default function PositionInformation(props)
{
	const wageRef = useRef(null);
	return(
		<div className="p-5 border shadow rounded h-full space-y-3 bg-white">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">Step 3: Position Information</h2>
			</div>
			<div className="flex flex-col justify-between md:space-y-3 w-full">
				<div>
					<label htmlFor="positionId">Position</label>
					<input type="text" 
					id="positionId" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-row gap-3">
				<div className="flex flex-col justify-between md:space-y-3 w-full">
					<div>
						<label htmlFor="union">Union</label>
						<input type="text" 
						id="union" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>

			</div>
			<div className="flex flex-row gap-3">
				<div className="flex flex-col justify-between md:space-y-3 w-full">
					<div>
						<label htmlFor="schedule">Schedule</label>
						<input type="text" 
						id="schedule" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
				<div className="flex flex-col justify-between md:space-y-3 w-full">
					<div>
						<label htmlFor="grade">Grade</label>
						<input type="text" 
						id="grade" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
				<div className="flex flex-col justify-between md:space-y-3 w-full">
					<div>
						<label htmlFor="step">Step</label>
						<input type="text" 
						id="step" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
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
						className="p-3 font-medium rounded-md w-full border rounded-l-none border-slate-300 border-l-0 placeholder:opacity-60" />
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