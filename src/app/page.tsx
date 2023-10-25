import Link from 'next/Link';
import {useStore} from '@/app/editor/globalStore'

import { MdPersonAdd, MdPerson, MdGroups } from 'react-icons/md';


export default function Home({children} : {children: React.ReactNode}) {
  
  return (
            <div className="m-auto mt-10 mb-10 w-3/5 ">
            <div className="border shadow rounded p-5 col-span-6 bg-white mb-3">
                <div className="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
                    <h2 className="text-xl">What action are you completing?</h2>
                </div>
                <div className="flex flex-row justify-between w-full space-x-3">
                    <Link href="/editor/new" className="bg-blue-500 basis-full gap-1 rounded-md bg-blue-600 p-3 min-h-3 
                    text-center font-semibold text-white hover:bg-blue-800 flex">
                        <div className="justify-self-center self-center text-center m-auto">
                            <MdPersonAdd className="text-5xl m-auto"/>
                            <span>Add a New Employee</span>
                        </div>
                    </Link>
                    <Link href="/editor/current" className="bg-blue-500 basis-full gap-1 rounded-md bg-blue-600 p-3 min-h-3 
                    text-center font-semibold text-white hover:bg-blue-800 flex">
                        <div className="justify-self-center self-center text-center m-auto">
                            <MdPerson className="text-5xl m-auto" />
                            <span>Modify an existing employee</span>
                        </div>
                    </Link>
                    <Link href="/editor/bulk" className="bg-blue-500 basis-full gap-1 rounded-md bg-blue-600 p-3 min-h-3 
                    text-center font-semibold text-white hover:bg-blue-800 flex">
                        <div className="justify-self-center self-center text-center m-auto">
                            <MdGroups className="text-5xl m-auto" />
                            <span>Modify Multiple Employees at Once</span><br />
                            <span className="text-xs font-normal">(Bulk RPC)</span>
                        </div>
                    </Link>
                </div>
            </div>
            
                <section>{children}</section>
        </div>
  )
}
