// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config';
import parse from "html-react-parser"
import { useSelector } from 'react-redux';
import Button from '../components/Button';

const Post = () => {
    const [post, setPost] = useState();
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/")
                }
            })
        } else {
            navigate("/")
        }
    }, [navigate, slug]);


    const deletePost = () => {
        console.log("function called");
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className='mx-auto max-w-5xl mt-2 p-4'>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                <img
                    className='rounded-xl w-full h-[450px]'
                    src="https://chaicode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1713504546029%2F2555ea35-7da5-4e44-8138-06c2b53340e9.webp&w=1920&q=75"
                    alt={post.title}
                // src={service.getFilePreview(post.featuredImage).href}
                />
                {
                    isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className={"bg-gray-800"}>
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )
                }
            </div>
            <div>
                <h1 className='text-2xl font-bold'>{post.title}</h1>
                <div className='py-6'>
                    {parse(post.content)}
                </div>
            </div>
        </div>
    ) : null;
}

export default Post

