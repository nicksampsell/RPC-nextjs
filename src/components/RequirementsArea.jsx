export default function RequirementsArea(props)
{
	return(
		<div className="p-5 border shadow rounded">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">
					{(props.isBulk) ? "Step 3: " : (props.isNewEmployee) ? "Step4: " : "Step 5: "} Requirements &amp; Supporting Documentation</h2>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="rpcCategory">Select a Type of Change</label>

					<select 
					id="rpcCategory" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						<option className="p-3 text-l">Category</option>
					</select>
				</div>
				<div>
					<label htmlFor="rpcAction">Select an Action</label>
					<select id="rpcAction" className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						<option>Action</option>
					</select>
				</div>
			</div>
		</div>
	);
}