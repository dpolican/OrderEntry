import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import App from './containers/App';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/:lang' component={App} />
            </Switch>
        </BrowserRouter>
    )
}