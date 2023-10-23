import { useState } from 'react'
import cn from 'classnames'
import InputField from '../fieldTypes/inputField'

export default function RPCTypeSelector(props) {

	const isSelectedClass = (val) => {
		if(props.sectionState.rpcType)
		{
			if(props.sectionState.rpcType != val)
			{
				return 'opacity-50'
			}
			else
			{
				return 'opacity-100'
			}
		}
	}

	return (
		<div className={cn("border shadow rounded p-5",props.className)}>
		<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
			<h2 className="text-xl">What type of RPC are you creating?</h2>
		</div>
			<div className="flex flex-row justify-between w-full space-x-3">

				<button type="button" className={cn("bg-blue-500 basis-full gap-1 rounded-md bg-blue-600 p-3 min-h-3 text-center font-semibold text-white hover:bg-blue-800",isSelectedClass('newEmployee'))} 
				onClick={e => props.doSetSectionState('newEmployee')}> New Employee</button>

				<button type="button" className={cn("bg-blue-500 basis-full gap-1 rounded-md bg-blue-600 p-3 text-center font-semibold text-white hover:bg-blue-800",isSelectedClass('selectEmployee'))} 
				onClick={e => props.doSetSectionState('selectEmployee')}>Modifying an Existing Employee</button>

				<button type="button" className={cn("bg-blue-500 basis-full gap-1 rounded-md bg-blue-600 p-3 text-center font-semibold text-white hover:bg-blue-800",isSelectedClass('bulk'))} 
				onClick={e => props.doSetSectionState('bulk')}> A Bulk RPC</button>

			</div>
		</div>
	)
}