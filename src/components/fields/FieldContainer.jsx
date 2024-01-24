'use client'
import { useState, useId } from 'react';
import clsx from 'clsx';
export default function FieldContainer(props) {
    const instance = useId();

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
                return 'checkboxes';
            default:
                return 'text';
            
        }
    }

    console.log(props?.label)
    console.log(convertEnumToType(props?.type))
    return (
        <div>
            <label htmlFor={instance}>{props?.label}</label>
            {(convertEnumToType(props?.type) == "plaintext") ? (
                <textarea
                    name={props?.name}
                    id={instance}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)}></textarea>
            ) : (convertEnumToType(props?.type) == "richtext") ? (
                <textarea
                name={props?.name}
                id={instance}
                value={props?.value ?? ''}
                onChange={e => props?.onChange(e)}
                className={clsx(props?.className)}></textarea>
            ) : (convertEnumToType(props?.type) == "file") ? (
                <input type="file"
                name={props?.name}
                id={instance}
                value={props?.value ?? ''}
                onChange={e => props?.onChange(e)}
                className={clsx(props?.className)}
                />
            ) : (convertEnumToType(props?.type) == "date") ? (
                <input 
                    type="date"
                    name={props?.name}
                    id={instance}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)}
                />
            ) : (convertEnumToType(props?.type) == "dateTime") ? (
                <input 
                    type="datetime-local"
                    name={props?.name}
                    id={instance}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)}
                />
            ) : (convertEnumToType(props?.type) == "dateSpan") ? (
                <>
                <input 
                    type="date"
                    name={props?.name}
                    id={instance + '-start'}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)}
                />
                <input 
                    type="date"
                    name={props?.name}
                    id={instance + '-end'}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)}
                />
                </>             
            ) : (convertEnumToType(props?.type) == "dateTimeSpan") ? (
                <>
                <input 
                    type="datetime-local"
                    name={props?.name}
                    id={instance + '-start'}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)}
                />
                <input 
                    type="datetime-local"
                    name={props?.name}
                    id={instance + '-end'}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)}
                />
                </>             
            ) : (convertEnumToType(props?.type) == "money") ? (
                <input 
                    type="text"
                    name={props?.name}
                    id={instance}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)}
                />
                ) : (convertEnumToType(props?.type) == "radio") ? (
                    <input 
                        type="radio"
                        name={props?.name}
                        id={instance}
                        value={props?.value ?? ''}
                        onChange={e => props?.onChange(e)}
                        className={clsx(props?.className)}
                    />
                ) : (convertEnumToType(props?.type) == "checkbox") ? (
                    <input 
                        type="date"
                        name={props?.name}
                        id={instance}
                        value={props?.value ?? ''}
                        onChange={e => props?.onChange(e)}
                        className={clsx(props?.className)}
                    /> 
                ) : (convertEnumToType(props?.type) == "toggle") ? (
                    <>
                    <p>Togglee</p>
                    <input 
                        type="checkbox"
                        name={props?.name}
                        id={instance}
                        value={props?.value ?? ''}
                        onChange={e => props?.onChange(e)}
                        className={clsx(props?.className)}
                    />
                    </>
                ) : (
                    <input 
                    type="text"
                    name={props?.name}
                    id={instance}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)}
                />                    
                )}                                                     
        </div>
    )
}