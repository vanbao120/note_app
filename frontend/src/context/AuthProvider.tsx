import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
type Props = {
    children: ReactNode
}

export const AuthContext = createContext({})

const AuthProvider = ({ children }: Props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<Object>({})
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth()

    useEffect(() => {
        const unsubscribed = auth.onIdTokenChanged((user: any) => {
            if (user?.uid) {
                setUser(user);
                if (user.accessToken !== localStorage.getItem('accessToken')) {
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.reload();
                }
                setIsLoading(false);
                return;
            }

            // reset user info
            console.log('reset');
            setIsLoading(false);
            setUser({});
            localStorage.clear();
            navigate('/login');
        });

        return () => {
            unsubscribed();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {isLoading ? <CircularProgress /> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider