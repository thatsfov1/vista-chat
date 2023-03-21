import React, {useEffect, useState} from 'react'
// @ts-ignore
import {ChatEngine} from 'react-chat-engine';
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import {BsFillChatFill} from "react-icons/all";
import preloader from '../assets/loading.svg'

const Chats = () => {

    // @ts-ignore
    const { user } = useAuth()
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

  const handleLogout = async () => {
    await auth.signOut()
    navigate('/')
  }

  const getFile = async (url: string) => {
        const response = await fetch(url)
        const data = await response.blob()

      return new File([data], 'userPhoto.jpg', { type: 'image/jpeg'})
  }

  useEffect(()=> {
    if(!user){
        navigate('/')
        return
    }
    axios.get('https://api.chatengine.io/users/me',{
        headers:{
            "project-id":import.meta.env.VITE_CHAT_ENGINE_ID,
            "user-name":user.email,
            "user-secret":user.uid
        }
    }).then(() =>{
            setLoading(false)
    }).catch(() => {
        let formdata = new FormData()
        formdata.append("username", user.email)
        formdata.append("email", user.email)
        formdata.append("secret", user.uid)

        getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name)
                axios.post('https://api.chatengine.io/users',
                    formdata,
                    {
                        headers:{
                            "private-key": import.meta.env.VITE_CHAT_ENGINE_KEY
                    }
            }).then(() => setLoading(false))
                    .catch((error) => console.log(error))
        })
    } )
  },[navigate,user])

    if(loading || !user) return <div className='min-w-full min-h-[100vh] flex justify-center items-center'>
        <img alt='Loading...' src={preloader}/>
    </div>

  return (
    <div className='absolute top-0 left-0 w-[100vw] h-[100vh]'>
        <div className='w-full h-16 bg-cyan-600 '>
            <div className='absolute top-3 left-4 text-white text-3xl'>
                <div className='flex gap-1 items-center'><BsFillChatFill/> Vista</div>
            </div>
            <div onClick={handleLogout} className='cursor-pointer absolute top-5 right-4 text-white text-sm'>
              Log out
            </div>
        </div>
        <ChatEngine
        height="calc(100vh-4rem)"
        projectID={import.meta.env.VITE_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
        />
    </div>
  )
}

export default Chats
