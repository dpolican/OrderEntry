import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';

import AppBar from './AppBar';
import OrderEntry from './OrderEntry';
import OrderTable from './OrderTable';
import OrderTabs from './OrderTabs'
import Labels from '../services/Labels'

class App extends Component {

    componentWillMount () {
        const { lang } = this.props.match.params;
        if (lang) {
            Labels.language = lang;
        } else {
            Labels.language = 'en';
        }
    }
    render() {
        return (
            <div style={{ margin: '2px' }}>
                <AppBar />
                <div style={{ height: '4px' }}></div>
                <OrderTabs />
                <OrderTable />
                <OrderEntry />
            </div>
        );
    }
}

export default App;
