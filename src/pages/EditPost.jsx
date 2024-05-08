// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
import AddPost from './AddPost';

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div>
            <AddPost post={post} />
        </div>
    ) : null;
}

export default EditPost