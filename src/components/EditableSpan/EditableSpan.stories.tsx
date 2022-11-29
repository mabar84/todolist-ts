import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const changeCallback = action('Value changed')

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan title={'Start value'} onChange={changeCallback}/>
}