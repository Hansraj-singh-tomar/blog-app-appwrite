// eslint-disable-next-line no-unused-vars
import React, { useCallback, useRef, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Select from '../components/Select'
import RTE from '../components/RTE'
import appwriteService from "../appwrite/config"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddPost = ({ post }) => {

    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    const [val, setVal] = useState();

    const title = useRef(null);
    const slug = useRef(null);
    const editorRef = useRef(null);
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }

        return "";
    }, []);



    const handleInput = () => {
        setVal(title.current.value);
    }

    const onInit = (editor) => {
        return editorRef.current = editor
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log({ title: title.current.value, slug: slugTransform(title.current.value), content: editorRef.current.getContent(), selectedVal: dropdownRef.current.value, img: fileInputRef.current.files[0] });
        let data = { title: title.current.value, slug: slugTransform(title.current.value), content: editorRef.current.getContent(), selectedVal: dropdownRef.current.value, img: fileInputRef.current.files[0] };
        if (post) {
            console.log("when we have post then we use it like that");
        } else {
            const file = await appwriteService.uploadFile(data.img);

            if (file) {
                const fileId = file.$id;
                data.featureImage = fileId;

                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id })

                if (dbPost) {
                    console.log(dbPost);
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    // to get content of editor 
    // const log = () => {
    //     if (editorRef.current) {
    //         setContent(editorRef.current.getContent());
    //         console.log(editorRef.current.getContent());
    //     } else {
    //         console.log("nothing to show from the editor");
    //     }
    // }

    return (
        <div className='mx-auto max-w-6xl mt-8 p-4'>
            <form onSubmit={handleSubmit} className='flex'>
                {/* left side part */}
                <div className='space-y-6 flex-1 pr-4'>
                    <Input label="Title" type='text' className='' ref={title} handleInput={handleInput} />
                    <Input label="Slug" type='text' className='' ref={slug} value={slugTransform(val)} />
                    {/* <RTE label="content" ref={editorRef} onInit={onInit} log={log} /> */}
                    <RTE label="content" ref={editorRef} onInit={onInit} />
                </div>

                {/* right side part */}
                <div className='flex-2 pl-4 space-y-8'>
                    <Input label="Feature Image :" type='file' className='' ref={fileInputRef} />

                    <Select options={["active", "inactive"]} ref={dropdownRef} />

                    <Button>
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddPost

