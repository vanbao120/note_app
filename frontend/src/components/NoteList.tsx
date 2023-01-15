import { NoteAddOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useNavigate, useParams, useSubmit } from 'react-router-dom';

type Props = {}

const NoteList = (props: Props) => {
    const { noteId, folderId } = useParams() as any;
    const navigate = useNavigate()
    const submit = useSubmit();
    const { folder } = useLoaderData() as { folder: { notes: any[] } }
    const [activeNoteId, setActiveNoteId] = useState(noteId);

    useEffect(() => {
        if (noteId) {
            setActiveNoteId(noteId);
            return;
        }

        if (folder?.notes?.[0]) {
            navigate(`note/${folder.notes[0].id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId, folder.notes]);

    const handleAddNewNote = () => {
        submit(
            {
                content: '',
                folderId,
            },
            { method: 'post', action: `/folder/${folderId}` }
        );
    }
    return (
        <Grid container height='100%'>
            <Grid
                item
                xs={4}
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: '#F0EBE3',
                    height: '100%',
                    overflowY: 'auto',
                    padding: '10px',
                    textAlign: 'left',
                }}
            >
                <List
                    subheader={
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold' }}>Notes</Typography>
                            <Tooltip title='Add Note' onClick={handleAddNewNote}>
                                <IconButton size='small'>
                                    <NoteAddOutlined />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                >
                    {folder.notes.map(({ id, content, updatedAt }: any) => {
                        const contentHtml = content === '<p></p>\n' ? 'Empty' : content.substring(0, 30)

                        return (
                            <Link
                                key={id}
                                to={`note/${id}`}
                                style={{ textDecoration: 'none' }}
                                onClick={() => setActiveNoteId(id)}
                            >
                                <Card
                                    sx={{
                                        mb: '5px',
                                        backgroundColor:
                                            id === activeNoteId ? 'rgb(255 211 140)' : null,
                                    }}
                                >
                                    <CardContent
                                        sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}
                                    >
                                        <div
                                            style={{ fontSize: 14, fontWeight: 'bold' }}
                                            dangerouslySetInnerHTML={{
                                                __html: `${contentHtml || 'Empty'}`,
                                            }}
                                        />
                                        <Typography sx={{ fontSize: '10px' }}>
                                            {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </List>
            </Grid>
            <Grid item xs={8}>
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default NoteList