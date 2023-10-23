import React from "react";
import { Timeline } from 'primereact/timeline';
import cn from 'classnames'

export const ApprovalTimeline = (props) => {
	const approvalEvents = [
		{
			id: 1,
			name: 'Your Name',
			jobTitle: 'Job Title',
			message: 'Submit RPC',
			status: 'success'
		},
		{
			id: 2,
			name: 'Another Person',
			jobTitle: 'Department Head',
			message: 'Approved',
			status: 'success'
		},
		{
			id: 3,
			name: 'A Third Person',
			jobTitle: 'Personnel Director',
			message: 'Correction Needed',
			status: 'error'
		},
		{
			id: 4,
			name: 'Another Person',
			jobTitle: 'Secretary of Civil Service',
			message: 'Awaiting Approval',
			status: 'waiting'
		},
		{
			id: 5,
			name: 'Civil Service Commission',
			jobTitle: '',
			message: '',
			status: 'pending'
		},							
	]

	return (
		<div className={cn("w-full bg-white p-5",props.className)}>
			<h2 className="bg-blue-300 -m-5 p-3 text-lg">Approval Progress</h2>
			
			<div className="flex justify-stretch items-start m-5">

			<Timeline 
			layout="horizontal"
			align="top"
			value={approvalEvents}
			content={(item) => TimelineItem(item)}
			opposite={(item) => TimelineStatusText(item)}
			marker={(item) => ItemMarker(item.status)}
			className="flex justify-stretch items-start justify-items-stretch"
			/>
		</div>
		</div>
	);
};


const colorStatus = (status) => {

	if(status == 'success')
		return 'text-green-600'
	else if(status == 'error')
		return 'text-red-400'
	else if(status == 'waiting')
		return 'text-sky-700'
	else
		return 'text-gray-400'
}


const ItemMarker = (status) => {
	let bullet = ''

	if(status == 'success')
	{
		return (
			<div className={cn('border-2 rounded-full border-gray-700 bg-green-400',bullet)}>
			<div className="border-0 rounded-full p-2 relative bg-green-400"></div></div>
		)
	}
	else if(status == 'error')
	{
		return (
			<div className={cn('border-2 rounded-full border-gray-700 bg-red-400',bullet)}>
			<div className="border-0 rounded-full p-2 relative bg-red-400 animate-ping motion-safe:animate-none"></div></div>
		)
	}
	else if(status == 'waiting')
	{
		return (
			<div className={cn('border-2 rounded-full border-gray-700 bg-sky-300',bullet)}>
			<div className="border-0 rounded-full p-2 relative bg-sky-300 animate-ping motion-safe:animate-none"></div></div>
		)		
	}
}

const TimelineStatusText = (item) =>
{


	return (
		<div className="w-auto">
			<p className={cn('mt-3 text-sm italic',colorStatus(item.status))}>{item.message ? item.message : " "}</p>
		</div>
	);
}


const TimelineItem = (item) =>
{
	return (
		<div className="w-auto">
				<h3 className="font-semibold">{item.name}</h3>
				{item.jobTitle &&
					(
						<p className="italic text-sm">({item.jobTitle})</p>
					)
				}
		</div>
	);
}

