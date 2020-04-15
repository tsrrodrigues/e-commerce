import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DashBoard from './pages/dashboard';
import DashOrders from './pages/dashboard/pedidos';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={DashBoard} />
                <Route path="/pedidos" component={DashOrders} />
            </Switch>
        </BrowserRouter>
    );
}