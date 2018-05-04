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
            text: 'Guangzhou  Maxtech  Circuit  Co.,  Ltd',
            customers: [{
                name: 'Big Company',
                parts: [{
                    partNo: '930-3795-P4',
                    modelNo: 'ET-AX-150023-E'
                }, {
                    partNo: '4006509-03',
                    modelNo: 'ET-WH-160140-E'
                }, {
                    partNo: '2950047001',
                    modelNo: 'ET-AX-150024-E'
                }]
            }, {
                name: 'Sizeable Company',
                parts: [{
                    partNo: 'GA17890',
                    modelNo: 'ET-GA-170249-E'
                }, {
                    partNo: 'GA17891',
                    modelNo: 'ET-GA-170248-E'
                }, {
                    partNo: 'GA17892',
                    modelNo: 'ET-GA-170247-C'
                }]
            }]
        }, {
            key: 'et',
            value: 'et',
            text: 'Guangzhou  Easy Touch Technology  Co.,  Ltd',
            customers: [{
                name: 'Medium Company',
                parts: [{
                    partNo: '930-3795-P5',
                    modelNo: 'ET-AX-150023-D'
                }, {
                    partNo: '4006509-04',
                    modelNo: 'ET-WH-160140-D'
                }, {
                    partNo: '2950047002',
                    modelNo: 'ET-AX-150024-D'
                }]
            }, {
                name: 'Startup Company',
                parts: [{
                    partNo: 'GA17893',
                    modelNo: 'ET-GA-170249-D'
                }, {
                    partNo: 'GA17894',
                    modelNo: 'ET-GA-170248-D'
                }, {
                    partNo: 'GA17895',
                    modelNo: 'ET-GA-170247-D'
                }]
            }]
        }],
        filters: {
            company: 'mt',
            status: 'outstanding',
            fromDate: '2018-04-01',
            toDate: '2018-04-30',
            orderType: 'production'
        },
        orders: [{
            id: '1',
            company: 'et',
            type: 'production',
            custPo: '57607',
            po: 'ETT0037-2',
            modelNo: 'ET-AX-150023-E',
            custPartNo: '930-3795-P4',
            qty: 100,
            unitPrice: 33.09,
            deliveries: [{
                id: '1',
                batch: 'E201609007',
                qty: 100,
                date: '2017-07-20'
            }]
        }, {
            id: '2',
            company: 'et',
            type: 'production',
            custPo: 'WA22361',
            po: 'ETT0046-4',
            modelNo: 'ET-WH-160140-E',
            custPartNo: '4006509-03',
            qty: 30,
            unitPrice: 30,
            deliveries: [{
                id: '1',
                batch: 'E201703004',
                qty: 30,
                date: '2017-04-24'
            }],
            remarks: '请补PO'
        }, {
            id: '3',
            company: 'et',
            type: 'production',
            custPo: '533233',
            modelNo: 'ET-AX-150023-E',
            custPartNo: '2950047001',
            qty: 105,
            deliveries: [{
                id: '1',
                batch: 'E201703001',
                qty: 105,
                date: '2017-03-29'
            }],
            remarks: '请补PO'
        }, {
            id: '4',
            company: 'et',
            type: 'production',
            custPo: 'GA17890',
            modelNo: 'ET-GA-170249-E',
            custPartNo: 'GA17890',
            qty: 300,
            deliveries: [{
                id: '1',
                batch: 'E201704001',
                date: '2017-05-04',
                qty: 300
            }],
            remarks: '请补PO'
        }, {
            id: '5',
            company: 'et',
            type: 'production',
            custPo: 'GA17890',
            modelNo: 'ET-GA-170249-E',
            custPartNo: 'GA17890',
            qty: 300,
            deliveries: [{
                id: '1',
                batch: 'E201704002',
                qty: 300,
                date: '2017-06-19'
            }]
        }, {
            id: '6',
            company: 'et',
            type: 'production',
            custPo: 'GA17890',
            modelNo: 'ET-GA-170249-E',
            custPartNo: 'GA17890',
            qty: 150,
            deliveries: [{
                id: '1',
                batch: 'E201704003',
                date: '2017-08-17',
                qty: 150
            }]
        }, {
            id: '7',
            company: 'et',
            type: 'production',
            custPo: 'GA17890',
            modelNo: 'ET-GA-170249-E',
            custPartNo: 'GA17890',
            qty: 300,
            deliveries: [{
                id: '1',
                batch: 'E201704004',
                date: '2017-11-20',
                qty: 300
            }]
        }]
    }
)
export default store;
