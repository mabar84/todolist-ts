import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void;
    changeTaskTitle: (
        todolistID: string,
        taskId: string,
        newTitle: string
    ) => void;
    removeTask: (todolistID: string, id: string) => void;
    task: TaskType
    todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = useCallback(() => {
        props.removeTask(props.todolistID, props.task.id)
    }, [props.todolistID, props.task.id, props.removeTask])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todolistID, props.task.id, e.currentTarget.checked);
    }, [props.todolistID, props.task.id, props.changeStatus])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistID, props.task.id, newValue);
    }, [props.todolistID, props.task.id, props.changeTaskTitle])

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>

            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.task.isDone}
                color="success"
            />
            <EditableSpan
                title={props.task.title}
                onChange={onChangeTitleHandler}
            />
            {/* <button onClick={onRemoveHandler}>X</button> */}
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>)
})