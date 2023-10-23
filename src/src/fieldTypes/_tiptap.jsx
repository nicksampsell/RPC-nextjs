import cn from 'classnames'
import { useFormContext, useController} from 'react-hook-form'
import { forwardRef, useState, useRef, useMemo, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import debounce from 'lodash.debounce'


import { FaBold, FaItalic, FaStrikethrough, FaUnderline, FaParagraph, FaList, FaListOl, FaQuoteLeft, FaRemoveFormat, FaUndo, FaRedo, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify  } from "react-icons/fa";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const toolbarClass = 'shadow font-semibold border py-0.5 px-1.5 bg-gray-200 border-gray-300 rounded hover:bg-gray-300 hover:border-gray-400 active:shadow-inner'

  return (
    <div className="flex flex-row space-x-1 p-2 bg-gray-50 border border-gray-200 rounded mb-1">
      <button type="button" 
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={cn(toolbarClass, editor.isActive('bold') ? 'active' : '')}
      >
        <FaBold />

      </button>
      <button type="button" 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={cn(toolbarClass, editor.isActive('italic') ? 'is-active' : '')}
      >
        	<FaItalic />

      </button>

	  <button type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(toolbarClass, editor.isActive('underline') ? 'is-active' : '')}
      >
        <FaUnderline />
      </button>


      <button type="button" 
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={cn(toolbarClass, editor.isActive('strike') ? 'is-active' : '')}
      >
	<FaStrikethrough />

      </button>


      <button type="button" 
      onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
	  className={cn(toolbarClass, editor.isActive('strike') ? 'is-active' : '')}
      >
        <FaRemoveFormat />
      </button>

      <button type="button" 
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(toolbarClass, editor.isActive('paragraph') ? 'is-active' : '')}
      >
        <FaParagraph />
      </button>

      <button type="button" 
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={cn(toolbarClass, editor.isActive({ textAlign: 'left' }) ? 'is-active' : '')}
      ><FaAlignLeft />
      </button>

      <button type="button" 
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={cn(toolbarClass, editor.isActive({textAlign: 'center'}) ? 'is-active' : '')}
      ><FaAlignCenter />
      </button>

      <button type="button" 
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={cn(toolbarClass, editor.isActive({textAlign: 'right'}) ? 'is-active' : '')}
      ><FaAlignRight />
      </button>

      <button type="button" 
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={cn(toolbarClass, editor.isActive({textAlign: 'justify'}) ? 'is-active' : '')}
      ><FaAlignJustify />
      </button>


      <button type="button" 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(toolbarClass, editor.isActive('heading', { level: 1 }) ? 'is-active' : '')}
      >
        h1
      </button>
      <button type="button" 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(toolbarClass, editor.isActive('heading', { level: 2 }) ? 'is-active' : '')}
      >
        h2
      </button>
      <button type="button" 
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(toolbarClass, editor.isActive('heading', { level: 3 }) ? 'is-active' : '')}
      >
        h3
      </button>

      <button type="button" 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(toolbarClass, editor.isActive('bulletList') ? 'is-active' : '')}
      >
        <FaList />
      </button>
      <button type="button" 
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(toolbarClass, editor.isActive('orderedList') ? 'is-active' : '')}
      >
        <FaListOl />
      </button>

      <button type="button" 
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(toolbarClass, editor.isActive('blockquote') ? 'is-active' : '')}
      >
        <FaQuoteLeft />
      </button>

      <button type="button" 
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className={cn(toolbarClass, editor.isActive('strike') ? 'is-active' : '')}
      >
        <FaUndo />
      </button>
      <button type="button" 
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className={cn(toolbarClass, editor.isActive('strike') ? 'is-active' : '')}
      >
        <FaRedo />
      </button>

    </div>
  )
}


const TipTap = forwardRef(function({id, type, name, className, value, register, placeholder, options, onChange, onBlur, isMulti, rules}, ref) {

	const { control, setValue } = useFormContext();
	const { field, fieldState, formState } = useController({name, control})

  const [editorContentState, setEditorContentState] = useState();

	const editor = useEditor({
		extensions: [
		      Color.configure({ types: [TextStyle.name, ListItem.name] }),
		      TextStyle.configure({ types: [ListItem.name] }),
          TextAlign.configure({
            types: ['paragraph','heading']
          }),
		      StarterKit.configure({
		        bulletList: {
		          keepMarks: true,
		          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		        },
		        orderedList: {
		          keepMarks: true,
		          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		        },
		      }),
		      Underline,
		    ],
    editorProps: {
      attributes: {
        class: 'w-full p-3 prose max-w-none prose-strong:font-bold',
      },
    },
		content: field.value,
    onUpdate: ({ editor }) => {
        debouncedValueSync(editor.getHTML())
    }
	})


const debouncedValueSync = useRef(
  debounce(async (value) => {
    setValue(name, value)
  }, 300)
).current;


	return (
		<div>
		<MenuBar editor={editor} />
		<EditorContent
			editor={editor}
			id={id}
			name={field.name}
			className={cn("flex font-medium rounded-md w-full border border-slate-300 placeholder:opactity-60 min-h-[200px] focus:outline-0", className)}
			placeholder={placeholder}
			value={field.value}
			onChange={e => editor.getHTML()}
			onBlur={field.onBlur}
			ref={field.ref}
			options={options}
			rules={rules}
		/>
		</div>
	)
})

export default TipTap;

