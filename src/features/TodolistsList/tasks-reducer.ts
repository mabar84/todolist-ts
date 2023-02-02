import {TaskPriorities, TaskStatuses, TaskType, todolitstsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {AppRootState, AppThunk} from '../../app/store';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state: TasksStateType, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state: TasksStateType, action: PayloadAction<{ task: DomainTaskType }>) {
            state[action.payload.task.todoListId] = [action.payload.task, ...state[action.payload.task.todoListId]]
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: string }>) {
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {

            //state[action.payload.todolistId]= action.payload.tasks
            // state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
        }
    }
})

export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, changeTaskEntityStatusAC, setTasksAC} = slice.actions

//     = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
//     switch (action.type) {
//
//         // case 'ADD-TODOLIST':
//         //     return {...state, [action.todolist.id]: []}
//         // case 'REMOVE-TODOLIST': {
//         //     const stateCopy = {...state}
//         //     delete stateCopy[action.id]
//         //     return stateCopy
//         // }
//         // case 'SET-TODOLISTS': {
//         //     const stateCopy = {...state}
//         //     action.todolists.forEach(tl => {
//         //         stateCopy[tl.id] = []
//         //     })
//         //     return stateCopy
//         // }
//         case 'SET-TASKS':
//             return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
//         case 'CHANGE-TASK-ENTITY-STATUS': {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
//                     ...t,
//                     entityStatus: action.entityStatus
//                 } : t)
//             }
//         }
//         default:
//             return state
//     }
// }

// action-creators
// export const removeTaskAC = (todolistId: string, taskId: string) => (
//     {type: 'REMOVE-TASK', todolistId, taskId} as const)
// export const addTaskAC = (task: DomainTaskType) => (
//     {type: 'ADD-TASK', task} as const)
// export const updateTaskAC = () => (
//     {type: 'UPDATE-TASK', todolistId, taskId, model} as const)
// export const changeTaskEntityStatusAC = () => (
//     {type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, taskId, entityStatus} as const)
// export const setTasksAC = () => (
//     {type: 'SET-TASKS', todolistId, tasks} as const)

// thunk-creators
export const setTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolitstsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC({todolistId: todolistId, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTaskEntityStatusAC({todolistId: todolistId, taskId: taskId, entityStatus: 'loading'}))
    todolitstsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC({todolistId, taskId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolitstsAPI.createTask(todolistId, taskTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = {...res.data.data.item, entityStatus: 'idle'}
                dispatch(addTaskAC({task}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
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
        dispatch(setAppStatusAC({status: 'loading'}))
        todolitstsAPI.updateTask(todolistID, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistId: todolistID, taskId: taskId, model: domainModel}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

// types
// type ActionsType =
//     | ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof changeTaskEntityStatusAC>
//     | ReturnType<typeof setTasksAC>
//     | ReturnType<typeof removeTodolistAC>
//     | ReturnType<typeof addTodolistAC>
//     | ReturnType<typeof setTodolistsAC>

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