import {TodolistType, todolitstsAPI} from '../api/todolists-api';
import {AppThunk} from './store';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    newTodolistTitle: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                addedDate: '',
                order: 0,
                filter: 'all'
            },
                ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find((tl) => tl.id === action.todolistId);
            if (todolist) {
                todolist.title = action.newTodolistTitle;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find((tl) => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId}
}

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, newTodolistTitle}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists: todolists}
}

export const setTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todolitstsAPI.getTodolitsts()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const addTodolistTC = (titleTodolist: string): AppThunk => {
    return (dispatch) => {
        todolitstsAPI.createTodolist(titleTodolist)
            .then((res) => {
                dispatch(addTodolistAC(titleTodolist, res.data.data.item.id))
            })
    }
}

export const deleteTodolistTC = (todolistID: string): AppThunk => {
    return (dispatch) => {
        todolitstsAPI.deleteTodolist(todolistID)
            .then(() => {
                dispatch(removeTodolistAC(todolistID))
            })
    }
}

export const changeTodolistTitleTC = (todolistID: string, newTodolistTitle: string): AppThunk => {
    return (dispatch) => {
        todolitstsAPI.updateTodolist(todolistID, newTodolistTitle)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle))
            })
    }
}