import {authAPI} from '../api/todolists-api';
import {AppThunk} from './store';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setIsloggedInAC} from '../features/Login/auth-reducer';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// action-creators
export const setAppStatusAC = (status: RequestStatusType) => (
    {type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => (
    {type: 'APP/SET-ERROR', error} as const)
export const setAppInitializedAC = (value: boolean) => (
    {type: 'APP/SET-IS-INITIALIZED', value} as const)

// thunk-creators
export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsloggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppInitializedAC(true))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>

export type InitialStateType = {
    error: string | null,
    status: RequestStatusType,
    // true when application initialized
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'