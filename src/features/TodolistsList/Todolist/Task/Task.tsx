import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';
import {DomainTaskType} from '../../tasks-reducer';

type TaskPropsType = {
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void;
    changeTaskTitle: (
        todolistID: string,
        taskId: string,
        newTitle: string
    ) => void;
    removeTask: (todolistID: string, id: string) => void;
    task: DomainTaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = useCallback(() => {
        props.removeTask(props.task.todoListId, props.task.id)
    }, [props.task.todoListId, props.task.id, props.removeTask])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.todoListId, props.task.id,
            newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    }, [props.task.todoListId, props.task.id])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.todoListId, props.task.id, newValue);
    }, [props.task.todoListId, props.task.id, props.changeTaskTitle])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>

            <Checkbox onChange={onChangeStatusHandler}
                      checked={props.task.status === TaskStatuses.Completed}
                      color="success"
            />
            <EditableSpan
                title={props.task.title}
                onChange={onChangeTitleHandler}
            />
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>)
})