import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap-theme.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

import logoImg from '../../assets/img/logo.png';
import userImg from '../../assets/img/user-circle-solid.svg';

export default function Dashboard() {
    return (
        <section className="dashboard">
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    
                    <div className="col-md-2 col-sm-1 col-xs-1 hidden-xs display-table-cell v-align box" id="navigation">

                        <div className="logo">
                            <Link to="#">
                                <img src={logoImg} alt="commerce_logo" title="Voltar para o site" className="img-logo"/>
                            </Link>
                        </div>

                        <div className="admin-bar">
                            <ul>
                                <li className="active">
                                    <Link to="#">
                                        <i className="fa fa-tachometer-alt" aria-hidden="true"></i>
                                        <span className="hidden-xs">Painel</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#pedidos">
                                        <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                                        <span className="hidden-xs">Pedidos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <i className="fa fa-cubes" aria-hidden="true"></i>
                                        <span className="hidden-xs">Produtos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
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
                   
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                        <div className="row">
                            
                            <header className="shadow">
                                <div className="col-md-5">
                                    <nav className="navbar-default pull-left">
                                        <div className="navbar-header">
                                            <button type="button" className="navbar-toggle collapsed" data-toggle="offcanvas" data-target="#navigation" id="nav-toggle" aria-expanded="false">
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
                                            <li className="hidden-xs">
                                                <Link to="#add_product" className="btn btn-danger" data-toggle="modal" data-target="#add_product">Add Produto</Link>
                                            </li>
                                            <li>
                                                <Link to="#add_mens" className="btn btn-danger" data-toggle="modal" data-target="#add_mens">Add Aviso</Link>
                                            </li>
                                            <li>
                                                <Link to="#"><i className="fa fa-envelope" aria-hidden="true"></i></Link>
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
                                                            <Link to="#" className="btn btn-sm btn-danger btn-profile">Ver Perfil</Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </header>
                           
                        </div>
                        
                        <div className="user-dashboard">
                            <h1>Olá, Person Silva</h1>
                            <div className="row">
                                <div className="col-md-5 col-sm-5 col-xs-12 gutter">

                                    <div className="card">
                                        <h2>Pedidos</h2>

                                        <div className="btn-group">
                                            <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span>Período:</span> Dia
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link to="#">Dia</Link>
                                                <Link to="#">Mês</Link>
                                                <Link to="#">Ano</Link>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-md-7 col-sm-7 col-xs-12 gutter">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Aguardando entrega</h2>

                                            <div className="btn-group">
                                                <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span>Período:</span> Dia
                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link to="#">Dia</Link>
                                                    <Link to="#">Mês</Link>
                                                    <Link to="#">Ano</Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>

            </div>

            
            <div id="add_product" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header login-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title">Adicionar Produto</h4>
                        </div>
                        <div className="modal-body">
                            <input type="text" placeholder="Nome do produto" name="name"/>
                            <input type="text" placeholder="Categoria" name="mail"/>
                            <input type="text" placeholder="Preço" name="passsword"/>
                            <textarea placeholder="Descrição"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="add_mens" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header login-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title">Adicionar Aviso</h4>
                        </div>
                        <div className="modal-body">
                            <input type="text" placeholder="Título" name="name"/>
                            <textarea placeholder="Mensagem"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="button btn-danger" data-dismiss="modal">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
}