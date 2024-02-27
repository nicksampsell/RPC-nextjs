'use client'
import clsx from 'clsx';
import { Controller, useFormContext } from "react-hook-form"

export default function InputField(props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={props?.name}
            rules={{ required: props?.isRequired ?? false }}
            render={(
            <>
                {(props?.type == "textarea") ? (
                    <textarea
                            name={props?.name}
                            id={props?.id}
                            value={props?.value ?? ''}
                            onChange={e => props?.onChange(e)}
                            className={clsx(props?.className)}></textarea>
                ) : (
                    <input 
                        type={props?.type ?? "text"}
                        name={props?.name}
                        id={props?.id}
                        value={props?.value ?? ''}
                        onChange={e => props?.onChange(e)}
                        className={clsx(props?.className)}
                    /> 
                )}
            </>
            )}
        />
    )
}