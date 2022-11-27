import {TasksStateType} from '../AppWithRedux';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolitstsAPI, UpdateTaskModelType} from '../api/todolists-api';
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

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
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
    | UpdateTaskActionType
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
        case 'UPDATE-TASK': {
            const stateCopy = {...state}
            let tasks = [...stateCopy[action.todolistId]]
            stateCopy[action.todolistId] = tasks.map((t) => t.id === action.taskId ? {...t, ...action.model} : t)
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

export const updateTaskAC = (todolistId: string, taskId: string,
                             model: UpdateDomainTaskModelType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model}
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

export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}

export const updateTaskTC = (todolistID: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {

    return (dispatch, getState: () => AppRootState) => {
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

        todolitstsAPI.updateTask(todolistID, taskId, apiModel)
            .then(() => {
                dispatch(updateTaskAC(todolistID, taskId, domainModel))
            })
    }
}

// export const changeTaskTitleTC = (todolistID: string, taskId: string, newTitle: string): AppThunk => {
//
//     return (dispatch, getState: () => AppRootState) => {
//         const state = getState()
//         const task = state.tasks[todolistID].find(t => t.id === taskId)
//
//         if (!task) {
//             console.warn('task not found in the state')
//             return
//         }
//
//         const model: UpdateTaskModelType = {
//             title: newTitle,
//             description: task.description,
//             status: task.status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//         }
//
//         todolitstsAPI.updateTask(todolistID, taskId, model)
//             .then(() => {
//                 dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
//             })
//     }
// }