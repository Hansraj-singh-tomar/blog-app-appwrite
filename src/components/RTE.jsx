// eslint-disable-next-line no-unused-vars
import React, { useId } from 'react'
import { Editor } from '@tinymce/tinymce-react';


// eslint-disable-next-line react/prop-types
const RTE = ({ label, onInit, log }) => {
    const id = useId()
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <Editor
                    apiKey='vsmeprt5a8q0cxhafjaak6yt0bygjfy6o1cr7gwiqay3vgvx'
                    // onInit={(_evt, editor) => editorRef.current = editor}
                    onInit={(_evt, editor) => onInit(editor)}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                <button className='border-2 border-black px-2 mt-2' onClick={log}>Log editor content</button>
            </div>
        </div>
    )
}

export default RTE;