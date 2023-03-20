import React from 'react'
import {FcGoogle} from "react-icons/fc";
import {AiFillFacebook} from "react-icons/all";
import {auth} from "../firebase";
import firebase from "firebase/compat/app";


const Login = () => {
  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 bg-cyan-600 '>
      <div className="relative px-8 pt-8 pb-16 text-center bg-white rounded-2xl w-[420px] top-[calc(50%-144px)] left-[calc(50%-210px)]">
          <div onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} className="cursor-pointer border border-b-gray-200 rounded-lg flex p-3 justify-center items-center gap-0.5">
                <FcGoogle/>
              Log in with Google
          </div>
          <br/>
          <div onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())} className="cursor-pointer border border-b-gray-200 rounded-lg flex p-3 justify-center items-center gap-0.5">
            <AiFillFacebook/>
              Log in with Facebook
          </div>
      </div>
    </div>
  )
}

export default Login
