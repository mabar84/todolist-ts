import React, {useReducer} from "react";
import "./App.css";
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
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
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: TaskType[];
};

function AppWithReducers() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "all",},
        {id: todolistID2, title: "What to buy", filter: "all",},
    ]);

    let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "book", isDone: false},
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "kefir", isDone: false},
        ],
    });

    function removeTask(id: string, todolistID: string) {
        dispatchTasksReducer(removeTaskAC(id, todolistID))
    }

    function addTask(newTaskTitle: string, todolistID: string) {
        dispatchTasksReducer(addTaskAC(newTaskTitle, todolistID))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistID: string) {
        dispatchTasksReducer(changeTaskStatusAC(taskId, isDone, todolistID))
    }

    function changeTaskTitle(todolistID: string, taskId: string, newTitle: string) {
        dispatchTasksReducer(changeTaskTitleAC(todolistID, taskId, newTitle))
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        dispatchTodolistsReducer(changeTodolistFilterAC(todolistID, value))
    }

    let removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)
    };

    let changeTodolistTitle = (id: string, title: string) => {
        dispatchTodolistsReducer(changeTodolistTitleAC(id, title))
    };

    function addTodolist(title: string) {
        const action = addTodolistAC(title)

        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)
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
                        let tasksForTodolist = tasksObj[tl.id];

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


export default AppWithReducers;
