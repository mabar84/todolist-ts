import {appReducer, setAppErrorAC, setAppStatusAC, InitialStateType} from './app-reducer';

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: 'some errorrrrrr',
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('blabla'))

    expect(endState.error).toBe('blabla')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})