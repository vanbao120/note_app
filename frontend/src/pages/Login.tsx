import { Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { callApi } from '../api/callApi'
import { REGISTER } from '../api/query'

type Props = {}

const Login = (props: Props) => {
    const auth = getAuth()
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider()
        const {
            user: { uid, displayName },
        } = await signInWithPopup(auth, provider)
        const mutation = REGISTER
        const data = callApi({
            body: JSON.stringify({
                query: mutation,
                variables: {
                    uid,
                    name: displayName,
                },
            })
        })
        return data
    }

    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/" />
    }

    return (
        <>
            <Typography variant='h5' sx={{ marginBottom: '10px' }}>
                Welcome to Note App
            </Typography>
            <Button variant='outlined' onClick={handleLogin}>
                Login with Google
            </Button>
        </>

    )
}

export default Login