import React from "react";
import "./App.css";
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: TaskType[];
};

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    function removeTask(id: string, todolistID: string) {
        dispatch(removeTaskAC(id, todolistID))
    }

    function addTask(newTaskTitle: string, todolistID: string) {
        dispatch(addTaskAC(newTaskTitle, todolistID))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistID: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }

    function changeTaskTitle(todolistID: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }

    let removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    };

    let changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    };

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

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

            <Container fixed style={{padding: "10px"}}>
                <Grid container style={{paddingTop: "10px", paddingBottom: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={2}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id];

                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
                        }

                        return (
                            <Grid item>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                    {/*<TodoList title="Second" tasks={task2}/>*/}
                    {/*<TodoList title="Third" tasks={task3}/>*/}
                </Grid>
            </Container>
        </div>
    )
}


export default AppWithRedux;
