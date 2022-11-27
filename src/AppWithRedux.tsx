import React, {useCallback, useEffect} from 'react';
import './AppWithRedux';
import {TodoList} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {
    AppBar, Button, Container, Grid, IconButton, Paper,
    Toolbar, Typography,
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    changeTodolistTitleTC,
    changeTodolistFilterAC,
    FilterValuesType, setTodolistsTC, deleteTodolistTC, addTodolistTC
} from './state/todolists-reducer';
import {
    addTaskTC,
    changeTaskStatusAC,
    changeTaskStatusTC,
    changeTaskTitleAC,
    deleteTaskTC
} from './state/tasks-reducer';
import {TaskStatuses, TaskType} from './api/todolists-api';
import {useAppDispatch, useAppSelector} from './hooks/hooks';

export type TasksStateType = {
    [key: string]: TaskType[];
};

function AppWithRedux() {

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(deleteTaskTC(todolistID, id))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, newTaskTitle: string) => {
        dispatch(addTaskTC(todolistID, newTaskTitle))
    }, [])

    const changeTaskStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(todolistID, taskId, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistID, value)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(deleteTodolistTC(todolistID))
    }, [])

    const changeTodolistTitle = useCallback((todolistID: string, newTodolistTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistID, newTodolistTitle))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])


    return (
        <div className="App">
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
            </AppBar>

            <Container fixed style={{padding: '10px'}}>
                <Grid container style={{paddingTop: '10px', paddingBottom: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={2}>
                    {todolists.map((tl) => {

                        let tasksForTodolist = tasks[tl.id]

                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
