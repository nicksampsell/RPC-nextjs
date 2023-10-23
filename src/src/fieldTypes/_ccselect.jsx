import clsx from 'clsx';
import { useFormContext, useController, Controller} from 'react-hook-form'
import { forwardRef, useState, useEffect, useRef } from 'react'
import Select from 'react-select'

const CCSelect = forwardRef(function({id, type, name, className, value, register, placeholder, 
	options, onChange, onBlur, isLoading, isMulti, rules, extraOnChange, getOptionLabel, getOptionValue, readOnly, hideSelectedOptions, hasError, doSetValue}, ref) {

	const { control, setValue, getValues } = useFormContext();
	const { field, fieldState, formState } = useController({name, control})
	const [ selectedOptions, setSelectedOptions] = useState([])
	//font-medium rounded-md w-full border border-slate-300 placeholder:opactity-60
	const [ modifiedOptions, setModifiedOptions] = useState([]);
	const showSelectAll = useRef();


	useEffect(() => {

		if(options?.length > 0)
		{
			if(isMulti)
			{
				if(getValues(field.name).length < modifiedOptions.filter(x => x.value != '___DO_SELECT_ALL___').length)
				{
					setModifiedOptions([...options]);
				}
				else
				{
					setModifiedOptions([...options]);
				}
			}
			else
			{
				setModifiedOptions([...options]);
			}
		}

	},[options]);

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={selectedOptions}
			rules={rules}
			render={({ field }) => (
			<Select

				inputId={id}
				name={field.name}
				styles={{
					input: (base) => ({
						...base,
						"input:focus": {
							boxShadow: "none",
						},
					}),
				}}
				classNames={{
					control: () => clsx(
							"p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opactity-60",
							hasError && "react-select-error"
						),
					placeholder: () => "opacity-60",
					menu: () => "bg-white border border-slate-300 rounded shadow-sm mt-1 narrowScrollbar mb-2",
					input: () => "border-0",
					valueContainer: () => "gap-2",
					singleValue: () => "",
					multiValue: () => "text-sm p-1 border rounded shadow-sm bg-gray-100 font-normal hover:bg-gray-200 ",
					multiValueLabel: () => "",
					multiValueRemove: () => "ml-2",
					indicatorsContainer: () => "",
					clearIndicator: () => "p-2",
					indicatorSeparator: () => "border-l",
					dropdownIndicator: () => "pl-2",
					groupHeading: () => "",
					option: ({ isFocused, isSelected }) =>
						clsx(
						isFocused && "bg-gray-100 active:bg-gray-200",
						isSelected && "text-black font-bold bg-gray-50",
						"hover:cursor-pointer px-3 py-3 rounded fit-content",
						),
						noOptionsMessage: () => "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm",

				}}
				placeholder={placeholder}
				value={field.value}
				onChange={option => {

					if(!!isMulti && option?.some(x => x.value === '___DO_SELECT_ALL___'))
					{
						field.onChange([...options])
						setValue(field.name, [...options])
					}
					else
					{
						field.onChange(option)
						setValue(field.name, option)
					}

					if (typeof onChange === "function") onChange(!!option ? option.value : option);
	            	if (extraOnChange) extraOnChange(option);
				}}
				onBlur={field.onBlur}
				inputRef={field.ref}
				options={(!!isMulti && Array.isArray(options)) ? [{label:'Select All',value:'___DO_SELECT_ALL___'}, ...options] : options}
				isMulti={isMulti}
				isLoading={isLoading}
				unstyled
				ref={ref}
				hideSelectedOptions={hideSelectedOptions}
				selectOption={setSelectedOptions}
			/>
		)}
    />
    )
})

export default CCSelect;