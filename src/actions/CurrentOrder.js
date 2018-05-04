import {
    CANCEL_CURRENT_ORDER,
    DELETE_ORDER,
    EDIT_ORDER,
    NEW_ORDER,
    UNDELETE_ORDER,
    UPDATE_CURRENT_ORDER
} from '../types/Order'

export const cancelEditOfCurrentOrder = () => ({
    type: CANCEL_CURRENT_ORDER
})

export const deleteOrder = id => ({
    type: DELETE_ORDER,
    id
})
export const editOrder = order => ({
    type: EDIT_ORDER,
    order
})

export const newOrder = order => ({
    type: NEW_ORDER,
    order
})

export const undeleteOrder = id => ({
    type: UNDELETE_ORDER,
    id
})

export const updateCurrentOrder = order => ({
    type: UPDATE_CURRENT_ORDER,
    order
})
