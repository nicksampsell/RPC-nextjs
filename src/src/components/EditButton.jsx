export const EditButton = (props) => {
	return (
		<button type="button" className="border bg-white bg-opacity-50 rounded p-2 -m-2 hover:bg-opacity-75 hidden" onClick={e => props.onClick()}>
			{props.buttonAction == 'edit' ? 'Save' : 'Edit'}
		</button>
	)
}