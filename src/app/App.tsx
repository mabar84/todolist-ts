import React from 'react';
import './App';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography,} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TaskType} from '../api/todolists-api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useAppSelector} from '../hooks/hooks';

export type TasksStateType = {
    [key: string]: TaskType[];
};

function App() {
    const status = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                        Todolist-ts
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed style={{padding: '10px'}}>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App;
