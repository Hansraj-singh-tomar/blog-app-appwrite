// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'

const navigation = [
    {
        name: "Home",
        slug: "/",
        active: "true",
    },
    {
        name: "Login/Sign up",
        slug: "/login",
        active: "false",
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: "false",
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: "true",
    },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const Header = () => {
    const dispatch = useDispatch();

    function logoutHandler() {
        authService.logout().then(() => dispatch(logout));
    }

    return (
        <div className="min-h-full">
            {/* header section */}
            <div className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex-shrink-0 flex">
                        <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                        <p className='bg-gray-900 ml-4 text-white rounded-md px-3 py-2 text-sm font-medium'>Blog App</p>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navigation?.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.slug}
                                    className={classNames(
                                        item.current
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'rounded-md px-3 py-2 text-sm font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button onClick={logoutHandler} className='text-white'>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

