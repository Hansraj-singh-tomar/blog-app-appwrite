// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import { toast, ToastContainer } from 'react-toastify'

const navigation = [
    {
        name: "Home",
        slug: "/",
        active: "true",
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: "true",
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

    const userData = useSelector((state) => state.auth.userData);

    function logoutHandler() {
        authService.logout().then(() => dispatch(logout()));
        toast("user logout")
    }

    return (
        <div className="min-h-full ">
            {/* header section */}
            <div className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
                    <div className="flex-shrink-0 flex">
                        <img
                            className="h-12 w-12"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                        <p className='bg-gray-900 ml-4 text-white rounded-md px-3 py-2 text-lg font-medium'>Blog App</p>
                    </div>

                    <div className='md:hidden text-white hover:text-gray-300 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
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
                                        'rounded-md px-3 py-2 text-xl font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {
                                userData == null ?
                                    <Link to={"/login"}>
                                        <button className='rounded-md px-3 py-2 text-xl font-medium hover:bg-gray-700 hover: text-white'>Login/Signup</button>
                                    </Link>
                                    :
                                    <button onClick={logoutHandler} className='rounded-md px-3 py-2 text-xl font-medium hover:bg-gray-700 hover: text-white'>Logout</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Header

