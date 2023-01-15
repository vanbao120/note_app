import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import FolderList from '../components/FolderList'
import UserMenu from '../components/UserMenu'

type Props = {}

const Home = (props: Props) => {
    const { folders } = useLoaderData() as { folders: [] }

    return (
        <>
            <Typography variant='h4' sx={{ mb: '20px' }}>
                Note App
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'right', mb: '10px' }}>
                <UserMenu />
                {/* <PushNotification /> */}
            </Box>
            <Grid
                container
                sx={{
                    height: '50vh', boxShadow: '0 0 15px 0 rgb(193 193 193 / 60%)',
                }}
            >
                <Grid item xs={3} sx={{ height: '100%' }}>
                    <FolderList folders={folders} />
                </Grid>
                <Grid item xs={9} sx={{ height: '100%' }}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}

export default Home