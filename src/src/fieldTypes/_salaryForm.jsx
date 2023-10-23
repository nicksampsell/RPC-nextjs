import cn from 'classnames'
import { useFormContext } from 'react-hook-form'
import { forwardRef } from 'react'

const SalaryForm = forwardRef(function({id, type, className, value, register, placeholder}, ref) {
	return (
		<div className="flex flex-row">
		<span className="py-2 px-4 font-semibold text-2xl bg-gray-200 border rounded-l">$</span>
		<input
				id={id}
				type={type}
				className={cn("p-3 font-medium rounded-md w-3/5 md:w-1/4 border border-slate-300 placeholder:opactity-60 rounded-l-none", className)}
				placeholder={placeholder}
				defaultValue={!!value ? value : ""}
				ref={ref}
				{...register}
			/>
		</div>
	)
})

export default SalaryForm;