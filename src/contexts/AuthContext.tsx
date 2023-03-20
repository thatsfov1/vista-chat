import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {auth} from "../firebase";


const AuthContext = React.createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((user:any) => {
            setUser(user)
            setLoading(false)
            navigate('/chats')

        })
    }, [user, navigate]);

    const value = { user }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
            </AuthContext.Provider>
    )

}