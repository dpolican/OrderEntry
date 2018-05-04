import { UPDATE_ORDER_TYPE } from '../types/Order'

export const setOrderType = orderType => ({
    type: UPDATE_ORDER_TYPE,
    orderType
})