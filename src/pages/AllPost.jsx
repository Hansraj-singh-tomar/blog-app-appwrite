// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'


const products = [
    {
        id: 1,
        title: 'Use Github branch as dependency in package.json',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",

    },
    {
        id: 1,
        title: 'Use Github branch as dependency in package.json',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",

    },
    {
        id: 1,
        title: 'Use Github branch as dependency in package.json',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",

    },
]

const AllPost = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products?.map((product) => (
                        <Link key={product?.id} to="/post">
                            <PostCard product={product} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllPost