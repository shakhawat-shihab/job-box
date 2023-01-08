import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { logout, logOutUser } from "../../features/auth/authSlice";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    // dispatch(logOutUser())

    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(logout());
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"
        }`}
    >
      <ul className='max-w-7xl mx-auto flex gap-3 h-full items-center'>
        <li className='flex-auto font-semibold text-2xl'>
          <Link to='/'>JobBox</Link>
        </li>
        <li>
          <Link className='hover:text-primary transition-all' to='/jobs'>
            Jobs
          </Link>
        </li>

        {
          user?.email && user?.role
          &&
          <li>
            <Link className='hover:text-primary transition-all' to='/dashboard'>
              Dashboard
            </Link>
          </li>
        }
        {
          user?.email && !user?.role
          &&
          <li>
            <Link className='hover:text-primary transition-all' to='/register'>
              Get Started
            </Link>
          </li>
        }


        {
          !user?.email
            ?
            <li>
              <Link
                className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
                to='/login'
              >
                Login
              </Link>
            </li>
            :
            <button
              className='hover:text-primary transition-all'
              onClick={() => handleSignOut()}
            >
              Logout
            </button>
        }


      </ul>
    </nav>
  );
};

export default Navbar;
