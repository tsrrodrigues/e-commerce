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

import DashUsers from './pages/dashboard/usuarios';
import DashUserEdit from './pages/dashboard/usuarios/edit';

import DashConfig from './pages/dashboard/ajustes';

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

                <Route path="/usuarios" exact component={DashUsers} />
                <Route path="/usuarios/:id" component={DashUserEdit} />
                <Route path="/perfil" component={DashUserEdit} />

                <Route path="/ajustes" component={DashConfig} />
                
            </Switch>
        </BrowserRouter>
    );
}