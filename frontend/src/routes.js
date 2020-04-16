import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DashBoard from './pages/dashboard';
import DashOrders from './pages/dashboard/pedidos';
import DashProducts from './pages/dashboard/produtos';
import DashCategories from './pages/dashboard/categorias';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={DashBoard} />
                <Route path="/pedidos" component={DashOrders} />
                <Route path="/produtos" component={DashProducts} />
                <Route path="/categorias" component={DashCategories} />
            </Switch>
        </BrowserRouter>
    );
}