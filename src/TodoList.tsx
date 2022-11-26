import {Delete} from '@mui/icons-material';
import {Button, IconButton} from '@mui/material';
import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Task} from './Task';
import {FilterValuesType} from './state/todolists-reducer';
import {TaskStatuses, TaskType} from './api/todolists-api';
import {useAppDispatch} from './hooks/hooks';
import {setTasksTC} from './state/tasks-reducer';

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    addTask: (todolistID: string, title: string) => void;
    changeFilter: (todolistID: string, value: FilterValuesType) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistID: string) => void;
    changeTodolistTitle: (todolistID: string, newTitle: string) => void;
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void;
    changeTaskTitle: (
        todolistID: string,
        taskId: string,
        newTitle: string
    ) => void;
    removeTask: (todolistID: string, id: string) => void;
};

export const TodoList = React.memo((props: PropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title);
    }, [props.addTask, props.id]);

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.id, props.changeFilter])
    const onActiveHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.id, props.changeFilter])
    const onCompletedHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.id, props.changeFilter])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
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
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    task={task}
                    todolistID={props.id}
                    key={task.id}/>
                )}

                <div style={{marginTop: '20px'}}>
                    <Button
                        variant={props.filter === 'all' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={onAllClickHandler}
                    >
                        All
                    </Button>
                    <Button
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        color={'warning'}
                        onClick={onActiveHandler}
                    >
                        Active
                    </Button>
                    <Button
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
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

