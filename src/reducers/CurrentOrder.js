import { CANCEL_CURRENT_ORDER, EDIT_ORDER, NEW_ORDER, UPDATE_CURRENT_ORDER } from '../types/Order'

const currentOrder = (state = null, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_ORDER:
            return null;
        case CANCEL_CURRENT_ORDER:
            return null;
        case NEW_ORDER:
            return action.order;
        case EDIT_ORDER:
            return action.order;
        default:
            return state
    }
}

export default currentOrder