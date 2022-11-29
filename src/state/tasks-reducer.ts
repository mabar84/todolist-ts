import {TasksStateType} from '../AppWithRedux';
import {TaskPriorities, TaskStatuses, TaskType, todolitstsAPI, UpdateTaskModelType} from '../api/todolists-api';
import {AppRootState, AppThunk} from './store';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';

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
            stateCopy[action.todolist.id] = []
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

// action-creators
export const removeTaskAC = (todolistId: string, taskId: string) => (
    {type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) => (
    {type: 'ADD-TASK', task} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => (
    {type: 'UPDATE-TASK', todolistId, taskId, model} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => (
    {type: 'SET-TASKS', todolistId, tasks} as const)

// thunk-creators
export const setTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    todolitstsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    todolitstsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string): AppThunk => (dispatch) => {
    todolitstsAPI.createTask(todolistId, taskTitle)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
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
        todolitstsAPI.updateTask(todolistID, taskId, apiModel)
            .then(() => {
                dispatch(updateTaskAC(todolistID, taskId, domainModel))
            })
    }

// types
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
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