import React from 'react';
import { Link } from 'react-router-dom';

import userImg from '../../../assets/img/user-circle-solid.svg';

export default function HeaderTop() {
    return (
        <div className="row">
                            
            <header className="shadow">
                <div className="col-md-5">
                    <nav className="navbar-default pull-left">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation" id="nav-toggle" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                    </nav>
                    <div className="search hidden-xs hidden-sm">
                        <form className="form-inline">
                            <div className="form-group mb-2">
                            <label className="sr-only">Pesquisa</label>
                            <input type="text" className="form-control" name="search" placeholder="Pesquisa"/>
                            </div>
                            <button type="submit" className="btn btn-danger mb-2"><i className="fa fa-search" aria-hidden="true"></i></button>
                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="header-top">

                        <ul className="list-inline pull-right">
                            <li className="dropdown">
                                <Link to="#" className="btn btn-danger dropdown-toggle" data-toggle="dropdown">Novo</Link>
                                <ul className="dropdown-menu drop-link">
                                    <li>
                                        <div className="navbar-content">
                                            <Link to="#add_product" data-toggle="modal" data-target="#add_product">Adicionar Produto</Link>
                                            <Link to="#add_mens" data-toggle="modal" data-target="#add_mens">Adicionar Mensagem</Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#" className="icon-info">
                                    <i className="fa fa-bell" aria-hidden="true"></i>
                                    <span className="label label-primary">3</span>
                                </Link>
                            </li>
                            <li className="dropdown">
                                <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={userImg} alt="user"/>
                                    <b className="caret"></b>
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <div className="navbar-content">
                                            <span>Person S.</span>
                                            <p className="text-muted small">
                                                person@email.com
                                            </p>
                                            <div className="divider">
                                            </div>
                                            <Link to="/user/1" className="btn btn-sm btn-danger btn-profile">Ver Perfil</Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </header>
                           
        </div>
    );
}