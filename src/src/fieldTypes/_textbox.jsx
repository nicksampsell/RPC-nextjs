import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { forwardRef, useState } from 'react'
import { MdOutlineVisibility, MdOutlineVisibilityOff} from 'react-icons/md'

const TextBox = forwardRef(function({id, type, className, value, register, placeholder, readOnly, canObscure, mask}, ref) {

	const [obscured, setObscured] = useState(true);

	return (
		<div className="flex flex-row">
		<input
				id={id}
				type={type}
				className={
					clsx("focus:outline-offset-0 focus:outline-blue-200  p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opactity-60", 
						!!canObscure && 'rounded-r-none',
						className
					)
				}
				placeholder={placeholder}
				defaultValue={!!value ? value : ""}
				readOnly={readOnly}
				ref={ref}
				{...register}
			/>

		{!!canObscure && (
			<button type="button" className="px-2 rounded-r-lg bg-gray-200 border border-l-0 border-gray-300 text-2xl">
				{!obscured ? (
                <MdOutlineVisibility style={{'stroke-width':'1'}} />
                ) : (
                <MdOutlineVisibilityOff style={{'line-width':'1'}}/>
                )}

            </button>
		)}
		</div>
	)
})

export default TextBox;