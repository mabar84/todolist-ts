import {authAPI} from '../api/todolists-api';
import {AppThunk} from './store';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setIsloggedInAC} from '../features/Login/auth-reducer';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setAppInitializedAC} = slice.actions

// thunk-creators
export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsloggedInAC({isLoggedIn: true}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppInitializedAC({isInitialized: true}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export type InitialStateType = {
    error: string | null,
    status: RequestStatusType,
    // true when application initialized
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'