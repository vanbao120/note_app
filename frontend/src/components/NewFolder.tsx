import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CreateNewFolderOutlined } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ADD_NEW_FOLDER } from '../api/query';
import { callApi } from '../api/callApi';

// import { addNewFolder } from '../utils/folderUtils';

export default function NewFolder() {
    const [newFolderName, setNewFolderName] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const popupName = searchParams.get('popup');

    const handleOpenPopup = () => {
        // setOpen(true);
        setSearchParams({ popup: 'add-folder' });
    };
    const handleClose = () => {
        // setOpen(false);
        setNewFolderName('');
        navigate(-1);
    };
    const handleNewFolderNameChange = (e: any) => {
        setNewFolderName(e.target.value);
    };

    const handleAddNewFolder = async () => {
        const query = ADD_NEW_FOLDER
        await callApi({
            body: JSON.stringify({
                query,
                variables: {
                    name: newFolderName
                }
            })
        })
        handleClose();
    };

    useEffect(() => {
        if (popupName === 'add-folder') {
            setOpen(true);
            return;
        }

        setOpen(false);
    }, [popupName])

    return (
        <div>
            <Tooltip title='Add Folder' onClick={handleOpenPopup}>
                <IconButton size='small'>
                    <CreateNewFolderOutlined sx={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Folder</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Folder Name'
                        fullWidth
                        size='small'
                        variant='standard'
                        sx={{ width: '400px' }}
                        autoComplete='off'
                        value={newFolderName}
                        onChange={handleNewFolderNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}