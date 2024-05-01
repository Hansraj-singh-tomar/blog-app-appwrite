// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import authService from '../appwrite/auth';



const Login = () => {

    const [isLoginForm, setIsLoginForm] = useState(false);
    const [error, setError] = useState('');

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (isLoginForm) {
            try {
                const session = await authService.login({ email, password });
                console.log(session);
                if (session) {
                    console.log("login successfull");
                }
            } catch (error) {
                setError(error);
            }
        } else {
            try {
                const userData = await authService.createAccount({ name, email, password })
                console.log(userData);
            } catch (error) {
                setError(error);
            }
        }
    }

    return (
        <>
            <div>
                {/* login and sign up section */}
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
                        {/* Your content */}

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
                                            <Input ref={nameRef} label="Fill Name" type="text" className="" />
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

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    <p onClick={() => setIsLoginForm(!isLoginForm)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                        {isLoginForm ? "Not a member? Sign Up Now" : "Already registered? Sign In Now."}
                                    </p>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Login

