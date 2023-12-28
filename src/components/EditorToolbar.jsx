export default function EditorToolbar(props)
{

	return(
		<div className="p-5 border shadow rounded h-full bg-white">
			<div className="flex flex-row justify-between items-center">
			<button type="button" className="border border-gray-300 p-3 
			rounded hover:bg-gray-200 hover:border-gray-400 
			active:bg-gray-300 active:border-gray-400">Cancel</button>


			<button type="button" className="border border-green-300 p-3 
			rounded hover:bg-green-200 hover:border-green-400 
			active:bg-green-300 active:border-green-400">Submit for Processing</button>
			</div>
		</div>
	);
}