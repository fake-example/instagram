import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from './../../context/firebase';
import "./style.css";
import { HOME, LOGIN, SIGN_UP, FORGOTPASSWORD } from './../../constants/routes';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const isInvalid = password === '' || email === '';

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate(HOME);

        } catch (error) {
            setEmail('');
            setPassword('');
            setError(error.message);
        }
    }


    return (
        <div className="bg-white h-screen w-screen flex flex-wrap items-center justify-center p-3">

            <Helmet>
                <title>Login</title>
            </Helmet>

            <div className="w-[350px] grid gap-y-3">
            <div className="bg-white border px-[40px] pt-10 pb-6">

                <div className="flex justify-center mb-8">
				    <img className="h-[51px]" src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" alt=""/>
				</div>
             
              <div className="flex items-center my-3 w-full">
              </div>
                    { error && <p className="mb-4 text-xs text-red-500">{error}</p> }
                    <form onSubmit={handleSubmit} className="" method="post">
                        <div>
                            <span className='text-gray-500 text-sm'>Email</span>
                            <input
                                type="text"
                                aria-label="Enter your email address"
                                placeholder="Enter Your Email"
                                className="text-xs p-3 mb-3 border-[1px] border-gray-300 rounded bg-white w-full outline-gray-300"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <span className='text-gray-500 text-sm'>Password</span>
                            <input
                                type="password"
                                aria-label="Enter your password"
                                placeholder="Password"
                                className="text-xs p-3 mb-3 border-[1px] border-gray-300 rounded bg-white w-full outline-gray-300"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={
                                    `bg-blue-500 text-sm mt-3 cursor-pointer text-white rounded-md w-full h-8 font-medium ${isInvalid && "opacity-50"}`
                                }
                            >
                                Log In
                            </button>

                            <div class="flex items-center my-2.5 mb-3.5"><div class="h-px bg-gray-300 flex-1"></div><span class="px-4 text-[13px] text-gray-500 font-semibold">OR</span><div class="h-px bg-gray-300 flex-1"></div></div>
                        </div>

                        <div className='text-center mt-3'>
                            <Link to={FORGOTPASSWORD} className="text-xs flex items-center justify-center text-link block">
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>
                    <div className="bg-white border p-4 text-sm text-center mt-3">
					    Don't have an account? <Link to={SIGN_UP} className="font-semibold text-brand text-blue-500">Sign up</Link>
				    </div>
            </div>
        </div>
    );
};

export default Login;
