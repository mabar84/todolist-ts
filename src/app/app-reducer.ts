const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

// action-creators
export const appSetStatusAC = (status: AppStatusType) => (
    {type: 'APP/SET-STATUS', status} as const)
export const appSetErrorAC = (error: string | null) => (
    {type: 'APP/SET-ERROR', error} as const)

// types
type ActionsType =
    | ReturnType<typeof appSetStatusAC>
    | ReturnType<typeof appSetErrorAC>

export type InitialStateType = {
    error: string | null,
    status: AppStatusType
}

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'