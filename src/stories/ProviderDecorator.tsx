import React from 'react';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {AppRootState} from '../app/store';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';
import App from '../app/App';
import {Provider} from 'react-redux';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {appReducer} from '../app/app-reducer';

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

const initState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'}
    ],
    tasks: {
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
    },
    app: {
        status: 'idle',
        error: null
    }
}

const store = createStore(rootReducer, initState, applyMiddleware(thunkMiddleware))

export const ProviderDecorator = (storyFn: any) => (
    <Provider store={store}>
        {storyFn}
        // </Provider>
)