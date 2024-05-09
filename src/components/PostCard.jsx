// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import service from '../appwrite/config';
import { Link } from 'react-router-dom';
import Button from './Button';

// eslint-disable-next-line react/prop-types
const PostCard = ({ $id, title, featuredImage }) => {
    useEffect(() => {
        const img = service.getFilePreview(featuredImage);
        console.log(img);
    }, [])

    return (
        <>
            <Link to={`/post/${$id}`}>
                <div className="group relative bg-white p-4 rounded-lg">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                        <img
                            src="https://chaicode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1713504546029%2F2555ea35-7da5-4e44-8138-06c2b53340e9.webp&w=1920&q=75"
                            alt={title}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                    </div>
                    <div className="mt-2">
                        <h3 className="text-lg font-semibold">
                            {title}
                        </h3>
                        <Button className='mt-2'>Read More</Button>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default React.memo(PostCard)

