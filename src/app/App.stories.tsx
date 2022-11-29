import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';

export default {
    title: 'App Component',
    component: App
}

export const AppBaseExample = () => {
    return <Provider store={store}> <App/> </Provider>
}