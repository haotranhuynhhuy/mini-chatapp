import { Spin } from 'antd';
import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { auth } from '../components/firebase/config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({})
    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, photoURL, uid } = user;

                setUser({
                    displayName, email, photoURL, uid
                })
                setIsLoading(false);
                history.push('/chat')
                return;
            }
            setIsLoading(false);
            history.push('/login')
        })

        return () => {
            unsubcribe();
        }
    }, [history])
    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider