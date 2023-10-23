import React from "react";
import cn from 'classnames'

export const SubmissionToolbar = (props) => {
	return (
		<div className={cn("flex-rows flex items-end justify-between bg-white p-4 mb-5 rounded shadow ",props.className)}>
			{props.mode == "edit" && <EditMode {...props} />}
			{props.mode == "verify" && <VerifyMode {...props} />}
		</div>
	);
};

const EditMode = (props) => {


	const setSubmissionState = (e, submissionState) => {
		props.doSetRPCSubmissionState(submissionState);
		!!props.onClick && props.onClick(e)
	}






	return (
		<>
			<div className="text-center">

				<div className="px-2">
					<button type="submit" onClick={e => setSubmissionState(e, 'noSave')} className="rounded-lg border  border-gray-500 p-3 hover:border-gray-500 hover:bg-gray-300">
						Cancel
					</button>					
				</div>
			</div>
			<div className="text-center">
				<div className="px-2">
				{props.sectionState.rpcType != '' ? (
					<button type="submit" 
					onClick={e => setSubmissionState(e, 'new')} 
					className="rounded-lg border border-green-300 p-3 hover:border-green-500 hover:bg-green-300 ">
						Submit for Processing
					</button>
				) : (<button type="button" disabled 
					className="rounded-lg border border-gray-300 text-gray-400 p-3 bg-gray-50 ">
						Submit for Processing
					</button>)}
				</div>
			</div>
		</>
	);
};

const VerifyMode = (props) => {

	const setSubmissionState = (val) => {
		props.doSetSubmitAction(val)
	}

	return (
		<>
			<div className="text-center">
				<h3 className="mb-3 border border-b-0 border-gray-500 text-lg">
					<span type="submit" className="relative -inset-y-3 bg-white pl-5 pr-5 text-gray-600">
						Requires Correction
					</span>
				</h3>
				<div className="px-2">
					<button 
					type="submit"
					name="returnDepartment"
					onClick={e => setSubmissionState("returnDepartment")} 
					className="rounded-lg border-r-0 rounded-r-none border border-red-400 p-3 hover:border-red-800 hover:bg-red-400 ">
						Return to Department
					</button>
					<button 
					type="submit"
					name="returnPrevious"
					onClick={e => setSubmissionState("returnPrevious")}  
					className="rounded-lg rounded-l-none border border-orange-300 p-3 hover:border-orange-500 hover:bg-orange-300">
						Return to Previous Step
					</button>
				</div>
			</div>
			<div>
				<div className="px-2 space-x-3">
					<button 
					type="submit"
					name="returnQueue"
					onClick={e => setSubmissionState("returnQueue")} 
					className="rounded-lg border border-gray-500 p-3 hover:border-gray-500 hover:bg-gray-300"
					>
						Return to Task List
					</button>

					<button 
						type="submit"
						name="saveChanges"
						onClick={e => setSubmissionState("saveChanges")} 
						className="rounded-lg border border-green-300 p-3 hover:border-green-500 hover:bg-green-300">
						Save Changes
					</button>

				</div>
			</div>

			<div className="text-center">
				<h3 className="mb-3 border border-b-0 border-gray-500 text-lg">
					<span className="relative -inset-y-3 bg-white pl-5 pr-5 text-gray-600">
						Approve
					</span>
				</h3>
				<div className="px-2">
					<button type="submit"
					 name="confirmProceed"
					 onClick={e => setSubmissionState("confirmProceed")}  
					 className="rounded-lg border border-green-300 p-3 hover:border-green-500 hover:bg-green-300 ">
						Confirm & Send to Next Step
					</button>
				</div>
			</div>
		</>
	);
};
