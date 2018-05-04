import { SET_FILTERS } from '../types/Filter'
import { UPDATE_ORDER_TYPE } from '../types/Order'

const filters = (state = {}, action) => {
    switch (action.type) {
        case SET_FILTERS:
            return action.filters
        case UPDATE_ORDER_TYPE:
            return { ...state, ...{ orderType: action.orderType } }
        default:
            return state
    }
}

export default filters