import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {auth} from "../firebase";
import preloader from "../assets/loading.svg";


const AuthContext = React.createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((user:any) => {
            setUser(user)
            setLoading(false)
            if(user) navigate('/chats')

        })
    }, [user, navigate]);

    const value = { user }

    return (
        <AuthContext.Provider value={value}>
            {loading ? <div className='min-w-full min-h-[100vh] flex justify-center items-center'>
                <img alt='Loading...' src={preloader}/>
            </div> : children}
            </AuthContext.Provider>
    )

}