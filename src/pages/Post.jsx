// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config';
import parse from "html-react-parser"
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import "./post.css";

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

    console.log(post?.content);


    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className='mx-auto max-w-6xl mt-2 p-4'>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                <img
                    className='rounded-xl w-full h:[250px] md:h-[450px]'
                    alt={post.title}
                    src={`${service.getFilePreview(post.featuredImage).href}&quality=75`}
                />
                {
                    isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor='bg-green-500'>
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

            <div className='flex justify-start'>
                <div className='w-full md:max-w-5xl'>
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                    <div className='prose'>
                        {parse(post.content)}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default Post

