import {SSNFieldNewEmployee, SSNField} from './SSNField'

export default function EmployeeInformation(props)
{
	return(
		<div className="p-5 border shadow rounded h-full space-y-3 bg-white">
			<div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
				<h2 className="text-xl">
					{(props.isNewEmployee ? "Step 1: " : "Step 3: ")} Employee Information
				</h2>
			</div>

			{!!props.isNewEmployee && (
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<SSNFieldNewEmployee obscure={true} />
			</div>
			)}
			<div className="flex flex-row gap-3">
			<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-2/5">
				<div>
					<label htmlFor="firstName">First Name</label>
					<input type="text" 
					id="firstName" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-1/5">
				<div>
					<label htmlFor="middleName">Middle Name</label>
					<input type="text" 
					id="middleName" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-2/5">
				<div>
					<label htmlFor="lastName">Last Name</label>
					<input type="text" 
					id="lastName" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			</div>
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="address">Address</label>
					<input type="text" 
					id="address" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>	
			<div className="flex flex-col justifyt-between md:space-y-3 w-full">
				<div>
					<label htmlFor="address2" className="md:hidden">Address Line 2</label>
					<input type="text" 
					id="address2" 
					className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-1/2">
					<div>
						<label htmlFor="City">City</label>
						<input type="text" 
						id="City" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
				<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-1/5">
					<div>
						<label htmlFor="state">State</label>
						<input type="text" 
						id="state" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>																		
				<div className="flex flex-col justifyt-between md:space-y-3 w-full md:w-auto">
					<div>
						<label htmlFor="zip">Zip Code</label>
						<input type="text" 
						id="zip" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
			</div>
			<div class="flex flex-row justify-items items-center gap-4">
				<div className="flex flex-col justifyt-between md:space-y-3 w-full">
					<div>
						<label htmlFor="phone">Phone</label>
						<input type="text" 
						id="phone" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
				<div className="flex flex-col justifyt-between md:space-y-3 w-full">
					<div>
						<label htmlFor="email">Email Address</label>
						<input type="text" 
						id="email" 
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
			</div>
			<div class="flex flex-row justify-items items-center gap-4">
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
						className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60" />
					</div>
				</div>
			</div>							
		</div>
	);
}