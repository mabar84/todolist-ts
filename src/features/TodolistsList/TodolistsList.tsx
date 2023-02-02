import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import React, {useCallback, useEffect} from 'react';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    setTodolistsTC,
    FilterValuesType
} from './todolists-reducer';
import {addTaskTC, deleteTaskTC, updateTaskTC} from './tasks-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }

        dispatch(setTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(deleteTodolistTC(todolistID))
    }, [])

    const changeTodolistTitle = useCallback((todolistID: string, newTodolistTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistID, newTodolistTitle))
    }, [])

    const addTask = useCallback((todolistID: string, newTaskTitle: string) => {
        dispatch(addTaskTC(todolistID, newTaskTitle))
    }, [])

    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(deleteTaskTC(todolistID, id))
    }, [])

    const changeTaskTitle = useCallback((todolistID: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistID, taskId, {title: newTitle}))
    }, [])

    const changeTaskStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistID, taskId, {status}))
    }, [])

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC({id: todolistID, filter: value})
        dispatch(action)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <>
            <Grid container style={{paddingTop: '10px', paddingBottom: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={2}>
                {todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id]
                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={3} style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    todolist={tl}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}