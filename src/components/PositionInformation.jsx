export default function PositionInformation()
{
	return(
		<div className="p-5 border shadow rounded">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">Step 3: Position Information</h2>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="positionId">Position</label>
					<input type="text" 
					id="positionId" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="union">Union</label>
					<input type="text" 
					id="union" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="schedule">Schedule</label>
					<input type="text" 
					id="schedule" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="grade">Grade</label>
					<input type="text" 
					id="grade" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="step">Step</label>
					<input type="text" 
					id="step" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>	
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="wage">Wage</label>
					<input type="text" 
					id="wage" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="City">City</label>
					<input type="text" 
					id="City" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="state">State</label>
					<input type="text" 
					id="state" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>																		
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="zip">Zip Code</label>
					<input type="text" 
					id="zip" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="phone">Phone</label>
					<input type="text" 
					id="phone" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="email">Email Address</label>
					<input type="text" 
					id="email" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="employeeNumber">Employee Number</label>
					<input type="text" 
					id="employeeNumber" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>								
		</div>
	);
}