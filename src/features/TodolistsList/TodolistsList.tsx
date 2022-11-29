import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import React, {useCallback, useEffect} from 'react';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    FilterValuesType,
    setTodolistsTC
} from './todolists-reducer';
import {addTaskTC, deleteTaskTC, updateTaskTC} from './tasks-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {TodoList} from './Todolist/TodoList';

export const TodolistsList = () => {
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
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
        const action = changeTodolistFilterAC(todolistID, value)
        dispatch(action)
    }, [])
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
        </>
    )
}