import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton} from "@mui/material";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {FilterValuesType} from "./App";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todolistID: string) => void;
    addTask: (title: string, todolistID: string) => void;
    changeFilter: (value: FilterValuesType, todolistID: string) => void;
    changeStatus: (taskId: string, isDone: boolean, todolistID: string) => void;
    changeTaskTitle: (
        todolistID: string,
        taskId: string,
        newTitle: string
    ) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistID: string) => void;
    changeTodolistTitle: (todolistID: string, newTitle: string) => void;
};

export function TodoList(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter("all", props.id);

    const onActiveHandler = () => props.changeFilter("active", props.id);

    const onCompletedHandler = () => props.changeFilter("completed", props.id);

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    };

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    };

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/* <button onClick={removeTodolist}>x</button> */}
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {props.tasks.map((task: TaskType) => {
                    const onRemoveHandler = () => props.removeTask(task.id, props.id);

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(task.id, e.currentTarget.checked, props.id);
                    };

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(props.id, task.id, newValue);
                    };

                    return (
                        <div key={task.id} className={task.isDone ? "is-done" : ""}>
                            {/* <input
                type="checkbox"
                onChange={onChangeStatusHandler}
                checked={task.isDone}
                readOnly={true}
              /> */}
                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={task.isDone}
                                color="success"
                            />
                            <EditableSpan
                                title={task.title}
                                onChange={onChangeTitleHandler}
                            />
                            {/* <button onClick={onRemoveHandler}>X</button> */}
                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    );
                })}

                {/* <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button> */}
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
}
