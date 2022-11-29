import {TodolistType, todolitstsAPI} from '../api/todolists-api';
import {AppThunk} from './store';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

// action-creators
export const removeTodolistAC = (id: string) => (
    {type: 'REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (todolist: TodolistType) => (
    {type: 'ADD-TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) => (
    {type: 'CHANGE-TODOLIST-TITLE', id, title} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => (
    {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>) => (
    {type: 'SET-TODOLISTS', todolists} as const)

// thunk-creators
export const setTodolistsTC = (): AppThunk => (dispatch) => {
    todolitstsAPI.getTodolitsts()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const addTodolistTC = (titleTodolist: string): AppThunk => (dispatch) => {
    todolitstsAPI.createTodolist(titleTodolist)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const deleteTodolistTC = (todolistID: string): AppThunk => (dispatch) => {
    todolitstsAPI.deleteTodolist(todolistID)
        .then(() => {
            dispatch(removeTodolistAC(todolistID))
        })
}
export const changeTodolistTitleTC = (todolistID: string, newTodolistTitle: string): AppThunk => (dispatch) => {
    todolitstsAPI.updateTodolist(todolistID, newTodolistTitle)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle))
        })
}

// types
type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}