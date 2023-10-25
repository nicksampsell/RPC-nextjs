'use client'
import {useStore} from '@/app/editor/globalStore'
export default function DepartmentSelector(props)
{

	const globalStore = useStore();
	console.log(globalStore)


	return(
		<div className="p-5 border shadow rounded h-full bg-white">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">
					{(props.isNewEmployee ? "Step 2: " : "Step 1: ")} Department Information
				</h2>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="organizationField">Organization</label>

					<select 
					id="organizationField" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						<option className="p-3 text-l">Organization</option>
					</select>
				</div>
				<div>
					<label htmlFor="departmentField">Department</label>
					<select id="departmentField" className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						<option>Organization</option>
					</select>
				</div>
				<div>
					<label htmlFor="accountNoField" >Account Number</label>
					<input 
					id="accountNoField" 
					type="number" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
					onChange={e => globalStore.updateSingleField("currentDepartment","accountNumber",e.target.value)}
					/>
				</div>					
			</div>

		</div>
		
	);
}