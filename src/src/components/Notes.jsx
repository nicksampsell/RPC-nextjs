import React, { useState, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom';
import { GrMail } from 'react-icons/gr'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import cn from 'classnames'
import InputField from '../fieldTypes/inputField'
import { useFormContext, Controller } from 'react-hook-form'
import { RPCDataSetContext } from '../RPCDataSetContext'
import { useDeleteRPCNoteMutation, useCreateRPCNoteMutation, useGetRPCNotes } from '../queries/autofill.hooks'
import { useQueryClient } from 'react-query';
import {MdOutlineDeleteForever,MdOutlineLock} from 'react-icons/md';


export const Notes = (props) => {

	const { data: allNotes, status: notesStatus } = useGetRPCNotes(props.RPCId);
	const createRPCNote = useCreateRPCNoteMutation();
	const deleteRPCNote = useDeleteRPCNoteMutation();

	const [notePrivate, setNotePrivate] = useState(false);
	const [noteContent, setNoteContent] = useState('');
	const [errors, setErrors] = useState([]);
	const queryClient = useQueryClient()
	const notesRef = useRef(null)


	useEffect(() => {
		if(typeof(allNotes) != 'undefined')
		{

			notesRef.current.lastElementChild?.lastElementChild?.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'end'
			})
		}
	}, [allNotes])

	const addNote = () => {

		setErrors([]);
		if(noteContent != '')
		{
			let payloadPackage = {
				rpcId: props.RPCId,
				payload: {
					RPCId: props.RPCId,
					MessageType: 1,
					Content: noteContent,
					isPrivate: notePrivate
				}
			}

			createRPCNote.mutate(payloadPackage,
			{
				//a mutation is about to happen
				onMutate: (variables) => {},
				//mutation was successful
				onSuccess: (data, variables, context) => {
					flushSync(() => {
						queryClient.invalidateQueries('getRPCNotes')
					})
					console.log("Successfully posted: " + data)

					console.log(notesRef.current.lastElementChild)

				},
				//any sort of error happened
				onError: (error, variables, context) => console.log("Error"),
				//runs regardless of error or success
				onSettled: (data, error, variables, context) => {

				}
			});

			setNoteContent('');
			setNotePrivate(false);
		}
		else
		{
			setErrors([...errors, {
				field: 'noteContent',
				message: 'Invalid message.'
			}])

			console.log('error, field blank')
		}
	}

	const doDeleteNote = (id, userId) => {
		setErrors([]);

		let payloadPackage = {
			rpcId: props.RPCId,
			payload: {
				Id: id,
				RPCId: props.RPCId,
				OriginalUserId: userId
			}
		}

		deleteRPCNote.mutate(payloadPackage,
		{
			//a mutation is about to happen
			onMutate: (variables) => {},
			//mutation was successful
			onSuccess: (data, variables, context) => {
				flushSync(() => {
					queryClient.invalidateQueries('getRPCNotes')
				})

				console.log("Successfully deleted: " + id)

			},
			//any sort of error happened
			onError: (error, variables, context) => console.log("Error"),
			//runs regardless of error or success
			onSettled: (data, error, variables, context) => {

			}
		});

	}
	

	return (
		<div className={cn("bg-white p-5 w-[400px]", props.className)}>
			<h2 className="bg-blue-300 -m-5 p-3 mb-5 text-lg">Notes & Events</h2>
			<div className="border w-full overflow-y-auto max-h-screen" id="allNotes">
				<ul className="divide-y" ref={notesRef}>
					<NoteItem events={allNotes} doDeleteNote={(RPCId, userId) => doDeleteNote(RPCId, userId)} />
				</ul>
			</div>
			<div className="flex flex-col mt-3 p-2">
			<h2 className="text-2xl mb-3">Add a Note</h2>
			<label htmlFor="noteContent">Note</label>
			<textarea
			id="noteContent"
			value={noteContent}
			onChange={e => {
				setNoteContent(e.target.value)
				console.log(e.target.value)
			}}
			rows="5"
			className="border rounded mb-3"></textarea>

				<div className="flex flex-row justify-between items-center">
					<div>
						<input 
						type="checkbox" 
						name="notePrivate" 
						id="notePrivate"
						checked={notePrivate}
						value="1"
						onChange={e => {
							setNotePrivate(!notePrivate)
							console.log(!notePrivate)
						}}
						className="mr-2"

						
						/>
						<label htmlFor="mark_private">Mark as private</label>
					</div>
					<div className="text-right">
						<button 
						type="button" 
						onClick={e => addNote()}
						className="border p-3 rounded bg-blue-200 shadow border-blue-300">
							Add Note
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const note_textbox_validation = {
  name: 'tracker_notes',
  label: 'Add Note',
  type: 'textarea',
  id: 'tracker_notes',
  placeholder: 'Add Note',
  multiline: true,
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 5,
      message: 'needs at least 5 characters',
    },
  },
}

const NoteItem = (props) => {
	return (
		props.events && 
			props.events.map((evt) => (
				<li key={evt.id} className="flex flex-col justify-between p-3 even:bg-gray-100 odd:bg-white group/note" >
					<main className="p-2">
					<header className="mb-2 flex flex-row justify-between align-items-center text-gray-500">
						<div>
							<div className="flex flex-inline">
							{!!evt.isPrivate && (<MdOutlineLock className="text-xl mr-1 mt-1 -ml-1" />)}
							<h3 className="text-lg font-semibold" >{(evt.type == '0') ? 'Action' : (evt.type == 3) ? 'System Message' : 'Note/Memo' }</h3>
						</div>
						<p className="text-gray-500 italic text-xs">{evt.fullName}</p>
						</div>
						{evt.canDelete && (
							<div className="">
							<button 
								type="button" 
								className="float-right 
									flex flex-row 
									justify-items-between 
									align-items-center 
									p-1 
									border-red-600 
									bg-red-400 
									rounded 
									shadow 
									mb-3
									text-gray-800"
								onClick={e => props.doDeleteNote(evt.id, evt.userId)}>
									<MdOutlineDeleteForever 
										className="text-xl mt-0.5"
									/>
								</button>
							</div>
						)}
					</header>
					<article className="text-slate-900 mt-4 mb-2 py-2 -mx-1 border-0 border-t group-even/note:border-gray-200 group-odd/note:border-slate-100">
						<p>{evt.content}</p>
					</article>
					</main>
					<footer className="text-right">

						
						<p className="text-gray-400 italic text-xs">{new Date(evt.created).toLocaleString('en-us', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
						})}</p>
					</footer>
				</li>
			))
	)
}