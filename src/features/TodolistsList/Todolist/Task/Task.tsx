import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';

type TaskPropsType = {
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void;
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

        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistID, props.task.id,
            newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    }, [props.todolistID, props.task.id])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistID, props.task.id, newValue);
    }, [props.todolistID, props.task.id, props.changeTaskTitle])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>

            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.task.status === TaskStatuses.Completed}
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