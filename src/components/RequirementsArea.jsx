import { MdOutlineChevronRight } from 'react-icons/md'
export default function RequirementsArea(props)
{
	return(
		<div className="p-5 border shadow rounded h-full bg-white">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">
					{(props.isBulk) ? "Step 3: " : (props.isNewEmployee) ? "Step4: " : "Step 5: "} Requirements &amp; Supporting Documentation</h2>
			</div>
			<div className="flex flex-col md:flex-row justify-start space-x-3 items-center md:space-y-3 w-full">
				<div className="w-full md:w-1/3 gap-5">
					<label htmlFor="rpcCategory" className="inline-block mb-2">Select a Type of Change</label>
					<select 
					id="rpcCategory" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						<option className="p-3 text-l">Category</option>
					</select>
				</div>
				<MdOutlineChevronRight className="text-4xl" />
				<div className="w-full md:w-1/3">
					<label htmlFor="rpcAction">Select an Action</label>
					<select id="rpcAction" className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						<option>Action</option>
					</select>
				</div>
			</div>
		</div>
	);
}