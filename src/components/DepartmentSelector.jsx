'use client'
import {useStore} from '@/app/editor/globalStore'
import { useGetOrganizations, useGetDepartments, useLoadRPCById, useCreateRPCMutation, useUpdateRPCMutation } from '@/queries/fetch.hooks'
import {useEffect, useState} from 'react'

export default function DepartmentSelector(props)
{

	const globalStore = useStore();
	const orgInfo = useGetOrganizations();
	const allDepartments = useGetDepartments(!!globalStore.currentOrganization && globalStore.currentOrganization?.organizationId)
	const [deptNo, setDeptNo] = useState('') //workaround for zustand not updating nested field

	useEffect(() => {
		if(orgInfo.isSuccess)
		{
			globalStore.setAllOrganizations(orgInfo.data)
		}
	}, [orgInfo])
	useEffect(() => {
		if(allDepartments.isSuccess)
		{
			globalStore.setAllDepartments(allDepartments.data);
		}
	}, [allDepartments])

	const changeOrganization = (id) => {
		globalStore.setCurrentOrganization(globalStore.allOrganizations.find(x => x.organizationId == id))
		globalStore.setCurrentPosition(null);
		setDeptNo('') //workaround for zustand not updating nested field
		globalStore.setCurrentDepartment(null);
	}


	const changeDepartment = (id) => {
		const selectedDept = globalStore.allDepartments.find(x => x.departmentId == id);
		globalStore.setCurrentDepartment(selectedDept)
		setDeptNo(selectedDept.departmentNumber) //workaround for zustand not updating nested field
		globalStore.setCurrentPosition(null);
	}

	console.log(globalStore);


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
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
					value={globalStore?.organizationId || ""}
					onChange={e => changeOrganization(e.target.value)} value={globalStore.currentOrganization == null ? -1 : globalStore.currentOrganization?.organizationId}>
						<option className="p-3 text-l" value="-1" key="-1">{(orgInfo.status == "loading") ? "Loading..." : "Select an Organization"}</option>
						{!!globalStore.allOrganizations && globalStore.allOrganizations?.map(data => (
							<option value={data.organizationId} key={data.organizationId}>{data.title}</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="departmentField">Department</label>
					<select
					disabled={(!globalStore.allDepartments || globalStore.allDepartments.length <= 0) && true }
					id="departmentField" className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60 disabled:bg-gray-200"
					onChange={e => changeDepartment(e.target.value)} 
					value={globalStore?.currentDepartment?.departmentId || ""}>
						<option className="p-3 text-l" value="-1" key="-1">{(allDepartments.status == "loading") ? "Loading..." : "Select a Department"}</option>
						{!!globalStore.allDepartments && globalStore.allDepartments?.map(data => (
							<option value={data.departmentId} key={data.departmentId}>{data.title}</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="accountNoField" >Account Number</label>
					<input 
					id="accountNoField" 
					type="text" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
					readOnly
					defaultValue={globalStore?.currentDepartment?.accountNumber}
					/>
				</div>					
			</div>

		</div>
		
	);
}