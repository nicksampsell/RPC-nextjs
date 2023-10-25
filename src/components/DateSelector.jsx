'use client'
import {useStore} from '@/app/editor/globalStore'
export default function DateSelector(props)
{
	
    return (
        <div className="p-5 border shadow rounded h-full bg-white">
			<div className="flex flex-row justify-between items-center rounded-t">

                <h1 className="text-2xl">Request of Personnel Change & Extended Payroll Certificate</h1>

                				<div>
					<label htmlFor="rpcDate">Originating Date</label>

					<input type="date" 
					id="rpcDate" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
            </div>
        </div>
    )
}