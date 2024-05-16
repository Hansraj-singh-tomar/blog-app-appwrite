// eslint-disable-next-line no-unused-vars
import React, { useId } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import conf from '../conf/conf';


// eslint-disable-next-line react/prop-types
const RTE = ({ label, onInit, defaultValue }) => {
    const id = useId()
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <Editor
                    apiKey={conf.tinyMceApiKey}
                    // onInit={(_evt, editor) => editorRef.current = editor}
                    onInit={(_evt, editor) => onInit(editor)}
                    initialValue={defaultValue}
                    init={{
                        height: 500,
                        menubar: true,
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
            </div>
        </div>
    )
}

export default RTE;