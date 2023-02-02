import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsloggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const {setIsloggedInAC} = slice.actions

//     (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//
//     switch (action.type) {
//         case 'LOGIN/IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.isLoggedIn}
//         default:
//             return state
//     }
// }

// action-creators
// export const setIsloggedInAC = (isLoggedIn: boolean) => (
//     {type: 'LOGIN/IS-LOGGED-IN', isLoggedIn} as const)

// thunk-creators
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsloggedInAC({isLoggedIn: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsloggedInAC({isLoggedIn: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))

            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
// type ActionsType =
//     | ReturnType<typeof setIsloggedInAC>

// type InitialStateType = { isLoggedIn: boolean }