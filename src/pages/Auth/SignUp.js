import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from './../../context/firebase';
import "./style.css";
import { HOME, LOGIN } from './../../constants/routes';
import { doesUsernameExist } from './../../services/firebase';
import { Helmet } from "react-helmet";

const SignUp = () => {
    const { firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ fullName, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const isInvalid = password === '' || email === '';

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const usernameExists = await doesUsernameExist(username);
            if(!usernameExists.length) {
                try {
                    const userResult = await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password);

                    await userResult.user.updateProfile({
                        displayName: username
                    })

                    await firebase.firestore().collection("users").add({
                        userId: userResult.user.uid,
                        username: username.toLowerCase(),
                        fullName,
                        email: email.toLowerCase(),
                        following: [],
                        followers: [],
                        dataCreated: Date.now(),
                        aboutMe: "",
                        avatarSrc: "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png"
                    });

                    navigate(HOME);
                } catch (error) {
                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setError(error.message);
                }
            } else {
                setError("A user with this name has already been created!");
            }
        } catch (error) {
            setEmail('');
            setPassword('');
            setError(error.message);
        }
    }


    return (
        <div className="bg-white h-screen w-screen flex flex-wrap items-center justify-center p-3">

            <Helmet>
				<title>Sign Up</title>
			</Helmet>

            <div className="w-[350px] grid gap-y-3">
                <div className="bg-white border px-[40px] pt-10 pb-6">
                <div className="flex justify-center mb-4">
					<img className="h-[51px]" src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" alt=""/>
				</div>
				<p className="text-[17px] font-semibold text-[#8e8e8e] text-center mb-6">
					Sign up to see photos and videos from your friends.
				</p>
             
              <div className="flex items-center my-3 w-full">
                <div className="border-b-[1px] border-gray-300 h-0 w-full"></div>
              </div>
                    { error && <p className="mb-4 text-xs text-red-500">{error}</p> }
                    <form onSubmit={handleSubmit} className="" method="post">
                        <div>
                        <span className='text-gray-500 text-sm'>Username</span>
                            <input
                                type="text"
                                aria-label="Enter your email username"
                                placeholder="Enter your Username"
                                className="text-xs p-3 mb-3 border-[1px] border-gray-300 rounded bg-white w-full outline-gray-300"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                        <span className='text-gray-500 text-sm'>Full Name</span>
                            <input
                                type="text"
                                aria-label=" full name"
                                placeholder="Enter Your Full Name"
                                className="text-xs p-3 mb-3 border-[1px] border-gray-300 rounded bg-white w-full outline-gray-300"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                        </div>
                        <div>
                        <span className='text-gray-500 text-sm'>Email</span>
                            <input
                                type="text"
                                aria-label="Email"
                                placeholder="Enter your Email"
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
                                placeholder="Enter your Password"
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
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white border p-4 text-sm text-center mt-1">
                    Have an account? <Link to={LOGIN} className="font-semibold text-brand text-blue-500">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
