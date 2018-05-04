const label_data_en = {
    customer_label: 'Customer',
    customer_po_label: 'Customer PO',
    po_label: 'Internal PO',
    model_no_label: 'Model #',
    customer_part_no_label: 'Customer Part #',
    qty_label: 'Qty',
    unit_price_label: 'Unit Price',
    arrival_date_label: 'Approved On',
    outstanding_label: 'Outstanding',
    pending_label: 'Pending',
    delivery_label: 'Delivery',
    remarks_label: 'Remarks',
    add_label: 'Add',
    production_orders_label: 'Production Orders',
    sample_orders_label: 'Sample Orders',
    production_label: 'Production',
    sample_label: 'Sample',
    completed_label: 'Completed',
    cancelled_label: 'Cancelled',
    all_label: 'All',
    date_range_label: 'Date Range',
    quantity_label: 'Quantity',
    batch_label: 'Batch',
    remainder_cancelled_label: 'Remaining Items Cancelled',
    deliveries_label: 'Deliveries',
    date_label: 'Date',
    done_label: 'Done',
    cancel_label: 'Cancel',
    delete_label: 'Delete',
    undo_label: 'Undo',
    edit_label: 'Edit',
}

const label_data_cn = {
    customer_label: '客户',
    customer_po_label: '客户订单编号',
    po_label: '内部订单号码',
    model_no_label: '机种号码',
    customer_part_no_label: '客户机种号码',
    qty_label: '数量',
    unit_price_label: '单价',
    arrival_date_label: 'Approved On',
    outstanding_label: '未完成订单',
    pending_label: '等待',
    delivery_label: '交货',
    remarks_label: 'Remarks',
    add_label: 'Add',
    production_orders_label: '生产订单',
    sample_orders_label: '样品订单',
    production_label: '生产订单',
    sample_label: '样品订单',
    completed_label: '已完成订单',
    cancelled_label: 'Cancelled',
    all_label: '所有订单',
    date_range_label: 'Date Range',
    quantity_label: '数量',
    batch_label: '批次号码',
    remainder_cancelled_label: 'Remaining Items Cancelled',
    deliveries_label: 'Deliveries',
    date_label: 'Date',
    done_label: 'Done',
    cancel_label: 'Cancel',
    delete_label: 'Delete',
    undo_label: 'Undo',
    edit_label: 'Edit',
}

class Labels {
    static lang = 'en'

    static set language(lang) {
        this.lang = lang
        console.log('Set to: ' + this.lang)
    }

    static getLabel(key) {
        if (this.lang === 'cn') {
            return label_data_cn[key]

        }
        return label_data_en[key]
    }
}

export default Labels