import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';

export default {
    title: 'App Component',
    component: App,
    // decorators: [ProviderDecorator]
}

export const AppBaseExample = (props: any) => {
    return <Provider store={store}>
        <App demo={false}/>
    </Provider>
    // return (<App demo={false}/>)
}