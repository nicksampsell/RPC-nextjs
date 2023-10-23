import Link from 'next/Link';

export default function EditorLayout({children} : {children: React.ReactNode})
{
    return (
        <div className="m-10">
            <div className="border shadow rounded p-5 col-span-6 bg-white mb-3">
                <div class="flex flex-row justify-between items-center bg-blue-300 -m-5 mb-5 p-5 rounded-t">
                    <h2 class="text-xl">What type of RPC are you creating?</h2>
                </div>
                <div className="flex flex-row justify-between w-full space-x-3">
                    <Link href="/editor/new" className="bg-blue-500 basis-full gap-1 rounded-md bg-blue-600 p-3 min-h-3 
                    text-center font-semibold text-white hover:bg-blue-800">New Employee</Link>
                    <Link href="/editor/current" className="bg-blue-500 basis-full gap-1 rounded-md bg-blue-600 p-3 min-h-3 
                    text-center font-semibold text-white hover:bg-blue-800">Modify an Existing Employee</Link>
                    <Link href="/editor/bulk" className="bg-blue-500 basis-full gap-1 rounded-md bg-blue-600 p-3 min-h-3 
                    text-center font-semibold text-white hover:bg-blue-800">Create a Bulk RPC</Link>
                </div>
            </div>
            <div className="border shadow rounded p-5 col-span-6 bg-white mb-3">
                <section>{children}</section>
            </div>
        </div>
    )
}