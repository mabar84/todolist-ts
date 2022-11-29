import {AddCircleOutlineOutlined} from "@mui/icons-material";
import {Grid, IconButton, TextField} from "@mui/material";
import {green} from "@mui/material/colors";
import React from "react";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }

        if (e.key === "Enter") {
            addItem();
        }
    };

    const addItem = () => {
        if (title.trim() === "") {
            setError("Field is required");
            return;
        }
        props.addItem(title.trim());
        setTitle("");
    };

    return (
        <div>
            <Grid container>
                <TextField
                    variant={"outlined"}
                    label={"NewItem"}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    helperText={error}
                    error={!!error}
                />
                <IconButton onClick={addItem}>
                    <AddCircleOutlineOutlined sx={{color: green[500]}}/>
                </IconButton>
            </Grid>
        </div>
    );
})
