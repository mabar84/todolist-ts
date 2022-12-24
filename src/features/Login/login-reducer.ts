import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState: InitialStateType = {}

export const loginReducer = (state: InitialStateType = {}, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // case 'REMOVE-TASK':
        //     return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        default:
            return state
    }
}

// action-creators
// export const removeTaskAC = (todolistId: string, taskId: string) => (
//     {type: 'REMOVE-TASK', todolistId, taskId} as const)

// thunk-creators
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                alert('YO')
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
type ActionsType = any
type InitialStateType = {}