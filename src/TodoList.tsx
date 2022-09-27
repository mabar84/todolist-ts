import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {FilterValuesType} from "./AppWithRedux";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    addTask: (todolistID: string, title: string) => void;
    changeFilter: (todolistID: string, value: FilterValuesType) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistID: string) => void;
    changeTodolistTitle: (todolistID: string, newTitle: string) => void;
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void;
    changeTaskTitle: (
        todolistID: string,
        taskId: string,
        newTitle: string
    ) => void;
    removeTask: (todolistID: string, id: string) => void;
};

export const TodoList = React.memo((props: PropsType) => {

    console.log("todolist is called")

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title);
    }, [props.addTask, props.id]);

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, "all"), [props.id, props.changeFilter])
    const onActiveHandler = useCallback(() => props.changeFilter(props.id, "active"), [props.id, props.changeFilter])
    const onCompletedHandler = useCallback(() => props.changeFilter(props.id, "completed"), [props.id, props.changeFilter])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter((t) => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t) => t.isDone === true);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {tasksForTodolist.map((task: TaskType) => <Task
                    changeStatus={props.changeStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    task={task}
                    todolistID={props.id}
                    key={task.id}/>
                )}

                <div style={{marginTop: "20px"}}>
                    <Button
                        variant={props.filter === "all" ? "contained" : "text"}
                        color={"primary"}
                        onClick={onAllClickHandler}
                    >
                        All
                    </Button>
                    <Button
                        variant={props.filter === "active" ? "contained" : "text"}
                        color={"warning"}
                        onClick={onActiveHandler}
                    >
                        Active
                    </Button>
                    <Button
                        variant={props.filter === "completed" ? "contained" : "text"}
                        color={"secondary"}
                        onClick={onCompletedHandler}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    );
})

