import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginForm from './pages/dashboard/content/LoginForm';

import DashBoard from './pages/dashboard';

import DashOrders from './pages/dashboard/pedidos';
import DashOrderDetail from './pages/dashboard/pedidos/details';

import DashProducts from './pages/dashboard/produtos';
import DashProductEdit from './pages/dashboard/produtos/edit';

import DashCategories from './pages/dashboard/categorias';
import DashCategoryEdit from './pages/dashboard/categorias/edit'

import DashClients from './pages/dashboard/clientes';
import DashClientDetail from './pages/dashboard/clientes/details';

import DashConfig from './pages/dashboard/ajustes';

import DashUser from './pages/dashboard/user';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={DashBoard} />

                <Route path="/login" component={LoginForm} />

                <Route path="/pedidos" exact component={DashOrders} />
                <Route path="/pedidos/:id" component={DashOrderDetail} />

                <Route path="/produtos" exact component={DashProducts} />
                <Route path="/produtos/:id" component={DashProductEdit} />

                <Route path="/categorias" exact component={DashCategories} />
                <Route path="/categorias/:id" component={DashCategoryEdit} />

                <Route path="/clientes" exact component={DashClients} />
                <Route path="/clientes/:id" component={DashClientDetail} />

                <Route path="/ajustes" component={DashConfig} />
                
                <Route path="/user/:id" component={DashUser} />
            </Switch>
        </BrowserRouter>
    );
}