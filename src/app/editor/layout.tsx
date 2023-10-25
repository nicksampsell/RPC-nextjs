'use client'
import Link from 'next/Link';
import {MdOutlineChangeCircle} from 'react-icons/md';
import {useStore} from '@/app/editor/globalStore'

export default function EditorLayout({children} : {children: React.ReactNode})
{
    const clearForm = useStore((state) => state.clearForm);
    return (
        <div className="m-auto mt-10 mb-10 w-4/5" id="rpc-container">
            <div className="text-right">
                <Link href="/" legacyBehavior>
                    <a className="border p-3 bg-blue-500 text-white rounded shadow mb-5 inline-flex flex-row gap-1 items-center justify-between f-right"
                    onClick={(e:any) => {
                        clearForm();
                    }}>
                        <MdOutlineChangeCircle className="d-inline text-2xl"/> <span>Change RPC Type</span>
                    </a>                    
                </Link>

            </div>
            
                <section>{children}</section>
        </div>
    )
}


