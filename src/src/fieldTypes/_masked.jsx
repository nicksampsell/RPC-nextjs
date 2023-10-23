import clsx from 'clsx';
import { useFormContext, useController, Controller} from 'react-hook-form'
import { forwardRef, useState } from 'react'
import InputMask from 'react-input-mask';
import { MdOutlineVisibility, MdOutlineVisibilityOff} from 'react-icons/md'

const Masked = forwardRef(function({id, type, name, className, value, register, placeholder, options, onChange, onBlur, extraOnChange, rules, maskPlaceholder, canObscure, altConditions, altMask, mask, alwaysShowMask}, ref) {

	const { control, setValue } = useFormContext();
	const [obscured, setObscured] = useState(false);
	const [maskedValue, setMaskedValue] = useState('');
	const { field, fieldState, formState } = useController({name, control})
	const [usedMask, setUsedMask] = useState(mask)


	return (
		<div className="flex flex-row">
			{obscured ? (
				<input
					type="password" 
					name={field.name}
					id={id}
					className={
						clsx("focus:outline-offset-0 focus:outline-blue-200  p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opactity-60", 
							!!canObscure && 'rounded-r-none',
							className
						)
					}
					value={field.value}
					placeholder={field.placeholder}
					onChange={field.onChange}
					onBlur={field.onBlur}
					ref={ref}
					mask={usedMask}
				 />
			) : (
			<InputMask
				name={field.name}
				id={id}
				className={
					clsx("focus:outline-offset-0 focus:outline-blue-200  p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opactity-60", 
						!!canObscure && 'rounded-r-none',
						className
					)
				}
				value={field.value}
				placeholder={field.placeholder}
				onChange={(e) => {
					field.onChange(e.target.value)
					setMaskedValue(e.target.value)
					if (typeof onChange === "function") onChange(e)
	            	if (extraOnChange) extraOnChange(e);
					maskOnChange(e)
				}}
				alwaysShowMask={alwaysShowMask}
				maskPlaceholder={maskPlaceholder}
				onBlur={field.onBlur}
				ref={ref}
				mask={mask}
			/>
		)}
		{!!canObscure && (
			<button type="button" className="px-2 rounded-r-lg bg-gray-200 border border-l-0 border-gray-300 text-2xl" onClick={e => setObscured(!obscured)}>
				{!obscured ? (
                <MdOutlineVisibility />
                ) : (
                <MdOutlineVisibilityOff />
                )}

            </button>
		)}
		</div>
    )
})

export default Masked;