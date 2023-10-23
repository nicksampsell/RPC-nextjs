import { useState, useEffect } from 'react'
import cn from 'classnames'
import InputField from '../fieldTypes/inputField'
import { useFormContext } from 'react-hook-form'

export default function formTitle(props) {
	const { register, formState: { errors }, control, watch, setValue, getValues } = useFormContext()

	useEffect(() => {
		//create a new Date object with current time
		//Set it to ISO8601 format yyyy-mm-ddThh:mm:ssZ (2023‐07‐06T14:22:13Z)
		//Lop off everything after the T
		const TodayDate = new Date().toISOString().split('T')[0]
		setValue('originatingDate',TodayDate, { shouldTouch: true, shouldDirty: true })
	}, [])

	return (
		<div className={cn("flex flex-col md:flex-row justify-between items-center basis-full border shadow rounded p-5",props.className)}>
			<h1 className="text-3xl basis-full text-center md:text-left pb-10 mb-10 border-b md:pb-0 md:mb-0 md:border-b-0 md:basis-3/4 font-semibold grow">Report of Personnel Change & Extended Payroll Certificate</h1>
			<div className="shrink basis-full md:basis-1/4">
			<InputField type="date" readOnly={false} name="originatingDate"  id="originatingDate" label="Originating Date" rules={{required: "Required", validAsDate: "Invalid Date"}} />
			</div>
		</div>
	)
}