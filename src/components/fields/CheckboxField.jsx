import clsx from 'clsx';
import { useState } from 'react';
export default function CheckboxFields(props) 
{
    const [currentValue, setValue] = useState([props?.value]);

    const handleChange = (val) => {
        if(!props.type || props.type == "checkbox")
        {
            let newState = currentValue.includes(val) ? [...currentValue.filter(x => x != val)] : [...currentValue, val];

            props.onChange(newState);
            setValue(newState);
        }
        else
        {
            props.onChange(val);
            setValue([val]);
        }
    }

    const options = !!props.options && JSON.parse(props.options);
    return (
        <ul>
            {!!props.options && options.map((x, index) => (
                <li key={props?.id + '-' + index}>
                    <input 
                        type={props?.type ?? "checkbox"}
                        id={props?.id + '-' + index}
                        name={props?.name}
                        value={x.value}
                        checked={currentValue.includes(x.value)}
                        onChange={e => handleChange(e.target.value)}
                        />
                    <label htmlFor={props?.id + '-' + index}>{x.value}</label>
                </li>
            ))}

        </ul>
    )

}