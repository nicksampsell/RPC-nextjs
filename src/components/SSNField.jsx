'use client'
import {RiEyeCloseLine, RiEyeLine  } from 'react-icons/ri';
import { useState } from 'react';
export function SSNFieldNewEmployee(props)
{
    return (
        <div className="flex flex-col md:flex-row justifyt-between md:space-y-3 w-full bg-yellow-100 rounded p-5 gap-5 justify-items-between items-center border-yellow-200 border shadow-sm">
            <div className="w-full md:w-1/2">
                <SSNField {...props} />
            </div>
            <div className="w-full md:w-1/2 text-sm text-center">
                <p>Enter the new employee's Social Security Number and any information we have on file will automatically be filled in.</p>
            </div>
        </div>
    )
}

export function SSNField(props)
{
    const [obscure, setObscure] = useState(!!props.obscure);

    return (
        <>
        <label htmlFor="ssn">Social Security Number</label>
            <div className="flex flex-row">
                <input type={!!obscure ? "password" : "text"}
                id="ssn" 
                className="p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60 border-r-0 rounded-r-none" />
                <button 
                    className="text-2xl p-3 bg-slate-100 border-slate-300 border rounded-r"
                    onClick={() => setObscure(!obscure)}
                >{!!obscure ? <RiEyeCloseLine /> : <RiEyeLine />}</button>
            </div>
        </>
    )
}