import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../../assets/img/logo.png';

export default function SideBar() {
    return (
        <div className="col-md-2 col-sm-1 col-xs-1 display-table-cell v-align box" id="navigation">

            <div className="logo">
                <Link to="/">
                    <img src={logoImg} alt="commerce_logo" title="Voltar para o site" className="img-logo"/>
                </Link>
            </div>

            <div className="admin-bar">
                <ul>
                    <li>
                        <Link to="/">
                            <i className="fa fa-tachometer-alt" aria-hidden="true"></i>
                            <span className="hidden-xs">Painel</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="pedidos">
                            <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                            <span className="hidden-xs">Pedidos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="produtos">
                            <i className="fa fa-cubes" aria-hidden="true"></i>
                            <span className="hidden-xs">Produtos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="categorias">
                            <i className="fa fa-folder" aria-hidden="true"></i>
                            <span className="hidden-xs">Categorias</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i className="fa fa-users" aria-hidden="true"></i>
                            <span className="hidden-xs">Clientes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i className="fa fa-cog" aria-hidden="true"></i>
                            <span className="hidden-xs">Ajustes</span>
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    );
}