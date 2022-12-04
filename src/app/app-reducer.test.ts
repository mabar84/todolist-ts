import {appReducer, appSetErrorAC, InitialStateType} from './app-reducer';

const startState: InitialStateType = {
    status: 'idle',
    error: 'some errorrrrrr'
}

test('correct error message should be set', () => {
    const endState = appReducer(startState, appSetErrorAC('blabla'))

    expect(endState.error).toBe('blabla')
})