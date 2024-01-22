'use client'
import {useStore} from '@/app/editor/globalStore'
import { useGetEmployeesAndPositions } from '@/queries/fetch.hooks'
import { useGetEmployeesByDepartment } from '@/queries/employee.hooks'
import {useEffect, useState} from 'react'


export default function SelectEmployee(props)
{
	const globalStore = useStore();
	const [searchOptions, setSearchOptions] = useState({
		'includeAllEmployees': false,
		'includeFormerEmployees': false
	});

	const getAllEmployees = useGetEmployeesByDepartment(
		globalStore.currentOrganization?.organizationId, 
		globalStore.currentDepartment?.departmentId,
		!!searchOptions.includeAllEmployees,
		!!searchOptions.includeFormerEmployees)

	useEffect(() => {
		globalStore.setAllEmployees(getAllEmployees.data)
	}, [getAllEmployees.data, getAllEmployees.isSuccess])


	console.log()

	const changeEmployee = (employeeId) => {
		globalStore.setCurrentEmployee(
			globalStore.allEmployees.find(x => x.employeeId == employeeId)
		);

		globalStore.setCurrentPosition(
			globalStore.allPositions.find(x => x.positionId == globalStore.allEmployees.find(x => x.employeeId == employeeId)?.positions[0]?.positionId)
		)

	}


	return(
		<div className="p-5 border shadow rounded h-full bg-white">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">Step 2: Select Employee</h2>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="selectEmployee">Select Employee</label>

					<select 
					id="selectEmployee" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
					onChange={e => changeEmployee(e.target.value)} value={globalStore.currentEmployee == null ? -1 : globalStore.currentEmployee?.id}>
						<option className="p-3 text-l" value="-1">{(getAllEmployees.status == "loading") ? "Loading..." : "Select an Employee"}</option>
						{!!globalStore.allEmployees && globalStore.allEmployees?.map(data => (
							<option value={data.employeeId} key={data.employeeId}>{data.firstName} {data.lastName}</option>
						))}
					</select>					
				</div>
					
				<div className="flex flex-row justify-start items-center ml-1">
					<input type="checkbox" id="includeAllDepartments" className="mr-2"  checked={searchOptions.includeAllEmployees} onChange={() => setSearchOptions({...searchOptions, includeAllEmployees: !searchOptions.includeAllEmployees})} />
					<label htmlFor="includeAllDepartments">Include employees from <strong>ALL</strong> departments you have access to in the dropdown?</label>
				</div>
				<div className="flex flex-row justify-start items-center ml-1 !mt-0">
					<input type="checkbox" id="includeFormerEmployees" className="mr-2"checked={searchOptions.includeFormerEmployees} onChange={() => setSearchOptions({...searchOptions, includeFormerEmployees: !searchOptions.includeFormerEmployees})} />
					<label htmlFor="includeFormerEmployees">Include former employees in the dropdown?</label>
				</div>				
			</div>
		</div>
	);
}