import { combineReducers } from 'redux'
import filters from './Filters'
import statuses from './Statuses'
import orderTypes from './OrderTypes'
import companies from './Companies'
import orders from './Orders'
import currentOrder from './CurrentOrder'

export default combineReducers({
    filters,
    statuses,
    orderTypes,
    companies,
    orders,
    currentOrder,
})