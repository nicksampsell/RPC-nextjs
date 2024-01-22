'use client'
import {SSNFieldNewEmployee, SSNField} from './SSNField'
import {useStore} from '@/app/editor/globalStore'
import {useEffect, useState} from 'react'
import { useGetEmployeeBySSN } from '../queries/fetch.hooks'
import { PatternFormat } from 'react-number-format';

export default function EmployeeInformation(props)
{
	const globalStore = useStore();

	const searchEmployee = useGetEmployeeBySSN(globalStore?.currentEmployee?.ssn);

	useEffect(() => {

		const { data: employee} = searchEmployee;

		globalStore.setCurrentEmployee({...globalStore.currentEmployee, 
			firstName: employee?.firstName,
			middleName: employee?.middleName,
			lastName: employee?.lastName,
			address: employee?.currentAddress?.address,
			address2: employee?.currentAddress?.address2,
			city: employee?.currentAddress?.city,
			state: employee?.currentAddress?.state,
			zipCode: employee?.currentAddress?.zipCode,
			phone: employee?.phone,
			email: employee?.personalEmail,
			employeeNumber: employee?.employeeNumber
		});

	}, [searchEmployee.data, searchEmployee.isSuccess])

	return(
		<div className="p-5 border shadow rounded h-full space-y-3 bg-white">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">
					{(props.isNewEmployee ? "Step 1: " : "Step 3: ")} Employee Information
				</h2>
			</div>

			{!!props.isNewEmployee && (
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<SSNFieldNewEmployee 
				obscure={true} 
				value={globalStore.currentEmployee?.ssn || ''}
				onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, ssn: e.target.value})}
				/>
			</div>
			)}
			<div className="flex flex-row gap-3">
			<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-2/5">
				<div>
					<label htmlFor="firstName">First Name</label>
					<input type="text" 
					id="firstName" 
					value={globalStore.currentEmployee?.firstName || ""}
					onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, firstName: e.target.value })}
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-1/5">
				<div>
					<label htmlFor="middleName">Middle Name</label>
					<input type="text" 
					id="middleName"
					value={globalStore.currentEmployee?.middleName || ""}
					onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, middleName: e.target.value })}					
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-2/5">
				<div>
					<label htmlFor="lastName">Last Name</label>
					<input type="text" 
					id="lastName"
					value={globalStore.currentEmployee?.lastName || ""}
					onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, lastName: e.target.value })}					 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="address">Address</label>
					<input type="text" 
					id="address" 
					value={globalStore.currentEmployee?.address || ""}
					onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, address: e.target.value })}
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>	
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="address2" className="md:hidden">Address Line 2</label>
					<input type="text" 
					id="address2" 
					value={globalStore.currentEmployee?.address2 || ""}
					onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, address2: e.target.value })}					
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-1/2">
					<div>
						<label htmlFor="City">City</label>
						<input type="text" 
						id="City" 
						value={globalStore.currentEmployee?.city || ""}
						onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, city: e.target.value })}						
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
				<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-1/5">
					<div>
						<label htmlFor="state">State</label>
						<input type="text" 
						id="state" 
						value={globalStore.currentEmployee?.state || ""}
						onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, state: e.target.value })}						
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>																		
				<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-auto">
					<div>
						<label htmlFor="zip">Zip Code</label>
						<input type="text" 
						id="zip" 
						value={globalStore.currentEmployee?.postalCode || ""}
						onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, postalCode: e.target.value })}						
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-items items-center gap-4">
				<div className="flex flex-col justifyt-between md:space-y-3 w-full">
					<div>
						<label htmlFor="phone">Phone</label>
						<PatternFormat
						type="text" 
						id="phone"
						format="(###) ###-#### #####"
						value={globalStore.currentEmployee?.phone || ""}
						onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, phone: e.target.value })}						
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
				<div className="flex flex-col justifyt-between md:space-y-3 w-full">
					<div>
						<label htmlFor="email">Email Address</label>
						<input type="text" 
						id="email" 
						value={globalStore.currentEmployee?.email || ""}
						onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, email: e.target.value })}
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-items items-center gap-4">
				{!props.isNewEmployee && (
					<div className="flex flex-col justifyt-between md:space-y-3 w-full">
						<div>
							<SSNField obscure={true} />
						</div>
					</div>					
				)}
				<div className="flex flex-col justifyt-between md:space-y-3 w-full">
					<div>
						<label htmlFor="employeeNumber">Employee Number</label>
						<input type="text" 
						id="employeeNumber" 
						value={globalStore.currentEmployee?.employeeNumber || ""}
						onChange={e => globalStore.setCurrentEmployee({...globalStore.currentEmployee, employeeNumber: e.target.value })}
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
			</div>							
		</div>
	);
}