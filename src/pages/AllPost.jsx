// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { ShimmerSimpleGallery } from "react-shimmer-effects";

const AllPost = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const userData = useSelector((state) => state.auth.userData);

    async function fetchPosts() {
        try {
            if (userData !== null) {
                service.getPosts().then((posts) => {
                    if (posts) {
                        setPosts(posts.documents)
                    }
                })
            }
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    if (error) return <h1>{error}</h1>

    if (posts.length === 0) {
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
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllPost



