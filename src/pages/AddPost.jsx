/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Select from '../components/Select'
import RTE from '../components/RTE'

import service from "../appwrite/config"

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddPost = ({ post }) => {
    // eslint-disable-next-line no-unused-vars
    const [formData, setFormData] = useState({
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "",
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
            content: String(contentRef.current.getContent()),
            status: statusRef.current.value,
            image: imageRef.current.files[0]
        };


        if (post) {
            try {
                setLoading(true);
                const file = data.image ? await service.uploadFile(data.image) : null;

                if (file) {
                    service.deleteFile(post.featuredImage);
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const file = await service.uploadFile(data?.image);
                console.log("image file", file);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;

                    const dbPost = await service.createPost({ ...data, userId: userData.$id })

                    if (dbPost) {
                        setLoading(false)
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }
    }

    if (error) return <h1>{error}</h1>

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
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                // src={appwriteService.getFilePreview(post.featuredImage)}
                                src='https://chaicode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1713504546029%2F2555ea35-7da5-4e44-8138-06c2b53340e9.webp&w=1920&q=75'
                                alt={post.title}
                                className="rounded-lg w-72 h-48"
                            />
                        </div>
                    )}
                    <Select
                        defaultValue={formData.status}
                        options={["active", "inactive"]}
                        ref={statusRef}
                        label="Status :"
                    />

                    {
                        post
                            ?
                            <Button type={'submit'} bgColor={post && "bg-green-500"}>
                                {loading ? "loading" : "Update"}
                            </Button>
                            :
                            <Button type={'submit'}>
                                {loading ? "loading" : "Submit"}
                            </Button>
                    }
                </div>
            </form>
        </div>
    )
}

export default AddPost


