// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoginForm, setIsLoginForm] = useState(false);
    const [error, setError] = useState('');

    let nameRef = useRef(null);
    let emailRef = useRef(null);
    let passwordRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (isLoginForm) {
            try {
                const session = await authService.login({ email: emailRef.current.value, password: passwordRef.current.value });
                // console.log("from login/sign up page", session);
                if (session) {
                    navigate("/");
                    const userData = await authService.getCurrentUser()
                    if (userData) dispatch(authLogin(userData));
                }
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                const userData = await authService.createAccount({ name: nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value })
                console.log(userData);
                if (userData) {
                    const userData = await authService.getCurrentUser();
                    if (userData) {
                        dispatch(authLogin(userData))
                    }
                }
            } catch (error) {
                setError(error.message);
            }
        }

    }

    if (error) return <h1 className='text-center'>{error}</h1>

    return (
        <>
            <div>
                {/* login and sign up section */}
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">

                        {/* login and sign part is here We have to add with header  */}
                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 ">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    {isLoginForm ? "Sign in" : "Sign up"} to your account
                                </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" onSubmit={handleLogin}>
                                    {
                                        !isLoginForm && (
                                            <Input ref={nameRef} label="Full Name" type="text" className="" />
                                        )
                                    }

                                    <Input ref={emailRef} label="Email" type="email" className="" autoComplete="email" />

                                    <Input ref={passwordRef} label="Password" type="password" className="" autoComplete="current-password" />

                                    <div>
                                        <Button>
                                            {isLoginForm ? "Sign in" : "Sign up"}
                                        </Button>
                                    </div>
                                </form>

                                <div className="mt-10 text-center text-sm text-gray-500">
                                    <p onClick={() => setIsLoginForm(!isLoginForm)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                        {isLoginForm ? "Not a member? Sign Up Now" : "Already registered? Sign In Now."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login

// toast.success('🦄 login successful!', {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
// });

