import { UPDATE_CURRENT_ORDER } from '../types/Order'

const companies = (state = [], action) => {
    switch (action.type) {
        case UPDATE_CURRENT_ORDER:
            const updatedOrder = action.order;

            if (updatedOrder.cust && updatedOrder.custPartNo && updatedOrder.modelNo) {
                const customer = { name: updatedOrder.cust, parts: [{ partNo: updatedOrder.custPartNo, modelNo: updatedOrder.modelNo }] };
                const company = state.find(co => co.key === updatedOrder.company);

                let newCustomer = true;
                let customers = company.customers.map(c => {
                    if (c.name === customer.name) {
                        newCustomer = false;
                        return { name: c.name, parts: [...c.parts.filter(p => p.partNo !== updatedOrder.custPartNo), ...customer.parts] }
                    }
                    return c;
                });
                if (newCustomer) {
                    customers = [...customers, customer];
                }

                const companies = state.map(co => {
                    if (co.key === updatedOrder.company) {
                        return { ...co, ...{ customers } };
                    }
                    return co;
                });

                return companies;
            }
            return state;
        default:
            return state
    }
}

export default companies