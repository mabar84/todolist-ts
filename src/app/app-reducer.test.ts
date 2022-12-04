import {appReducer, appSetErrorAC, appSetStatusAC, InitialStateType} from './app-reducer';

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: 'some errorrrrrr'
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, appSetErrorAC('blabla'))

    expect(endState.error).toBe('blabla')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, appSetStatusAC('loading'))

    expect(endState.status).toBe('loading')
})