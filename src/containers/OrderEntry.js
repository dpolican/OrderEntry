import { connect } from 'react-redux'

import OrderForm from '../components/OrderForm'
import { updateCurrentOrder, cancelEditOfCurrentOrder} from '../actions/CurrentOrder'

const mapStateToProps = state => {
    return {
        orderTypes: state.orderTypes,
        order: state.currentOrder,
        customers: state.customers,
        companies: state.companies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSave: currentOrder => {
            dispatch(updateCurrentOrder(currentOrder))
        },
        onCancel: () => {
            dispatch(cancelEditOfCurrentOrder())
        }
    }
}

const OrderEntry = connect(mapStateToProps, mapDispatchToProps)(OrderForm)

export default OrderEntry