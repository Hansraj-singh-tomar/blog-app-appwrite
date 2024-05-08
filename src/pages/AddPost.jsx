// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Select from '../components/Select'
import RTE from '../components/RTE'
import appwriteService from "../appwrite/config"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddPost = ({ post }) => {
    const [formData, setFormData] = useState({
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "",
        image: null,
    });

    const titleRef = useRef();
    const slugRef = useRef();
    const contentRef = useRef();
    const statusRef = useRef();
    const imageRef = useRef();


    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();


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

    useEffect(() => {
        const titleValue = titleRef.current.value;
        const slugValue = slugTransform(titleValue);
        slugRef.current.value = slugValue;
    }, [slugTransform])

    const onInit = (editor) => {
        return contentRef.current = editor
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            title: titleRef.current.value,
            slug: slugRef.current.value,
            content: contentRef.current.getContent(),
            status: statusRef.current.value,
            image: imageRef.current.files[0]
        };


        if (post) {
            const file = data.image ? await appwriteService.uploadFile(data.image) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            console.log(data.image);
            const file = await appwriteService.uploadFile(data.image);
            console.log(file); // false
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;

                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }


    return (
        <div className='mx-auto max-w-6xl mt-8 p-4'>
            <form onSubmit={handleSubmit} className='flex'>
                {/* left side part */}
                <div className='space-y-6 flex-1 pr-4'>
                    <Input
                        label="Title :"
                        type='text'
                        ref={titleRef}
                        defaultValue={formData.title}
                    />
                    <Input
                        label="Slug :"
                        type='text'
                        ref={slugRef}
                        defaultValue={formData.slug}
                        onInput={() => {
                            const titleValue = titleRef.current.value;
                            const slugValue = slugTransform(titleValue);
                            slugRef.current.value = slugValue;
                        }}
                    />
                    <RTE label="Content :" onInit={onInit} defaultValue={formData.content} />
                </div>

                {/* right side part */}
                <div className='flex-2 pl-4 space-y-8'>
                    <Input
                        label="Feature Image :"
                        type='file'
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        ref={imageRef}
                    />
                    <Select
                        defaultValue={formData.status}
                        options={["active", "inactive"]}
                        ref={statusRef}
                        label="Status :"
                    />
                    <Button type={'submit'}>Update</Button>
                </div>
            </form>
        </div>
    )
}

export default AddPost

