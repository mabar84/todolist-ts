import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {tasksReducer} from './tasks-reducer';
import {RequestStatusType} from '../../app/app-reducer';

let todolistId1 = v1()
let todolistId2 = v1()
let newTodolistTitle = 'NewTitle'

const startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
    {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'}
]

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const endState = todolistsReducer(startState,
        addTodolistAC({todolist: {id: 'bla', title: 'blabla', order: 0, addedDate: ''}}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('blabla')
    expect(endState[0].filter).toBe('all')
    expect(endState[0].id).toBeDefined()
})

test('correct todolist should change its name', () => {
    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title: newTodolistTitle}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should should be changed', () => {
    let newFilter: FilterValuesType = 'completed'
    const action = changeTodolistFilterAC({id: todolistId2, filter: newFilter})
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('correct todolistEntityStatus should should be changed', () => {
    let newStatus: RequestStatusType = 'loading'
    const action = changeTodolistEntityStatusAC({id: todolistId2, entityStatus: newStatus})
    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})

test('todolists should be set to the state', () => {
    const action = setTodolistsAC({todolists: startState})
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC({todolists: startState})
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState[todolistId1]).toEqual([])
    expect(endState[todolistId2]).toEqual([])
})