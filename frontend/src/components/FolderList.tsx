import { Card, CardContent, List, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NewFolder from './NewFolder';
import { DeleteOutline } from '@mui/icons-material'
import { DELETE_FOLDER } from '../api/query';
import { callApi } from '../api/callApi';

export default function FolderList({ folders }: any) {
    const { folderId } = useParams();
    const navigate = useNavigate()
    const [activeFolderId, setActiveFolderId] = useState(folderId);

    const handleDeleteFolder = async () => {
        const query = DELETE_FOLDER
        const res = await callApi({
            body: JSON.stringify({
                query,
                variables: {
                    folderId
                }
            })
        })
        if (res.deleteFolder.deletedCount) {
            navigate('/')
            window.location.reload()
        }
    }

    return (
        <List
            sx={{
                width: '100%',
                bgcolor: '#7D9D9C',
                height: '100%',
                padding: '10px',
                textAlign: 'left',
                overflowY: 'auto',
            }}
            subheader={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
                        Folders
                    </Typography>
                    <DeleteOutline sx={{ color: 'white', ml: '135px', cursor: 'pointer' }} onClick={handleDeleteFolder} />
                    <NewFolder />
                </Box>
            }
        >
            {folders?.map(({ id, name }: any) => {
                return (
                    <Fragment key={id}>
                        <Link
                            to={`folder/${id}`}
                            style={{
                                textDecoration: 'none',
                            }}
                            onClick={() => setActiveFolderId(id)}
                        >
                            <Card
                                sx={{
                                    mb: '5px',
                                    backgroundColor:
                                        id === activeFolderId ? 'rgb(255 211 140)' : null,

                                }}
                            >
                                <CardContent
                                    sx={{
                                        '&:last-child': { pb: '10px' }, padding: '10px',
                                    }}
                                >
                                    <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Fragment>

                );
            })}
        </List>
    );
}