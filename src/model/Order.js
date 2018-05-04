import moment from 'moment';

const COMPLETED = 'completed',
    OUTSTANDING = 'outstanding',
    CANCELLED = 'cancelled';

const PRODUCTION = 'production',
    SAMPLE = 'sample';

class Order {
    static get TYPE_PRODUCTION() {
        return PRODUCTION;
    }

    static get TYPE_SAMPLE() {
        return SAMPLE;
    }
    
    static get COMPLETED() {
        return COMPLETED;
    }

    static get OUTSTANDING() {
        return OUTSTANDING;
    }

    static get CANCELLED() {
        return CANCELLED;
    }

    static calculateStatus(order) {
        if (order.cancelled) {
            return CANCELLED;
        }
        
        if (this.calculatePendingQuantity(order.qty, order.deliveries) === 0) {
            return COMPLETED;
        }

        return OUTSTANDING;
    }
    
    static calculatePendingQuantity(totalQty, deliveries) {
        if (deliveries) {
            const deliveredQuantity = deliveries.filter(d => !d.deleted).filter(d => d.date).reduce((result, curr) => result + curr.qty, 0);
            return (totalQty - deliveredQuantity);
        }
        return totalQty;
    }

    static getLatestDeliveryDate(deliveries) {
        if (deliveries) {
            const dates = deliveries.filter(d => d.date).map(d => d.date);
            if (dates.length > 0) {
                var latestDate = dates.reduce((prev, curr) => {
                    if (moment(prev).isAfter(curr)) {
                        return prev;
                    } else {
                        return curr;
                    }
                });

                return latestDate;
            }
        }
    }

    static buildBlankOrder() {
        return {
            custPo: '',
            cust: '',
            custPartNo: '',
            modelNo: '',
            po: '',
            qty: '',
            unitPrice: '',
            remarks: '',
            cancelled: false,
            deliveries: []
        }
    }
}

export default Order;