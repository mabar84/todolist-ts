import {TodolistType, todolitstsAPI} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';
import {appSetStatusAC, RequestStatusType} from '../../app/app-reducer';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
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
    dispatch(appSetStatusAC('loading'))
    todolitstsAPI.getTodolitsts()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(appSetStatusAC('succeeded'))
        })
}
export const addTodolistTC = (titleTodolist: string): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC('loading'))
    todolitstsAPI.createTodolist(titleTodolist)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(appSetStatusAC('succeeded'))
        })
}
export const deleteTodolistTC = (todolistID: string): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC('loading'))
    todolitstsAPI.deleteTodolist(todolistID)
        .then(() => {
            dispatch(removeTodolistAC(todolistID))
            dispatch(appSetStatusAC('succeeded'))
        })
}
export const changeTodolistTitleTC = (todolistID: string, newTodolistTitle: string): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC('loading'))
    todolitstsAPI.updateTodolist(todolistID, newTodolistTitle)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle))
            dispatch(appSetStatusAC('succeeded'))
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
    entityStatus: RequestStatusType
}