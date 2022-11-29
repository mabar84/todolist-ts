import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {TasksStateType} from '../AppWithRedux';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC({id: 'bla', title: 'blabla', order: 0, addedDate: ''})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id = 'bla')
})