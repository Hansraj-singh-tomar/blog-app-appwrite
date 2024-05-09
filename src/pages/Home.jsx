// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react'
// import service from '../appwrite/config'
// import PostCard from '../components/PostCard'
// import { useSelector } from 'react-redux'
// // import { ShimmerSimpleGallery } from "react-shimmer-effects";

// const Home = () => {
//     const [posts, setPosts] = useState([])
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const userData = useSelector((state) => state.auth.userData);

//     async function fetchPostData() {
//         setLoading(true);
//         try {
//             service.getPosts().then((posts) => {
//                 if (posts) {
//                     // console.log(posts); // {total: 1, documents: Array(1)}
//                     setPosts(posts?.documents)
//                 }
//             })
//         } catch (error) {
//             setError(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchPostData();
//     }, [])

//     if (userData === null) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <div className="flex flex-wrap">
//                     <div className="p-2 w-full">
//                         <h1 className="text-2xl font-bold hover:text-gray-500">
//                             Login to read posts
//                         </h1>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     if (loading) return <h1 className='text-center'>Loading...</h1>

//     if (error) return <h1>{error}</h1>

//     return (
//         <div className=''>
//             <div className='bg-white h-10 flex items-center justify-center'>
//                 <h1 className='font-bold text-lg text-indigo-500'>Welcome to Blog App</h1>
//             </div>
//             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
//                 <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//                     {
//                         posts.map((post) => {
//                             return <PostCard key={post.$id} {...post} />
//                         })
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Home



// eslint-disable-next-line no-unused-vars
import React from 'react'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import heroImg from "../../public/undraw_Blog.png"
import signInImg from "../../public/signInImg.png"

const Home = () => {

    const userData = useSelector((state) => state.auth.userData)

    if (userData === null) {
        return (
            <div className="w-full h-screen py-8 bg-white">
                <div className="p-2 text-center">
                    <img src={signInImg} alt="img" className='w-56 h-60 mx-auto' />
                    <Link to={'/login'}>
                        <h1 className="text-2xl font-medium hover:text-indigo-500 cursor-pointer hover:underline">
                            Login to read posts
                        </h1>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-white h-screen'>
            <div className='md:flex items-center md:items-center lg:items-start justify-center mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
                {/* Right part */}
                <div className='flex-1'>
                    <div className='mt-24 ml-6 space-y-8'>
                        <h1 className='text-4xl font-bold'>Welcome to Blog App . . .</h1>
                        <p className='font-thin text-lg'>At Blog App, we believe in the power of words. Our platform is designed to connect readers with captivating content, curated by passionate writers from around the world. Whether you're seeking inspiration, information, or entertainment, our blog app has something for everyone.</p>
                        <div className='w-full md:w-[50%]'>
                            <Link to={'/all-posts'}>
                                <Button>Let's jump to stock</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* left part */}
                <div className='flex-1'>
                    <img src={heroImg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home

// why i am worried about her, she can do anything,
// Do i need to change this place, bcz things are not going to
// I have to complete the Machine coding round
// then React and js revision/questions
// then some basic DSA Questions
// then do some maditaion to overcome from this situation