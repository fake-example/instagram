import React, { useContext, useState, useEffect, useRef } from "react";
import logo from "../images/logo.png";
import logo2 from "../images/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { EDIT_PROFILE, HOME, LOGIN } from "../constants/routes";
import UserContext from "../context/user";
import FirebaseContext from "../context/firebase";
import { SIGN_UP } from "../constants/routes";
import CreatePost from "../components/createPost/CreatePost";
import useUser from "../hooks/useUser";
import "./style.css";
import SearchBar from "./SearchBar";
import { AiOutlinePlusSquare, AiOutlineHome, AiOutlineImport, AiOutlineSetting } from "react-icons/ai";
import { CgProfile, CgSearch } from "react-icons/cg"


const NavBar = () => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const navbarRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { user: { avatarSrc, username }, } = useUser();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <>
      <CreatePost open={open} setOpen={setOpen} />
      <div className="border-b sticky top-0 z-50 bg-white" ref={navbarRef}>
            <div className="flex justify-between max-w-6xl items-center mx-5 xl:mx-auto">
            <div
                onClick={() => navigate(HOME)}
                className="relative hidden lg:inline-grid w-40 cursor-pointer"
            >
                <Link to="/">
                    <img src={logo} alt="Instagram" />
                </Link>
            </div>
            <div
                onClick={() => navigate(HOME)}
                className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer"
            >
                <Link to="/">
                    <img src={logo2} alt="Instagram" />
                </Link>
            </div>

            <div className="max-w-x5">
                <div className="p-3 mt-1 relative rounded-md">
                    <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                        <CgSearch className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setFocused(true)}
                        type="text"
                        className="py-2 block w-full pl-10 bg-gray-50 sm:text-sm border-gray-300 rounded-md border outline-black"
                        placeholder="Search"
                    />
                </div>
                {focused && (
                <div
                    className="absolute top-14 w-[189px] rounded-sm flex items-center p-3"
                    ref={searchRef}
                >
                    <SearchBar searchInput={search} />
                </div>
                )}
            </div>
        <div>
                <div className="flex items-center space-between">
                    {user ? (
                        <>
                        <div className="">
                            <Link to="/">
                                <AiOutlineHome className="h-8 w-8 cursor-pointer hover:scale-125 transition-all duration-150 ease-out" />
                            </Link>
                        </div>
                        <div className="cursor-pointer flex items-center justify-center mr-6" onClick={() => setOpen(true)}>
                            <div className="">
                                <AiOutlinePlusSquare className="h-8 w-8 cursor-pointer hover:scale-125 transition-all duration-150 ease-out"/>
                            </div>

                            <button
                                type="button"
                                title="Sign Out"
                                onClick={() => firebase.auth().signOut()}
                                className=""
                            >
                                <AiOutlineImport className=" h-8 w-8 cursor-pointer hover:scale-125 transition-all duration-150 ease-out"/>
                            </button>
                        </div>

                        <div className=" rounded-full border-2 border-rose-600 cursor-pointer flex items-center justify-center w-10 h-10 relative select-none"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                        >
                            <img
                            className="w-full h-full rounded-full"
                            src={avatarSrc}
                            alt={""}
                            />
                            <div
                            className={
                                !dropdownOpen
                                ? "hidden"
                                : "" +
                                    " bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow absolute top-10 right-0"
                            }
                            >
                            <ul className="py-1" aria-labelledby="dropdown">
                                <li
                                className="hover:bg-gray-100"
                                onClick={() => navigate(`/${username}`)}
                                >
                                <div className="flex items-center px-4 py-2">
                                    <div className="flex items-center mr-2">
                                        <CgProfile />
                                    </div>
                                    <span className="text-sm text-gray-700 block">
                                    Profile
                                    </span>
                                </div>
                                </li>
                                <li
                                className="border-b hover:bg-gray-100"
                                onClick={() => navigate(EDIT_PROFILE)}
                                >
                                <div className="flex items-center px-4 py-2 pr-10">
                                    <div className="flex items-center mr-2">
                                        <AiOutlineSetting />
                                    </div>
                                    <span className="text-sm text-gray-700 block">
                                    Settings
                                    </span>
                                </div>
                                </li>
                                <li onClick={() => firebase.auth().signOut()}>
                                <span className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                    Sign out
                                </span>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </>
                    ) : (
                        <>
                        <Link to={LOGIN}>
                            <button
                            className="bg-blue-inst font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            >
                            Log In
                            </button>
                        </Link>
                        <Link to={SIGN_UP}>
                            <button
                            className="text-blue-inst font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            >
                            Sign Up
                            </button>
                        </Link>
                        </>
                    )}
                    </div>
                </div>
            </div>
      </div>
    </>
  );
};

export default NavBar;
