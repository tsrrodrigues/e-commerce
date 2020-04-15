import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../../../pages/dashboard/content/SideBar';
import HeaderTop from '../../../pages/dashboard/content/HeaderTop';
import ModalAddProduto from '../../../pages/dashboard/content/ModalAddProduto';
import ModalAddAviso from '../../../pages/dashboard/content/ModalAddAviso';

export default function DashOrders() {
    document.title = "Pedidos";
    
    return (
        <section className="dashboard">
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <SideBar />
                   
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                        <HeaderTop />
                        
                        <div className="user-dashboard">
                            <h1>Olá, Person Silva</h1>
                            <div className="row">
                                <div className="col-lg-8 col-md-10 col-xs-12 gutter">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Pedidos Realizados</h2>

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
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Cliente</th>
                                                        <th scope="col" className="hidden-xs">Preço</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col" className="hidden-xs">Data</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Timóteo</th>
                                                        <td className="hidden-xs">R$ 23,99</td>
                                                        <td>Aguardando Pagamento</td>
                                                        <td className="hidden-xs">13-04-2020</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-search"></i>
                                                                <span id="details">Detalhes</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Henrique</th>
                                                        <td className="hidden-xs">R$ 49,99</td>
                                                        <td>Aguardando Entrega</td>
                                                        <td className="hidden-xs">10-04-2020</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-search"></i>
                                                                <span id="details">Detalhes</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Alana</th>
                                                        <td className="hidden-xs">R$ 3,50</td>
                                                        <td>Aguardando Entrega</td>
                                                        <td className="hidden-xs">08-04-2020</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-search"></i>
                                                                <span id="details">Detalhes</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Catarina</th>
                                                        <td className="hidden-xs">R$ 200,05</td>
                                                        <td>Pedido Cancelado</td>
                                                        <td className="hidden-xs">07-04-2020</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-search"></i>
                                                                <span id="details">Detalhes</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="card-pagination">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#" aria-label="Previous">
                                                            <span aria-hidden="true">«</span>
                                                            <span className="sr-only">Previous</span>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#" aria-label="Next">
                                                            <span aria-hidden="true">»</span>
                                                            <span className="sr-only">Next</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>

            <ModalAddProduto />
            <ModalAddAviso />
            
        </section>
    );
}