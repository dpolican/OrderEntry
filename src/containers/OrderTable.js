import { connect } from 'react-redux'

import Order from '../model/Order'
import { updateCurrentOrder, cancelEditOfCurrentOrder, deleteOrder, newOrder, editOrder, undeleteOrder } from '../actions/CurrentOrder'
import DataGrid from '../components/DataGrid'

const mapStateToProps = state => {

    const { company, status, fromDate, toDate, orderType } = state.filters;
    const orders = state.orders.filter(o => {
        const latestDeliveryDate = Order.getLatestDeliveryDate(o.deliveries);
        return o.type === orderType
            && o.company === company
            && (status === 'all'
                || Order.calculateStatus(o) === status)
            && (!fromDate
                || !latestDeliveryDate
                || fromDate.localeCompare(latestDeliveryDate) <= 0)
            && (!toDate
                || !latestDeliveryDate
                || toDate.localeCompare(latestDeliveryDate) >= 0);
    });
    const { customers } = state.companies.find(c => c.key === company)

    return {
        company,
        orderType,
        orders,
        customers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSave: currentOrder => {
            dispatch(updateCurrentOrder(currentOrder))
        },
        onCancel: currentOrder => {
            dispatch(cancelEditOfCurrentOrder(currentOrder))
        },
        onAddOrder: order => {
            dispatch(newOrder(order))
        },
        onEditOrder: order => {
            dispatch(editOrder(order))
        },
        onDeleteOrder: id => {
            dispatch(deleteOrder(id))
        },
        onUndeleteOrder: id => {
            dispatch(undeleteOrder(id))
        }
    }
}

const OrderTable = connect(mapStateToProps, mapDispatchToProps)(DataGrid)

export default OrderTable