import {TaskPriorities, TaskStatuses, TaskType, todolitstsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {AppRootState, AppThunk} from '../../app/store';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
        case 'CHANGE-TASK-ENTITY-STATUS': {
            console.log(state)
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    entityStatus: action.entityStatus
                } : t)
            }
        }
        default:
            return state
    }
}

// action-creators
export const removeTaskAC = (todolistId: string, taskId: string) => (
    {type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (task: DomainTaskType) => (
    {type: 'ADD-TASK', task} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => (
    {type: 'UPDATE-TASK', todolistId, taskId, model} as const)
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: string) => (
    {type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, taskId, entityStatus} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => (
    {type: 'SET-TASKS', todolistId, tasks} as const)

// thunk-creators
export const setTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolitstsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    todolitstsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolitstsAPI.createTask(todolistId, taskTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = {...res.data.data.item, entityStatus: 'idle'}
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('some error'))
                }
            }
            dispatch(setAppStatusAC('failed'))
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const updateTaskTC = (todolistID: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        dispatch(setAppStatusAC('loading'))
        todolitstsAPI.updateTask(todolistID, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistID, taskId, domainModel))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('some error'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }
            })
            .catch((error) => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))
            })
    }

// types
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>

export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}

export type TasksStateType = {
    [key: string]: DomainTaskType[];
};

export type DomainTaskType = TaskType & {
    entityStatus: string
}

// {
//     "c73cb048-6b28-46b3-904f-88d5a9e89683": [
//     {
//         "id": "d0b9fc1c-c2f2-44cb-87e0-c6ef5919810d",
//         "title": "as12",
//         "description": null,
//         "todoListId": "c73cb048-6b28-46b3-904f-88d5a9e89683",
//         "order": 0,
//         "status": 2,
//         "priority": 1,
//         "startDate": null,
//         "deadline": null,
//         "addedDate": "2022-12-09T12:23:54.317",
//         "entityStatus": "idle"
//     }
// ],
//     "29705533-dfe3-47ae-a130-f6c3b8f2dca3": [
//     {
//         "id": "af31f35a-116a-42ce-a5ad-ce494bed723d",
//         "title": "we",
//         "description": null,
//         "todoListId": "29705533-dfe3-47ae-a130-f6c3b8f2dca3",
//         "order": -1,
//         "status": 0,
//         "priority": 1,
//         "startDate": null,
//         "deadline": null,
//         "addedDate": "2022-12-09T12:09:48.947",
//         "entityStatus": "idle"
//     },
//     {
//         "id": "b045bec2-56f1-445f-8780-af5c6ac1c789",
//         "title": "ьтб",
//         "description": null,
//         "todoListId": "29705533-dfe3-47ae-a130-f6c3b8f2dca3",
//         "order": 0,
//         "status": 2,
//         "priority": 1,
//         "startDate": null,
//         "deadline": null,
//         "addedDate": "2022-12-09T11:16:07.293",
//         "entityStatus": "idle"
//     }
// ],
//     "a2d7eff7-80b6-4878-98bd-31bcecf43734": [
//     {
//         "id": "298fb298-53c9-4f13-a065-35ea3e395d4f",
//         "title": "-0-0-0-0-",
//         "description": null,
//         "todoListId": "a2d7eff7-80b6-4878-98bd-31bcecf43734",
//         "order": -1,
//         "status": 2,
//         "priority": 1,
//         "startDate": null,
//         "deadline": null,
//         "addedDate": "2022-11-27T17:36:46.217",
//         "entityStatus": "idle"
//     },
//     {
//         "id": "a0943f82-5d66-4ec1-a482-691d9bf21e42",
//         "title": "7777",
//         "description": null,
//         "todoListId": "a2d7eff7-80b6-4878-98bd-31bcecf43734",
//         "order": 0,
//         "status": 0,
//         "priority": 1,
//         "startDate": null,
//         "deadline": null,
//         "addedDate": "2022-11-27T17:36:44.313",
//         "entityStatus": "idle"
//     }
// ]
// }