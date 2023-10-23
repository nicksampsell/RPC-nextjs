import cn from 'classnames'
import { useFormContext, useController, useFieldArray} from 'react-hook-form'
import { forwardRef, useState, useEffect, useRef } from 'react'




const RadioForm = forwardRef(function({id, type, name, className, value, register, placeholder, options, onChange, onBlur, isCheckbox, rules, radioOptions, useBoolean}, ref) {

	const { control, setValue } = useFormContext();
	const { field, fieldState, formState } = useController({name, control})
	const [ selectedItems, setSelectedItems] = useState([])
	const optionsParsed = useRef();

	const doChange = (e) => field.onChange(e)
	const doBlur = (e) => field.onBlur(e)


	useEffect(() => {
		const selected = Array.isArray(field.value) ? field.value : [field.value]
		setSelectedItems(selected);

		if(useBoolean)
		{
			optionsParsed.current = [
				{
					label: "Yes",
					value: true,
				},
				{
					label: "No",
					value: false
				}
			]
		}
		else
		{
			optionsParsed.current = typeof(radioOptions) != 'undefined' ? JSON.parse(radioOptions) : options;
		}
	}, []);

	return (
		<div className="flex flex-col">
		{!!optionsParsed.current && optionsParsed.current.map((item, index) => (
			<div className="flex flex-row items-center justify-start mb-4" key={index}>
			<input
				type={!isCheckbox ? 'radio' : 'checkbox'}
				id={`${id}.option_${index}`}
				name={name}
				value={item.value}
				className={cn("font-medium rounded-md w-full border border-slate-300 placeholder:opactity-60 w-max", className)}
				onChange={doChange}
				onBlur={doBlur}
				{...register}
			/>
			<label htmlFor={`${id}.option_${index}`} className="font-semibold capitalize ml-2">{Object.keys(item).includes('label') ? item.label : item.value}</label>
			</div>
			))
		}
		</div>
	)
})

export default RadioForm;