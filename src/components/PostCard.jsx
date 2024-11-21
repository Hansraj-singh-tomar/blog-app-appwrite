// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import service from '../appwrite/config';
import { Link } from 'react-router-dom';
import Button from './Button';



// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const PostCard = ({ $id, title, featuredImage }) => {

    return (
        <>
            <Link to={`/post/${$id}`}>
                <div className="group relative bg-white p-4 rounded-lg">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                        <img
                            src={`${service.getFilePreview(featuredImage).href}&width=300&height=200&quality=80`}
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

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(PostCard)

