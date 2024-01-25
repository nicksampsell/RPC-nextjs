import clsx from 'clsx';
import { useId } from 'react';
export default function DateField(props) {

    return (
        <div class="flex justify-between">
            <div class="grow-1">
                <label htmlFor={props?.id + '-start'}>{props.type == "dateSpan" || props.type == "dateTimeSpan" ? "Starting Date" : "Date"}</label>
                <input
                    type={(props.type == "dateTimeSpan" || props.type == "dateTime") ? "datetime-local" : "date"}
                    name={props?.name}
                    id={props?.id + '-start'}
                    value={props?.value ?? ''}
                    onChange={e => props?.onChange(e)}
                    className={clsx(props?.className)} 
                    { ...register(props?.name, { required: props?.isRequired ?? false})}
                    />
            </div>
            {(props?.type == "dateSpan" || props.type == "dateTimeSpan") && (
                <div class="grow-1">
                    <label htmlFor={props?.id + '-end'}>Ending Date</label>
                    <input 
                        type={props.type == "dateTimeSpan" ? "datetime-local" : "date"}
                        name={props?.name}
                        id={props?.id + '-end'}
                        value={props?.value ?? ''}
                        onChange={e => props?.onChange(e)}
                        className={clsx(props?.className)}
                        { ...register(props?.name, { required: props?.isRequired ?? false })}
                    />
                </div>
            )}
        </div>
    )
}
