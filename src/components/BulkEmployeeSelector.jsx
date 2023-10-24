'use client'
import {useStore} from '@/app/editor/globalStore'
export default function BulkEmployeeSelector()
{
	const globalStore = useStore();
	return(
		<div className="p-5 border shadow rounded">
		<p>Bulk Employee Selector</p>
		{!!globalStore.currentDepartment?.accountNumber && globalStore.currentDepartment?.accountNumber }
		</div>

	);
}