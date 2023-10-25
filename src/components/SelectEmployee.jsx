export default function SelectEmployee()
{
	return(
		<div className="p-5 border shadow rounded h-full">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">Step 2: Select Employee</h2>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="selectEmployee">Select Employee</label>

					<select 
					id="selectEmployee" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						<option className="p-3 text-l">Employee Name</option>
					</select>
				</div>
			</div>
		</div>
	);
}