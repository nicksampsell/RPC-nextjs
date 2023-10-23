import cn from 'classnames'
import { useFormContext } from 'react-hook-form'
import { forwardRef, useRef } from 'react'
import debounce from 'lodash.debounce'


const TextArea = forwardRef(function({id, type, className, value, register, placeholder}, ref) {

	const debouncedValueSync = useRef(
	  debounce(async (value) => {
	    setValue(name, value)
	  }, 300)
	).current;

	return (
		<textarea
				id={id}
				type={type}
				className={cn("p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opactity-60", className)}
				placeholder={placeholder}
				defaultValue={!!value ? value : ""}
				onChange={
					e => debouncedValueSync(e.target.value)
				}
				ref={ref}
				{...register}></textarea>
	)
})

export default TextArea;