import App from './App';
import {Provider} from 'react-redux';
import {AppRootState, store} from './store';
import {TodolistDomainType} from '../features/TodolistsList/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';
import {ProviderDecorator} from '../stories/ProviderDecorator';

export default {
    title: 'App Component',
    component: App,
    decorators: [ProviderDecorator]
}

export const AppBaseExample = (props: any) => {
    return <Provider store={store}>
        <App demo={false}/>
    </Provider>
    // return (<App demo={false}/>)
}