import shortid from 'shortid';
import moment from 'moment';
import _ from 'underscore';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Divider, Dropdown, Form, Icon, Input, Modal, Popup, Table } from 'semantic-ui-react';

import Order from '../model/Order'
import Labels from '../services/Labels'

const inlineStyle = {
    modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

const getSortedDeliveries = (order) => {
    if (order && order.deliveries) {
        return _.sortBy(order.deliveries, (d) => d.date);
    }
    return [];
}

class OrderForm extends Component {

    state = { ...Order.buildBlankOrder(), ...this.props.order, ...{ deliveries: getSortedDeliveries(this.props.order) } };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.order) {
            return { ...Order.buildBlankOrder(), ...nextProps.order, ...{ deliveries: getSortedDeliveries(nextProps.order) } };
        }
        return null;
    }

    buildDeliveryActionButtons(delivery) {
        if (delivery.date) {
            if (delivery.deleted) {
                return (
                    <Popup
                        content={Labels.getLabel('undo_label')}
                        trigger={
                            <Button
                                compact
                                size="mini"
                                color="teal"
                                icon="undo"
                                onClick={this.onUndeleteDelivery(delivery.id)}
                            />
                        }
                    />
                );
            } else {
                return (
                    <Popup
                        content={Labels.getLabel('delete_label')}
                        trigger={
                            <Button
                                compact
                                size="mini"
                                color="red"
                                icon="remove"
                                onClick={this.onDeleteDelivery(delivery.id)}
                            />
                        }
                    />
                );
            }
        }
        return (<span />);
    }

    ensureDeliveryRowForPendingQuantity = (totalQty, deliveries) => {
        const pendingQuantity = Order.calculatePendingQuantity(totalQty, deliveries);
        if (pendingQuantity === 0) {
            return deliveries.filter(d => d.date);
        } else {
            var missingRowForPendingQuantity = true;
            var result = deliveries.map(d => {
                if (!d.date) {
                    missingRowForPendingQuantity = false;
                    return { ...d, ...{ qty: pendingQuantity } };
                }
                return d;
            });
            if (missingRowForPendingQuantity) {
                result.push({ id: shortid.generate(), qty: pendingQuantity });
            }
            return result;
        }
    }

    onChangeType = (event, { name }) => {
        this.setState({ type: name });
    }

    onChangeCustomer = (event, { value }) => {
        this.setState({ cust: value });
    }

    onChangeCustomerPO = (event, { value }) => {
        this.setState({ custPo: value });
    }

    onChangePO = (event, { value }) => {
        this.setState({ po: value });
    }

    onChangeCustomerPartNo = (event, { value }) => {
        const customer = this.props.customers.find(c => c.name === this.state.cust);
        if (customer) {
            const part = customer.parts.find(p => p.partNo === value);
            if (part) {
                const modelNo = part.modelNo;
                this.setState({ custPartNo: value, modelNo });
                return;
            }
        }
        this.setState({ custPartNo: value });
    }

    onChangeModelNo = (event, { value }) => {
        const customer = this.props.customers.find(c => c.name === this.state.cust);
        if (customer) {
            const part = customer.parts.find(p => p.modelNo === value);
            if (part) {
                const custPartNo = part.partNo;
                this.setState({ custPartNo, modelNo: value });
                return;
            }
        }
        this.setState({ modelNo: value });
    }

    onChangeQuantity = (event, { value }) => {
        if (this.state.deliveries.find(d => d.date && !d.deleted)) {
            // Quantity cannot be changed once delivery starts.
        } else {
            var deliveries = this.state.deliveries.filter(d => !d.deleted);
            deliveries = this.ensureDeliveryRowForPendingQuantity(value, deliveries);
            this.setState({ qty: value, deliveries })
        }
    }

    onChangeApprovalDate = (event, { value }) => {
        this.setState({ approvalDate: value });
    }

    onChangeUnitPrice = (event, { value }) => {
        this.setState({ unitPrice: value });
    }

    onChangeRemarks = (event, { value }) => {
        this.setState({ remarks: value });
    }

    onSaveChanges = (event) => {
        var deliveries = this.state.deliveries.filter(d => !d.deleted);
        this.props.onSave({ ...this.state, ...{ deliveries } });
    }

    onCancelChanges = (event) => {
        this.props.onCancel({ ...this.state });
    }

    onDeleteDelivery = (id) => {
        return (event) => {
            var deliveries = this.state.deliveries.filter(d => !d.deleted).map(d => {
                if (d.id === id) {
                    return { ...d, ...{ deleted: true } }
                }
                return d;
            })
            deliveries = this.ensureDeliveryRowForPendingQuantity(this.state.qty, deliveries);
            this.setState({ deliveries });
        }
    }

    onUndeleteDelivery = (id) => {
        return (event) => {
            var deliveries = this.state.deliveries.map(d => {
                if (d.id === id) {
                    return { ...d, ...{ deleted: false } }
                }
                return d;
            })
            deliveries = this.ensureDeliveryRowForPendingQuantity(this.state.qty, deliveries);
            this.setState({ deliveries });
        }
    }

    onChangeDeliveryDate = (id) => {
        return (event, { value }) => {
            var deliveries = this.state.deliveries.filter(d => !d.deleted).map(d => {
                if (d.id === id) {
                    return { ...d, ...{ date: value } };
                }
                return d;
            });
            this.setState({ deliveries });
        }
    }

    onChangeDeliveryQuantity = (id) => {
        return (event, { value }) => {
            const qty = parseInt(value);

            var deliveries = this.state.deliveries.filter(d => !d.deleted);
            var outstandingQuantity = Order.calculatePendingQuantity(this.state.qty, deliveries);
            deliveries = deliveries.map(d => {
                if (d.id === id) {
                    const diff = qty - d.qty;

                    if (diff <= outstandingQuantity) {
                        outstandingQuantity -= diff;
                        return { ...d, ...{ qty } };
                    }
                }
                return d;
            });
            deliveries = this.ensureDeliveryRowForPendingQuantity(this.state.qty, deliveries);
            this.setState({ deliveries });
        }
    }

    onChangeCancelled = (event, { checked }) => {
        var deliveries = this.state.deliveries.filter(d => !d.deleted);
        this.setState({ cancelled: checked, deliveries })
    }

    onChangeDeliveryBatch = (id) => {
        return (event, { value }) => {
            var deliveries = this.state.deliveries.filter(d => !d.deleted).map(d => {
                if (d.id === id) {
                    return { ...d, ...{ batch: value } };
                }
                return d;
            });
            this.setState({ deliveries });
        }
    }

    onSortDeliveriesByDate = event => {
        
        this.setState({
            deliveries: _.sortBy(this.state.deliveries, (d) => d.date)
        });
    }

    buildCustPartsList = (customers) => {
        var customer = customers.find(c => c.name === this.state.cust);
        if (customer) {
            return customer.parts.map(p => <option key={p.partNo} value={p.partNo} />)
        }
        return null;
    }

    buildModelNoList = (customers) => {
        var customer = customers.find(c => c.name === this.state.cust);
        if (customer) {
            return customer.parts.map(p => <option key={p.modelNo} value={p.modelNo} />)
        }
        return null;
    }

    render() {

        return (
            <Modal
                compact="very"
                dimmer="inverted"
                size="small"
                open={!!this.props.order}
                style={inlineStyle.modal}
            >
                <Modal.Header>
                    <Dropdown
                        compact
                        button
                        className='icon'
                        floating
                        labeled
                        icon='building outline'
                        placeholder="Select the company"
                        value={this.state.company}
                        options={this.props.companies}
                        onChange={this.onChangeCompany} />
                    Order
                    <Button.Group floated="right">{
                        this.props.orderTypes.map((type) =>
                            <Button
                                compact
                                size="tiny"
                                key={type.key}
                                name={type.key}
                                content={type.name}
                                secondary={this.state.type === type.key}
                                onClick={this.onChangeType}
                            ></Button>
                        )
                    }</Button.Group>
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>{Labels.getLabel('customer_label')}</label>
                            <Input list="customers" value={this.state.cust} onChange={this.onChangeCustomer} />
                            <datalist id="customers">{ 
                                this.props.customers.map(c => <option value={c.name} key={c.name} />)
                            }</datalist>
                        </Form.Field>
                        <Form.Group>
                            <Form.Input width="8" label="Customer PO" value={this.state.custPo} onChange={this.onChangeCustomerPO} />
                            <Form.Input width="8" label="PO" value={this.state.po} onChange={this.onChangePO} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width="8">
                                <label>{Labels.getLabel('customer_part_no_label')}</label>
                                <Input list="custParts" value={this.state.custPartNo} onChange={this.onChangeCustomerPartNo} />
                                <datalist id="custParts">{ this.buildCustPartsList(this.props.customers) }</datalist>
                            </Form.Field>
                            <Form.Field width="8">
                                <label>{Labels.getLabel('model_no_label')}</label>
                                <Input list="modelNo" value={this.state.modelNo} onChange={this.onChangeModelNo} />
                                <datalist id="modelNo">{ this.buildModelNoList(this.props.customers) }</datalist>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input width="8" label="Quantity" type="number" value={this.state.qty} onChange={this.onChangeQuantity} />
                            {
                                this.state.type === Order.TYPE_PRODUCTION
                                ? <Form.Input 
                                    width="8" 
                                    label="Unit Price" 
                                    type="number" 
                                    value={this.state.unitPrice} 
                                    onChange={this.onChangeUnitPrice} />
                                : <Form.Input
                                    width="8"
                                    label="Approval Date" 
                                    type="date" 
                                    value={this.state.approvalDate} 
                                    onChange={this.onChangeApprovalDate} />
                            }
                        </Form.Group>
                        <Form.TextArea label="Remarks" value={this.state.remarks} onChange={this.onChangeRemarks} />
                    </Form>
                    <Divider horizontal>{Labels.getLabel('deliveries_label')}</Divider>
                    <Table singleLine compact="very" sortable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted="ascending"
                                    onClick={this.onSortDeliveriesByDate}>{Labels.getLabel('date_label')}</Table.HeaderCell>
                                <Table.HeaderCell>{Labels.getLabel('quantity_label')}</Table.HeaderCell>
                                <Table.HeaderCell>{Labels.getLabel('batch_label')}</Table.HeaderCell>
                                <Table.HeaderCell> </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                this.state.deliveries.map((delivery) => {
                                    const deliveryDate = delivery.date ? moment(delivery.date).format('l') : '';
                                    return (
                                        <Table.Row key={delivery.id}>
                                            <Table.Cell disabled={delivery.deleted}>
                                                <Input
                                                    disabled={this.state.cancelled || delivery.deleted}
                                                    transparent
                                                    type="date"
                                                    value={delivery.date}
                                                    onChange={this.onChangeDeliveryDate(delivery.id)}
                                                    />
                                            </Table.Cell>
                                            <Table.Cell disabled={delivery.deleted}>{
                                                this.state.cancelled || delivery.deleted
                                                    ? <del>{delivery.qty}</del>
                                                    : <Input
                                                        transparent
                                                        type="number"
                                                        value={delivery.qty}
                                                        onChange={this.onChangeDeliveryQuantity(delivery.id)}
                                                    />
                                            }</Table.Cell>
                                            <Table.Cell disabled={delivery.deleted}>{
                                                this.state.cancelled || delivery.deleted
                                                    ? delivery.batch
                                                    : (delivery.deleted
                                                        ? <del>{delivery.batch}</del>
                                                        : <Input
                                                            transparent
                                                            value={delivery.batch}
                                                            onChange={this.onChangeDeliveryBatch(delivery.id)}
                                                        />
                                                    )
                                            }</Table.Cell>
                                            <Table.Cell>{this.state.cancelled ? '' : this.buildDeliveryActionButtons(delivery)}</Table.Cell>
                                        </Table.Row>);
                                })
                            }
                            <Table.Row>
                                <Table.Cell>
                                    <Checkbox
                                        label={Labels.getLabel('remainder_cancelled_label')}
                                        disabled={Order.calculatePendingQuantity(this.state.qty, this.state.deliveries) === 0}
                                        checked={this.state.cancelled}
                                        onChange={this.onChangeCancelled} />
                                </Table.Cell>
                                <Table.Cell> </Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={this.onCancelChanges}><Icon name="remove" />{Labels.getLabel('cancel_label')}</Button>
                    <Button primary onClick={this.onSaveChanges}><Icon name="checkmark" />{Labels.getLabel('done_label')}</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

OrderForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    order: PropTypes.object,
    customers: PropTypes.array,
    orderTypes: PropTypes.array.isRequired,
};

OrderForm.defaultProps = {
    customers: []
};


export default OrderForm;