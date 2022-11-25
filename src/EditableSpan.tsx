import {TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string;
    onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') activateViewMode();
    };

    return editMode ? (
        <TextField
            value={title}
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            onKeyDown={onKeyDownHandler}
            autoFocus
        />
    ) : (
        <span onDoubleClick={activateEditMode}> {props.title}</span>
    );
})
