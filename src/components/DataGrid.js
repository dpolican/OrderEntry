import shortid from 'shortid';
import moment from 'moment';
import _ from 'underscore';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Input, Popup, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Order from '../model/Order'
import Labels from '../services/Labels'

const sortBy = (orders, column, direction) => {
    let iteratee = column;
    if (column === 'pending') {
        iteratee = o => Order.calculatePendingQuantity(o.qty, o.deliveries);
    } else if (column === 'latestDeliveryDate') {
        iteratee = o => Order.getLatestDeliveryDate(o.deliveries);
    }
    const result = _.sortBy(orders, iteratee)

    return (direction === 'ascending') ? result : result.reverse();
}

class DataGrid extends Component {
    state = {
        sort: {},
    }

    onEditOrder = (id) => {
        return (event) => {
            const orderToEdit = this.props.orders.find(o => o.id === id);
            this.props.onEditOrder(orderToEdit);
        }
    }

    onDeleteOrder = (id) => {
        return (event) => {
            this.props.onDeleteOrder(id);
        }
    }

    onUndeleteOrder = (id) => {
        return (event) => {
            this.props.onUndeleteOrder(id);
        }
    }

    onAddOrder = (event) => {
        var newOrder = {
            ...Order.buildBlankOrder(), ...{
                id: shortid.generate(),
                company: this.props.company,
                type: this.props.orderType
            }
        }
        this.props.onAddOrder(newOrder);
    }

    onSortOrders = clickedColumn => () => {
        const { orders } = this.props
        const { sort } = this.state

        if (sort.column !== clickedColumn) {
            this.setState({ sort: { column: clickedColumn, direction: 'ascending' } })
        } else {
            this.setState({ sort: { ...sort, ...{ direction: sort.direction === 'ascending' ? 'descending' : 'ascending' } } })
        }
    }


    render() {
        const { sort } = this.state;
        return (
            <div style={{ margin: '6px' }}>
                <Table compact="very" sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={sort.column === 'cust' ? sort.direction : null}
                                onClick={this.onSortOrders('cust')}
                                width={2}
                            >{ Labels.getLabel('customer_label') }</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sort.column === 'custPo' ? sort.direction : null}
                                onClick={this.onSortOrders('custPo')}
                                width={2}
                            >{ Labels.getLabel('customer_po_label') }</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sort.column === 'po' ? sort.direction : null}
                                onClick={this.onSortOrders('po')}
                                width={2}
                            >{ Labels.getLabel('po_label') }</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sort.column === 'modelNo' ? sort.direction : null}
                                onClick={this.onSortOrders('modelNo')}
                                width={2}
                            >{ Labels.getLabel('model_no_label') }</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sort.column === 'custPartNo' ? sort.direction : null}
                                onClick={this.onSortOrders('custPartNo')}
                                width={2}
                            >{ Labels.getLabel('customer_part_no_label') }</Table.HeaderCell>
                            <Table.HeaderCell
                                textAlign="right"
                                sorted={sort.column === 'qty' ? sort.direction : null}
                                onClick={this.onSortOrders('qty')}
                            >{ Labels.getLabel('qty_label') }</Table.HeaderCell>
                            <Table.HeaderCell
                                style={this.props.orderType !== 'production' ? { display: 'none' } : {}}
                                textAlign="right"
                                sorted={sort.column === 'unitPrice' ? sort.direction : null}
                                onClick={this.onSortOrders('unitPrice')}
                                width={1}
                            >{ Labels.getLabel('unit_price_label') }</Table.HeaderCell>
                            <Table.HeaderCell
                                style={this.props.orderType !== 'sample' ? { display: 'none' } : {}}
                                textAlign="right"
                                sorted={sort.column === 'approvalDate' ? sort.direction : null}
                                onClick={this.onSortOrders('approvalDate')}
                            >{ Labels.getLabel('arrival_date_label') }</Table.HeaderCell>
                            <Table.HeaderCell
                                textAlign="right"
                                sorted={sort.column === 'pending' ? sort.direction : null}
                                onClick={this.onSortOrders('pending')}
                                width={1}
                            >{ Labels.getLabel('pending_label') }</Table.HeaderCell>
                            <Table.HeaderCell
                                textAlign="right"
                                sorted={sort.column === 'latestDeliveryDate' ? sort.direction : null}
                                onClick={this.onSortOrders('latestDeliveryDate')}
                                width={1}
                            >{ Labels.getLabel('delivery_label') }</Table.HeaderCell>
                            <Table.HeaderCell width={2}>{ Labels.getLabel('remarks_label') }</Table.HeaderCell>
                            <Table.HeaderCell width={1}><Popup content="Add Order" basic trigger={
                                <Button
                                    compact
                                    size="tiny"
                                    icon
                                    color="green"
                                    onClick={this.onAddOrder} ><Icon name='signup' /> { Labels.getLabel('add_label') }</Button>
                            } /></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>{
                        sortBy(this.props.orders, sort.column, sort.direction).map(order => {
                            const pendingQuantity = Order.calculatePendingQuantity(order.qty, order.deliveries) || '';
                            const latestDeliveryDate = Order.getLatestDeliveryDate(order.deliveries);

                            return (
                                <Table.Row key={order.id}>
                                    <Table.Cell disabled={order.deleted}>{order.cust}</Table.Cell>
                                    <Table.Cell disabled={order.deleted}>{order.custPo}</Table.Cell>
                                    <Table.Cell disabled={order.deleted}>{order.po}</Table.Cell>
                                    <Table.Cell disabled={order.deleted}>{order.modelNo}</Table.Cell>
                                    <Table.Cell disabled={order.deleted}>{order.custPartNo}</Table.Cell>
                                    <Table.Cell disabled={order.deleted} textAlign="right">{order.qty}</Table.Cell>
                                    <Table.Cell
                                        disabled={order.deleted}
                                        style={this.props.orderType !== 'production' ? { display: 'none' } : {}}
                                        textAlign="right"
                                    >{order.unitPrice}</Table.Cell>
                                    <Table.Cell
                                        disabled={order.deleted}
                                        style={this.props.orderType !== 'sample' ? { display: 'none' } : {}}
                                        textAlign="right"
                                    >{order.approvalDate ? moment(order.approvalDate).format('l') : ''}</Table.Cell>
                                    <Table.Cell disabled={order.deleted} textAlign="right">{
                                        order.cancelled
                                            ? <del>{pendingQuantity}</del>
                                            : pendingQuantity
                                    }</Table.Cell>
                                    <Table.Cell
                                        textAlign="right"
                                        disabled={order.deleted}
                                    >{latestDeliveryDate ? moment(latestDeliveryDate).format('l') : ''}</Table.Cell>
                                    <Table.Cell disabled={order.deleted}>{order.remarks}</Table.Cell>
                                    <Table.Cell>{
                                        order.deleted
                                            ? <Popup content={Labels.getLabel('undo_label')} basic trigger={
                                                <Button
                                                    compact
                                                    size="mini"
                                                    icon="undo"
                                                    color="teal"
                                                    onClick={this.onUndeleteOrder(order.id)} />
                                            } />
                                            : <span><Popup content={Labels.getLabel('edit_label')} basic trigger={
                                                <Button
                                                    compact
                                                    size="mini"
                                                    icon="pencil"
                                                    color="blue"
                                                    onClick={this.onEditOrder(order.id)} />
                                            } />
                                                <Popup content={Labels.getLabel('delete_label')} basic trigger={
                                                    <Button
                                                        compact
                                                        size="mini"
                                                        icon="remove"
                                                        color="red"
                                                        onClick={this.onDeleteOrder(order.id)} />
                                                } /></span>
                                    }</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }</Table.Body>
                </Table>
            </div>
        )
    }
}

DataGrid.propTypes = {
    company: PropTypes.string.isRequired,
    orderType: PropTypes.string.isRequired,
    orders: PropTypes.array.isRequired,
    customers: PropTypes.array.isRequired,
    onAddOrder: PropTypes.func.isRequired,
    onEditOrder: PropTypes.func.isRequired,
    onDeleteOrder: PropTypes.func.isRequired,
    onUndeleteOrder: PropTypes.func.isRequired,
};

export default DataGrid;