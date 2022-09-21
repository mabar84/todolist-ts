import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string
    title: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map((t) => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map((t) => t.id === action.taskId ? {...t, title: action.title} : t)
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}

// export const addTodolistAC = (title: string): ChangeTaskTitleActionType => {
//     return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
// }