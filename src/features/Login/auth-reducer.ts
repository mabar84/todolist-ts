import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {removeTaskAC} from '../TodolistsList/tasks-reducer';

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = {isLoggedIn: false}, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

// action-creators
export const setIsloggedInAC = (isLoggedIn: boolean) => (
    {type: 'LOGIN/IS-LOGGED-IN', isLoggedIn} as const)

// thunk-creators
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsloggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType =
    | ReturnType<typeof setIsloggedInAC>

type InitialStateType = { isLoggedIn: boolean }