import {Delete} from '@mui/icons-material';
import {Button, IconButton} from '@mui/material';
import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Task} from './Task/Task';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {useAppDispatch} from '../../../hooks/hooks';
import {DomainTaskType, setTasksTC} from '../tasks-reducer';

type PropsType = {
    todolist: TodolistDomainType;
    tasks: Array<DomainTaskType>;
    addTask: (todolistID: string, title: string) => void;
    changeFilter: (todolistID: string, value: FilterValuesType) => void;
    removeTodolist: (todolistID: string) => void;
    changeTodolistTitle: (todolistID: string, newTitle: string) => void;
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void;
    changeTaskTitle: (
        todolistID: string,
        taskId: string,
        newTitle: string
    ) => void;
    removeTask: (todolistID: string, id: string) => void;
    demo?: boolean
};

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(setTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title);
    }, [props.addTask, props.todolist.id]);

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id);
    };

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title);
    }, [props.changeTodolistTitle, props.todolist.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'all'), [props.todolist.id, props.changeFilter])
    const onActiveHandler = useCallback(() => props.changeFilter(props.todolist.id, 'active'), [props.todolist.id, props.changeFilter])
    const onCompletedHandler = useCallback(() => props.changeFilter(props.todolist.id, 'completed'), [props.todolist.id, props.changeFilter])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>

            <div>
                {tasksForTodolist.map((task: TaskType) => <Task
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        task={task}
                        key={task.id}
                    />
                )}

                <div style={{marginTop: '20px'}}>
                    <Button
                        variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={onAllClickHandler}
                    >
                        All
                    </Button>
                    <Button
                        variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        color={'warning'}
                        onClick={onActiveHandler}
                    >
                        Active
                    </Button>
                    <Button
                        variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                        color={'secondary'}
                        onClick={onCompletedHandler}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    );
})

