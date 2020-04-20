import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DashBoard from './pages/dashboard';
import DashOrders from './pages/dashboard/pedidos';
import DashOrderDetail from './pages/dashboard/pedidos/details';
import DashProducts from './pages/dashboard/produtos';
import DashCategories from './pages/dashboard/categorias';
import DashCategoryEdit from './pages/dashboard/categorias/edit'
import DashClients from './pages/dashboard/clientes';
import DashConfig from './pages/dashboard/ajustes';
import DashUser from './pages/dashboard/user';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={DashBoard} />
                <Route path="/pedidos" exact component={DashOrders} />
                <Route path="/pedidos/detalhe" component={DashOrderDetail} />
                <Route path="/produtos" component={DashProducts} />
                <Route path="/categorias" exact component={DashCategories} />
                <Route path="/categorias/1" component={DashCategoryEdit} />
                <Route path="/clientes" component={DashClients} />
                <Route path="/ajustes" component={DashConfig} />
                <Route path="/user/1" component={DashUser} />
            </Switch>
        </BrowserRouter>
    );
}