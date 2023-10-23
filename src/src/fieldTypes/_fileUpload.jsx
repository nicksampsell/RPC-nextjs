import cn from 'classnames'
import { useFormContext, useController, Controller} from 'react-hook-form'
import { forwardRef, useState, useContext, useEffect, useRef, useCallback, useMemo } from 'react'
import { RPCDataSetContext } from '../RPCDataSetContext'
import Uploady, { useItemProgressListener, useItemErrorListener, useFileInput, UPLOADER_EVENTS } from '@rpldy/uploady'
import UploadButton, { asUploadButton } from '@rpldy/upload-button'
import UploadDropZone from "@rpldy/upload-drop-zone";
import { Circle, Line } from "rc-progress";
import retryEnhancer, { useBatchRetry, useRetry, useRetryListener } from "@rpldy/retry-hooks";
import { useGetFileUploads, useDeleteFileUploads } from '../queries/autofill.hooks'
import {MdOutlineDeleteForever} from 'react-icons/md';
import {GrAttachment} from 'react-icons/gr';


const UploadProgress = () => {
    const [uploads, setUploads] = useState({});
    const [failedItems, setFailedItems] = useState({})
    const [failedBatches, setFailedBatches] = useState([])
    const retry = useRetry()
    const retryBatch = useBatchRetry()
    const progressData = useItemProgressListener()

    useItemErrorListener((item) => {
    	const itemIdentity = item.file ? item.file.name : item.url;

    	if(!failedItems[itemIdentity])
    	{
    		setFailedItems((failed) => {
    			return { ...failed, [itemIdentity]: item.id };
    		})
    	}
    })

    useRetryListener(({ items }) => {
        console.log("##### RETRY EVENT - retrying items: ", items);
    });

	const onRetryAll = useCallback(() => {
		retry()
	}, [retry])

	const onRetryItem = useCallback((e) => {
		const itemId = e.target.dataset["id"];
		retry(itemId)
	}, [retry])



    if (progressData && progressData.completed) {
        const upload = uploads[progressData.id] ||
            { name: progressData.url || progressData.file.name, progress: [0] };

        if (!~upload.progress.indexOf(progressData.completed)) {
            upload.progress.push(progressData.completed);

            setUploads({
                ...uploads,
                [progressData.id]: upload,
            });
        }
    }



	const entries = Object.entries(uploads)

	return (
		<>
		<div>
			{entries.map(([id, { progress, name }]) => {
				const lastProgress = progress[progress.length - 1];

				if(lastProgress < 100) {

					return (<div key={id} className="bg-gray-100 p-3 mb-2 rounded shadow border">
						<p className="mb-3">{name}</p>
						<Line strokeWidth={1}
								strokeColor={lastProgress === 100 ? "#00a626" : "#2db7f5"}
								percent={lastProgress} />

					</div>)

				}
			})}
		</div>
		</>
	)
}



const ClickableDropZone = forwardRef((props, ref) => {
	const { onClick, ...buttonProps } = props;

	const onZoneClick = useCallback(
		e => {
			if(onClick) {
				onClick(e);
			}
		},
		[onClick]
	);

	return (

		<>
		<UploadProgress />
		<UploadDropZone
			{...buttonProps}
			ref={ref}
			onDragOverClassName="active"
			extraProps={{ onClick: onZoneClick }}
			className="border bg-gray-100 p-3"
		>Drag & Drop Files (or click here to select a file from your computer/device)</UploadDropZone>
		</>
	)
})

const DropZoneButton = asUploadButton(ClickableDropZone);

const DisplayUploads = (props) => {


	return (
		<ul>
			{!!props.files && props?.files?.map(file => 
				<li key={file.id} className="flex flex-row bg-gray-100 p-3 mb-2 rounded shadow border">
					<GrAttachment className="align-middle mt-1 mr-2" />
					<div className="grow">
						<a href="/uploads/{file.content}" target="_blank" className="text-blue-500 hover:underline">{file.originalFilename}</a>
					</div>
					<button type="button" className="btn btn-danger" onClick={e => props.doDeleteFile(file)}>
						<MdOutlineDeleteForever className="text-xl"/>
					</button>
				</li>
			)}
		</ul>
	);
}

const FileUpload = forwardRef(function({id, type, name, rules, className, value, defaultValue, register, placeholder, options, onChange, onBlur, isMulti, actionId, RPCId, formName}, ref) {

	const { control, setValue } = useFormContext();
	const { field, fieldState, formState } = useController({name, control})
	const [ selectedItem, setSelectedItem] = useState('')
	const fileState = useRef([]);
	const [filesCSV, setFilesCSV] = useState([])
	const fileIds = useRef([])
	const { dataset } = useContext(RPCDataSetContext);
	const  fpref  = useRef()

	const listeners = useMemo(() => ({
		[UPLOADER_EVENTS.ITEM_FINISH]: (item) => {

			fileState.current = [...fileState.current, (item.uploadResponse.data)]
			setValue(name, fileState.current.map(x => x.id).join(','))

		}
	}), []);


	const {data: getFileUploads, status: GetFileStatus} = useGetFileUploads(RPCId)
	const deleteFileUploads = useDeleteFileUploads(RPCId)


	const doDeleteFile = (file) => {

		let payload = {
			id: file.id,
			content: file.content,
			rpcId: file.rpcId
		};

		deleteFileUploads.mutate(payload,
		{
			//a mutation is about to happen
			onMutate: (variables) => {},
			//mutation was successful
			onSuccess: (data, variables, context) => {


				let allUploads = fileState.current.filter(x => x.id != variables.id);


				fileState.current = allUploads
				setValue(name, allUploads.map(x => x.id).join(','))
			},
			//any sort of error happened
			onError: (error, variables, context) => console.log("Error"),
			//runs regardless of error or success
			onSettled: (data, error, variables, context) => {

			}
		});


	}

	useEffect(() => {
		if(typeof(getFileUploads) != 'undefined')
		{
			let allUploads = getFileUploads.filter(x => !fileIds.current.includes(x));
			fileState.current = [...allUploads]
			setValue(name, allUploads.map(x => x.id).join(','))
		}
		
	}, [getFileUploads])

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={fileState.current.map(x => x.id).join(',')}
			rules={rules}
			render={({ field }) => (
		<>
		
		<DisplayUploads files={fileState.current} doDeleteFile={e => doDeleteFile(e)}/>

		<input type="hidden" defaultValue={field.value} name={field.name} onChange={(e) => field.onChange(e)} onBlur={(e) => field.onBlur(e)} id={id} ref={ref}/>

		<Uploady destination={
			{ 
				url: 'https://localhost:7080/api/file',
				sendWithFormData: true,
				filesParamName: 'Submission',
				inputFieldName: name,
				params: {
					'FormName': formName,
					'RPCId': RPCId,
					'RPCActionId': actionId,
					'RequirementName': name,
				},
			 }}
			  sendWithFormData="true"
			  withCredentials="true"
			  enhancer={retryEnhancer}
			  listeners={listeners}
		>
			
			<DropZoneButton />
		</Uploady>

        </>	
        )} />
	)
})




export default FileUpload;