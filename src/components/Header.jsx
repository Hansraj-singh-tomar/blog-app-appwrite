// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
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

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function logoutHandler() {
        authService.logout().then(() => dispatch(logout()));
        toast("user logout")
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state
    };

    return (
        <div className="min-h-full ">
            {/* header section */}
            <div className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-24 items-center justify-between">
                    <div className="flex-shrink-0 flex">
                        <p className='bg-indigo-600 ml-4 text-white rounded-md px-3 py-2 text-lg text-center font-medium'>
                            Blog App <br />
                            <span className='text-sm font-thin'>Frontend Mentor</span>
                        </p>
                    </div>

                    {/* This is an hamberger */}
                    <div onClick={toggleMobileMenu} className='md:hidden absolute right-10 text-white hover:text-gray-300 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </div>

                    {/* Mobile Menu */}
                    <div className='md:hidden'>
                        {isMobileMenuOpen && (
                            <div className="absolute top-20 right-0 h-screen space-y-6 px-6 pt-7 bg-gray-800 opacity-55 flex flex-col justify-start z-10">
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
                        )}
                    </div>

                    {/* Desktop Menu */}
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

