import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

export default function DashClients() {
    document.title = "Clientes";
    
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
                                <div className="col-md-10 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Clientes</h2>

                                        </div>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nome</th>
                                                        <th scope="col" className="hidden-xs hidden-sm">Email</th>
                                                        <th scope="col">Telefone</th>
                                                        <th scope="col" className="hidden-xs">Estado</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Timóteo</th>
                                                        <td className="hidden-xs hidden-sm">timoteo.lala@email.com</td>
                                                        <td>(61) 9999-9999</td>
                                                        <td className="hidden-xs">DF</td>
                                                        <td>
                                                            <Link to="/clientes/1" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-search"></i>
                                                                <span id="details">Detalhes</span>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Henrique</th>
                                                        <td className="hidden-xs hidden-sm">herique.estilos@email.com</td>
                                                        <td>(11) 5555-5555</td>
                                                        <td className="hidden-xs">SP</td>
                                                        <td>
                                                            <Link to="/clientes/1" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-search"></i>
                                                                <span id="details">Detalhes</span>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Alana</th>
                                                        <td className="hidden-xs hidden-sm">alana.doreino@email.com</td>
                                                        <td>(51) 3330-3330</td>
                                                        <td className="hidden-xs">RS</td>
                                                        <td>
                                                            <Link to="/clientes/1" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-search"></i>
                                                                <span id="details">Detalhes</span>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Catarina</th>
                                                        <td className="hidden-xs hidden-sm">catarina.pereira@email.com</td>
                                                        <td>(21) 1111-1111</td>
                                                        <td className="hidden-xs">RJ</td>
                                                        <td>
                                                            <Link to="/clientes/1" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-search"></i>
                                                                <span id="details">Detalhes</span>
                                                            </Link>
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