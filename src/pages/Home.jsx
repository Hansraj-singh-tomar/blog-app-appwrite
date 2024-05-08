// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'
// import homeImg from "../../public/homeImg.png"

const Home = () => {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData !== null) {
            service.getPosts().then((posts) => {
                if (posts) {
                    // console.log(posts); // {total: 1, documents: Array(1)}
                    setPosts(posts?.documents)
                }
            })
        }
    }, [])

    if (userData === null) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='relative'>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {
                        posts.map((post) => {
                            return <PostCard key={post.$id} {...post} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
