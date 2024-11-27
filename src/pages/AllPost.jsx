// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { ShimmerSimpleGallery } from "react-shimmer-effects";

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/postSlice';


const AllPost = () => {
    const dispatch = useDispatch();

    const { posts, error } = useSelector((state) => state.postsData)
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData !== null) {
            dispatch(fetchPosts())
        }
    }, [dispatch])


    if (error) {
        return (
            <div className='h-screen mt-32'>
                <h1 className='text-center text-2xl text-red-600 font-bold'>{error}</h1>
            </div>
        )
    }


    if (posts?.length === 0) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <ShimmerSimpleGallery card imageHeight={300} caption />
            </div>
        )
    }

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {posts?.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllPost



