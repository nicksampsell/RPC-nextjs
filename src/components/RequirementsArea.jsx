'use client'
import { useState, useEffect } from 'react';
import {useStore} from '@/app/editor/globalStore'
import { MdOutlineChevronRight } from 'react-icons/md'
import { useGetRPCActionCategories, useGetRPCActions } from '@/queries/fetch.hooks';

export default function RequirementsArea(props)
{


	const globalStore = useStore();

	const allCategories = useGetRPCActionCategories();
	const allActions = useGetRPCActions();


	useEffect(() => {
		if(allActions.isSuccess)
		{
			globalStore.setAllActions(allActions.data)
		}
	}, [allActions])

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
					value={globalStore.RPCActionCategory?.rpcActionCategoryId || ""}
					onChange={e => {
						globalStore.setRPCActionCategory(allCategories?.data?.find(x => x.rpcActionCategoryId == e.target.value));
					}}
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						<option className="p-3 text-l" value="-1" key="-1">{(allCategories.status == "loading") ? "Loading..." : "Select a Category"}</option>
						{!!allCategories.data && allCategories?.data?.map(data => (
							<option value={data.rpcActionCategoryId} key={data.rpcActionCategoryId}>{data.title}</option>
						))}
					</select>
				</div>
				<MdOutlineChevronRight className="text-4xl" />
				<div className="w-full md:w-1/3">


					<label htmlFor="rpcAction">Select an Action</label>
					<select 
					id="rpcAction" 
					disabled={!globalStore.allActions || !globalStore.RPCActionCategory?.rpcActionCategoryId || globalStore.RPCActionCategory?.rpcActionCategoryId == '-1'}
					onChange={e => {
						globalStore.setRPCAction(globalStore?.allActions?.find(x => x.rpcActionId == e.target.value));
					}}
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60">
						{(allActions.status == "loading") && (<option className="p-3 text-l" value="-1" key="-1">Loading...</option>)}
						{(!!globalStore.allActions && !!globalStore.RPCActionCategory) ? (
						<>
						<option className="p-3 text-l" value="-1" key="-1">Select an action</option>
						{!!globalStore.allActions && globalStore?.allActions?.filter(x => x.rpcActionCategoryId == globalStore?.RPCActionCategory?.rpcActionCategoryId)?.map(data => (
							<option value={data.rpcActionId} key={data.rpcActionId}>{data.title}</option>
						))}
						</>
						) : (
							<option value="-1"></option>
						)}
					</select>
				</div>
			</div>
		</div>
	);
}