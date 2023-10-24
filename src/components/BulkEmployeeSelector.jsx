'use client'
import {useStore} from '@/app/editor/globalStore'
export default function BulkEmployeeSelector(props)
{
	const globalStore = useStore();
	return(
		<div className="p-5 border shadow rounded">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">Step 2: Select Employees</h2>
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