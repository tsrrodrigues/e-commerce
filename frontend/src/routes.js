import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import DashOrders from './pages/dashboard/pedidos';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/pedidos" component={DashOrders} />
            </Switch>
        </BrowserRouter>
    );
}