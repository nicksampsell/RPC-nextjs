import { useRef } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import { findInputError, isFormInvalid } from '../helpers/InputHelper'
import TextBox from './_textbox'
import CCSelect from './_ccselect'
import ReactSelect from "react-select";
import TipTap from './_tiptap'
import TextArea from './_textarea'
import ToggleForm from './_toggle'
import RadioCheckbox from './_radioCheckbox'
import FileUpload from './_fileUpload'
import SalaryForm from './_salaryForm'
import Masked from './_masked'



export default (props) => {
	
	const { register, formState: { errors }, control } = useFormContext()
	const inputError = findInputError(errors, props.name)
	const isInvalid = isFormInvalid(inputError)
	const inputRef = useRef()

	const isReadonly = () => {
		if(readOnly !== undefined)
		{
			return !!readOnly
		}
		else
		{
			if(sectionState != undefined && sectionState != 'edit')
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}

	const innerProps = {
		...props,
		id:  props.id,	
		type:  props.type,
		name: props.name,
		className: props.className,
		placeholder: props.placeholder,	
		defaultValue: !!props.value ? props.value : "",
		ref: props.inputRef,	
		register: {...register(props.name, {...props.rules})},
		onChange: props.onChange,
		onBlur: props.onBlur,
		rules: props.rules,

		hasError: isInvalid
	}

	return (
		<div className={cn('flex flex-col w-full gap-2 transition-[height] mb-5', { 'has-error': isInvalid }, props.outerClass)}>
			<div className={cn("flex justify-between flex-wrap items-end")}>
				<label htmlFor={props.id} className={cn("",props.labelClass)}>{props.label}</label>
				{!props.hideError && (
					<AnimatePresence mode="wait" initial={false}>
					{isInvalid && (
						<InputError message={inputError.error.message}
						key={inputError.error.message}
						iconOnly={props.errorIconOnly}
						/>
					)}
					</AnimatePresence>
					)}
			</div>



			{(props.type == "select") ? (
				<CCSelect {...innerProps} 
				options={props.options} 
				isMulti={props.isMulti} 
				isLoading={props.isLoading} 
				getOptionLabel={props.getOptionLabel} 
				extraOnChange={props.extraOnChange} 
				getOptionValue={props.getOptionValue} 
				hideSelectedOptions={props.hideSelectedOptions} 
				delimiter={props.delimiter}
				mask={props.mask} 
				doSetValue={props.doSetValue} />

			) : (props.type == "tiptap") ? (

				<TipTap {...innerProps} />

			) : (props.type == "textarea") ? (

				<TextArea {...innerProps} />

			) : (props.type == "toggle") ? (

				<ToggleForm {...innerProps} />
			) : (props.type == "radio") ? (
				<RadioCheckbox {...innerProps} options={props.options} radioOptions={props.radioOptions} />
			) : (props.type == "boolean") ? (
				<RadioCheckbox {...innerProps} options={props.options} useBoolean={true} />				
			) : (props.type == "checkbox") ? (
				<RadioCheckbox {...innerProps} options={props.options} isCheckbox radioOptions={props.radioOptions} />

			) : ( props.type == "salary") ? (

				<SalaryForm {...innerProps} />				

			) : ( props.type == "file") ? (

				<FileUpload {...innerProps} 
				actionId={props.actionId} 
				formName={props.formName} 
				RPCId={props.RPCId} 
				dataMode={props.dataMode} 
				/>

			) : ( props.type == "mask" || props.type == "masked") ? (

				<Masked {...innerProps} 
				maskPlaceholder={props.maskPlaceholder} 
				alwaysShowMask={props.alwaysShowMask} 
				mask={props.mask} 
				altMask={props.altMask} 
				altConditions={props.altConditions} 
				extraOnChange={props.extraOnChange} 
				canObscure={props.canObscure} />

			) : (
			
				<TextBox {...innerProps} 
				canObscure={props.canObscure} />
			)}
		</div>
	)
}

export const InputError = ({ message, iconOnly }) => {
	return (
		<motion.p
			className={cn("flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md", (iconOnly && 'p-1'))}
			{...framer_error}
		>
		<MdError />
		{!iconOnly && message}
		</motion.p>
	)
}

export const framer_error = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.2 }
}
