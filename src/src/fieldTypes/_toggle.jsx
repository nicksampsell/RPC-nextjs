import cn from 'classnames'
import { useFormContext, useController} from 'react-hook-form'
import { forwardRef, useState } from 'react'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'

const ToggleForm = forwardRef(function({id, type, name, className, value, register, placeholder, options, onChange, onBlur, innerLabel, rules}, ref) {

	const { control, setValue } = useFormContext();
	const { field, fieldState, formState } = useController({name, control})
	const [ selectedItem, setSelectedItem] = useState('')



	return (
		<div className="flex items-center mb-4">
		<Toggle
			id={id}
			name={field.name}
			className={cn("font-medium rounded-md w-full border border-slate-300 placeholder:opactity-60", className)}
			placeholder={placeholder}
			value={String(field.value)}
			onChange={field.onChange}
			onBlur={field.onBlur}
			ref={field.ref}
			options={options}
			defaultChecked={!!field.value}
			rules={rules}
		/>
		<div className="flex justify-between">
			{!!innerLabel && (
				<label htmlFor={name} className="font-semibold capitalize ml-2">{innerLabel}</label>
			)}
			</div>
		</div>
	)
})

export default ToggleForm;