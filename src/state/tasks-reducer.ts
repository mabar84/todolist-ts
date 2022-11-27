import {TasksStateType} from '../AppWithRedux';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskStatuses, TaskType, todolitstsAPI, UpdateTaskModelType} from '../api/todolists-api';
import {AppRootState, AppThunk} from './store';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: Array<TaskType>
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTask = action.task
            stateCopy[action.task.todoListId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = [...stateCopy[action.todolistId]]
            stateCopy[action.todolistId] = tasks.map((t) => t.id === action.taskId ? {...t, status: action.status} : t)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map((t) => t.id === action.taskId ? {...t, title: action.title} : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                    stateCopy[tl.id] = []
                }
            )
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string,
                                   status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}

export const setTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolitstsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        todolitstsAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}

export const addTaskTC = (todolistId: string, taskTitle: string): AppThunk => {
    return (dispatch) => {
        todolitstsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const changeTaskStatusTC = (todolistID: string, taskId: string, status: TaskStatuses): AppThunk => {

    return (dispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        todolitstsAPI.updateTask(todolistID, taskId, model)
            .then(() => {
                dispatch(changeTaskStatusAC(todolistID, taskId, status))
            })
    }
}

export const changeTaskTitleTC = (todolistID: string, taskId: string, newTitle: string): AppThunk => {

    return (dispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const model: UpdateTaskModelType = {
            title: newTitle,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        todolitstsAPI.updateTask(todolistID, taskId, model)
            .then(() => {
                dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
            })
    }
}