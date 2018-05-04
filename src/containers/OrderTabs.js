import { connect } from 'react-redux'

import { Tab } from 'semantic-ui-react'

import Order from '../model/Order'
import Labels from '../services/Labels'
import { setOrderType } from '../actions/OrderType'

const mapStateToProps = state => {
    return {
        panes:  [
            { menuItem: Labels.getLabel('production_orders_label'), render: () => '' },
            { menuItem: Labels.getLabel('sample_orders_label') , render: () => '' },
        ]     
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTabChange: (event, { activeIndex }) => {
            dispatch(setOrderType(activeIndex == 0 ? Order.TYPE_PRODUCTION : Order.TYPE_SAMPLE));
        }
    }
}

const OrderTabs = connect(mapStateToProps, mapDispatchToProps)(Tab)

export default OrderTabs