import {TodolistType, todolitstsAPI} from '../api/todolists-api';
import {AppThunk} from './store';

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

//action-creators
export const removeTodolistAC = (id: string) => (
    {type: 'REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (title: string, todolistId: string) => (
    {type: 'ADD-TODOLIST', title, todolistId} as const)

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => (
    {type: 'CHANGE-TODOLIST-TITLE', todolistId, newTodolistTitle} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => (
    {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>) => (
    {type: 'SET-TODOLISTS', todolists} as const)

//thunk-creators
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