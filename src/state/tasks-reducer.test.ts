import {TasksStateType} from '../AppWithRedux';
import {addTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

const startState: TasksStateType = {
    'todolistId1': [
        {
            id: '1',
            title: 'CSS',
            status: TaskStatuses.New,
            todoListId: 'todolistId1',
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: '2', title: 'JS', status: TaskStatuses.Completed,
            todoListId: 'todolistId1',
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: '3', title: 'React', status: TaskStatuses.New,
            todoListId: 'todolistId1',
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }
    ],
    'todolistId2': [
        {
            id: '1', title: 'bread', status: TaskStatuses.New,
            todoListId: 'todolistId2',
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: '2', title: 'milk', status: TaskStatuses.Completed,
            todoListId: 'todolistId2',
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: '3', title: 'tea', status: TaskStatuses.New,
            todoListId: 'todolistId2',
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }
    ]
}

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBe(true)
    expect(endState['todolistId2'][0].id).toBe('1')
    expect(endState['todolistId2'][1].id).toBe('3')
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC(
        {
            id: 'bla',
            todoListId: 'todolistId2',
            title: 'juce',
            addedDate: '',
            status: TaskStatuses.New,
            description: '',
            startDate: '',
            deadline: '',
            order: 0,
            priority: 0,
        }
    )
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(0)
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({id: 'todolistId3', title: 'title no matter', order: 0, addedDate: ''})
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    expect(endState['todolistId2']).toBeUndefined()
})