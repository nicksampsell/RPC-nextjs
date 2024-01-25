import clsx from 'clsx';
export default function InputField(props) {
    return (
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
    )
}