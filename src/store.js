import { createStore } from 'redux';
import reducer from './reducers';
import Order from './model/Order';
import Labels from './services/Labels'

const store = createStore(
    reducer,
    {
        statuses: [{
            key: Order.OUTSTANDING,
            name: Labels.getLabel('outstanding_label')
        }, {
            key: Order.COMPLETED,
            name: Labels.getLabel('completed_label')
        }, {
            key: Order.CANCELLED,
            name: Labels.getLabel('cancelled_label')
        }, {
            key: 'all',
            name: Labels.getLabel('all_label')
        }],
        orderTypes: [{
            key: Order.TYPE_PRODUCTION,
            name: Labels.getLabel('production_label')
        }, {
            key: Order.TYPE_SAMPLE,
            name: Labels.getLabel('sample_label')
        }],
        companies: [{
            key: 'mt',
            value: 'mt',
            text: 'Maximum Efficiency Inc.',
            customers: []
        }, {
            key: 'et',
            value: 'et',
            text: 'Easy Use Technology  Co.',
            customers: []
        }],
        filters: {
            company: 'mt',
            status: 'outstanding',
            fromDate: '',
            toDate: '',
            orderType: 'production'
        },
        orders: []
    }
)
export default store;
