'use client'
import { useState, useId, useRef } from 'react';
import clsx from 'clsx';
import CheckboxField from './CheckboxField';
import DateField from './DateField';
import FileField from './FileField';
import InputField from './InputField';
import TipTap from './TipTap';
import SelectField from './SelectField';



export default function FieldContainer(props) {
    const instance = useId();
    const inputRef = useRef()

    const convertEnumToType = (val) => {
        switch(parseInt(val))
        {
            case 0:
                return 'plaintext';
            case 1:
                return 'richtext';
            case 2: 
                return 'file';
            case 3:
                return 'date';
            case 4:
                return 'dateTime';
            case 5:
                return 'dateSpan';
            case 6:
                return 'dateTimeSpan';
            case 7:
                return 'money';
            case 8:
                return 'boolean';
            case 9:
                return 'radio';
            case 10:
                return 'toggle';
            case 11:
                return 'checkbox';
            default:
                return 'text';
            
        }
    }


    

    const baseClass = "p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60";
    return (
        <div>
            <label htmlFor={instance}>{props?.label}</label>
            {(convertEnumToType(props?.type) == "plaintext") ? (
                <InputField 
                    type="textarea" 
                    className={clsx(baseClass, props?.className)} 
                    id={instance}
                    onChange={e => props?.onChange(e.target.value)}
                    value={props?.value ?? ''}
                    { ...register(props?.name, { required: props?.isRequired })}
                    />
            ) : (convertEnumToType(props?.type) == "richtext") ? (
                <TipTap
                name={props?.name}
                id={instance}
                value={props?.value ?? ''}
                onChange={e => props?.onChange(e)}
                className={clsx(baseClass, props?.className)} 
                isRequired={props?.isRequired}/>
            ) : (convertEnumToType(props?.type) == "file") ? (
                <input type="file"
                    name={props?.name}
                    id={instance}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(baseClass, props?.className)} 
                    isRequired={props?.isRequired ?? false}
                />
            ) : (
                convertEnumToType(props?.type) == "date" || convertEnumToType(props?.type) == "dateTime" ||
                convertEnumToType(props?.type) == "dateSpan" || convertEnumToType(props?.type) == "dateTimeSpan"
            ) ? (
                <DateField
                    type={convertEnumToType(props?.type)}
                    name={props?.name}
                    id={instance}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e.target.value)}
                    className={clsx(baseClass, props?.className)} 
                    isRequired={props?.isRequired}
                />
            ) : (convertEnumToType(props?.type) == "money") ? (
                <input 
                    type="text"
                    name={props?.name}
                    id={instance}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(baseClass, props?.className)} 
                    { ...register(props?.name, { required: props?.isRequired })}
                />
                ) : (convertEnumToType(props?.type) == "radio") ? (

                    <CheckboxField 
                        type="radio"
                        name={props?.name}
                        id={instance}
                        value={props?.value ?? ''}
                        onChange={e => props?.onChange(e)}
                        className={clsx(baseClass, props?.className)} 
                        options={props?.options}
                        isRequired={props?.isRequired}
                    />
                ) : (convertEnumToType(props?.type) == "checkbox") ? (
                    <CheckboxField 
                        type="checkbox"
                        name={props?.name}
                        id={instance}
                        value={props?.value ?? ''}
                        onChange={e => props?.onChange(e)}
                        className={clsx(baseClass, props?.className)} 
                        options={props?.options}
                        isRequired={props?.isRequired}
                    />
                ) : (convertEnumToType(props?.type) == "toggle") ? (
                    <>
                    <p>Toggle</p>
                    <input 
                        type="checkbox"
                        name={props?.name}
                        id={instance}
                        value={props?.value ?? ''}
                        onChange={e => props?.onChange(e)}
                        className={clsx(baseClass, props?.className)} 
                        isRequired={props?.isRequired}
                    />
                    </>
                ) : (
                    <InputField 
                        type={props?.type ?? "text"} 
                        className={clsx(baseClass, props?.className)} 
                        id={instance}
                        onChange={e => props?.onChange(e.target.value)}
                        value={props?.value ?? ''}
                        isRequired={props?.isRequired}
                    />                
                )}                                                     
        </div>
    )
}