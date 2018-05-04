import { DELETE_ORDER, EDIT_ORDER, NEW_ORDER, UNDELETE_ORDER, UPDATE_CURRENT_ORDER } from '../types/Order';

const orders = (state = [], action) => {
    switch (action.type) {
        case DELETE_ORDER: {
            return state.filter(o => !o.deleted).map(o => {
                if (o.id === action.id) {
                    return { ...o, ...{ deleted: true } };
                }
                return o;
            });
        }
        case EDIT_ORDER: {
            return [...state.filter(o => !o.deleted)];
        }
        case NEW_ORDER: {
            return [...state.filter(o => !o.deleted)];
        }
        case UNDELETE_ORDER: {
            return state.map(o => {
                if (o.id === action.id) {
                    return { ...o, ...{ deleted: false } };
                }
                return o;
            });
        }
        case UPDATE_CURRENT_ORDER: {
            const order = action.order;

            let newOrder = true;
            let orders = state.map(o => {
                if (o.id === order.id) {
                    newOrder = false;
                    return order;
                }
                return o;
            });
            if (newOrder) {
                orders = [...orders, order];
            }

            return orders;
        }
        default: {
            return state
        }
    }
}

export default orders