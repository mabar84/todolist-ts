import {AddCircleOutlineOutlined} from '@mui/icons-material';
import {Grid, IconButton, TextField} from '@mui/material';
import {green} from '@mui/material/colors';
import React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void;
    disabled?: boolean
};

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }

        if (e.key === 'Enter') {
            addItemHandler();
        }
    };

    const addItemHandler = () => {
        if (title.trim() === '') {
            setError('Field is required');
            return;
        }
        addItem(title.trim());
        setTitle('');
    };

    return (
        <div>
            <Grid container>
                <TextField
                    disabled={disabled}
                    variant={'outlined'}
                    label={'NewItem'}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    helperText={error}
                    error={!!error}
                />
                <IconButton onClick={addItemHandler} disabled={disabled}>
                    <AddCircleOutlineOutlined sx={{color: green[500]}}/>
                </IconButton>
            </Grid>
        </div>
    );
})
