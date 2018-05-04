import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Input, Menu } from 'semantic-ui-react';

import Labels from '../services/Labels'

class MenuBar extends Component {
    onChangeCompany = (event, { value }) => {
        this.props.onChange({ ...this.props.filters, ...{ company: value } });
    }

    onChangeStatus = (event, { name }) => {
        this.props.onChange({ ...this.props.filters, ...{ status: name } });
    }

    onChangeFromDate = (event, { value }) => {
        if (event.target.validity.valid) {
            this.props.onChange({ ...this.props.filters, ...{ fromDate: value } });
        }
    }

    onChangeToDate = (event, { value }) => {
        if (event.target.validity.valid) {
            this.props.onChange({ ...this.props.filters, ...{ toDate: value } });
        }
    }
    render() {
        return (
            <Menu inverted compact fluid>
                <Menu.Item>
                    <Dropdown
                        fluid
                        button
                        className='icon'
                        floating
                        labeled
                        icon='building outline'
                        placeholder="Select the company"
                        value={this.props.filters.company}
                        options={this.props.companies}
                        onChange={this.onChangeCompany} />
                </Menu.Item>
                <Menu.Item>
                    <div>
                        <Button.Group>
                            {
                                this.props.statuses.map((status) =>
                                    <Button
                                        compact
                                        key={status.key}
                                        name={status.key}
                                        content={status.name}
                                        primary={this.props.filters.status === status.key}
                                        onClick={this.onChangeStatus}
                                    ></Button>
                                )
                            }
                        </Button.Group>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <Input
                        id="fromDate"
                        name="fromDate"
                        label={Labels.getLabel('date_range_label')}
                        type="date"
                        value={this.props.filters.fromDate}
                        onChange={this.onChangeFromDate}
                        action={
                            <Input
                                id="toDate"
                                name="toDate"
                                type="date"
                                value={this.props.filters.toDate}
                                onChange={this.onChangeToDate}
                                style={{ marginLeft: '-2px' }}
                            ></Input>
                        }
                    ></Input>

                </Menu.Item>
            </Menu>
        )
    }
}


MenuBar.propTypes = {
    filters: PropTypes.object.isRequired,
    companies: PropTypes.array.isRequired,
    statuses: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};


export default MenuBar;