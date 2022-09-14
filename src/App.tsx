import React, {useState} from "react";
import "./App.css";
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {StringMappingType} from "typescript";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Card,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

type TasksStateType = {
    [key: string]: TaskType[];
};

function App() {
    function removeTask(id: string, todolistID: string) {
        let tasks = tasksObj[todolistID];

        let filteredTasks = tasks.filter((t) => t.id != id);
        tasksObj[todolistID] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(newTaskTitle: string, todolistID: string) {
        let task = {
            id: v1(),
            title: newTaskTitle,
            isDone: false,
        };
        let tasks = tasksObj[todolistID];

        let newTasks = [task, ...tasks];

        tasksObj[todolistID] = newTasks;

        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        let tasks = tasksObj[todolistID];

        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }

    function changeTaskTitle(
        todolistID: string,
        taskId: string,
        newTitle: string
    ) {
        // let tasks = tasksObj[todolistID];

        // let task = tasks.find((t) => t.id === taskId);
        // if (task) {
        //   task.title = newTitle;
        //   setTasks({ ...tasksObj });
        // }

        setTasks({
            ...tasksObj,
            [todolistID]: tasksObj[todolistID].map((m) =>
                m.id === taskId ? {...m, title: newTitle} : m
            ),
        });
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find((tl) => tl.id === todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {
            id: todolistID1,
            title: "What to learn",
            filter: "all",
        },
        {
            id: todolistID2,
            title: "What to buy",
            filter: "all",
        },
    ]);

    let removeTodolist = (todolistID: string) => {
        let filteredTodolist = todolists.filter((tl) => tl.id != todolistID);
        setTodolists(filteredTodolist);
        delete tasksObj[todolistID];
        setTasks({...tasksObj});
    };

    let changeTodolistTitle = (todolistID: string, newTitle: string) => {
        const todolist = todolists.find((tl) => tl.id === todolistID);
        if (todolist) {
            todolist.title = newTitle;
        }
        setTodolists([...todolists]);
    };

    let [tasksObj, setTasks] = useState<TasksStateType>({
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

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title,
        };
        setTodolists([todolist, ...todolists]);
        setTasks({...tasksObj, [todolist.id]: []});
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
                                        changeStatus={changeStatus}
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
    );
}

export default App;
