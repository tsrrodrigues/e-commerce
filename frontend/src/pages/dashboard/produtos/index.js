import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../../../pages/dashboard/content/SideBar';
import HeaderTop from '../../../pages/dashboard/content/HeaderTop';
import ModalAddProduto from '../../../pages/dashboard/content/ModalAddProduto';
import ModalAddAviso from '../../../pages/dashboard/content/ModalAddAviso';

import productImg from '../../../assets/img/cube-solid.svg';

export default function DashProducts() {
    document.title = "Produtos";

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
                                <div className="col-lg-10 col-md-10 col-xs-12 dash-comp">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Produtos</h2>

                                        </div>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col">Nome</th>
                                                        <th scope="col" className="hidden-xs">Preço</th>
                                                        <th scope="col">Categorias</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">
                                                            <img src={productImg} height="100" width="100" alt="produto"/>
                                                        </th>
                                                        <th scope="col">Produto 1</th>
                                                        <td className="hidden-xs">R$ 23,99</td>
                                                        <td>Acessórios, Casa</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-pencil-alt"></i>
                                                                <span id="details">Editar</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <img src={productImg} height="100" width="100" alt="produto"/>
                                                        </th>
                                                        <th scope="col">Produto 2</th>
                                                        <td className="hidden-xs">R$ 49,99</td>
                                                        <td>Utilidades, Eletrônicos</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-pencil-alt"></i>
                                                                <span id="details">Editar</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <img src={productImg} height="100" width="100" alt="produto"/>
                                                        </th>
                                                        <th scope="col">Produto 3</th>
                                                        <td className="hidden-xs">R$ 3,50</td>
                                                        <td>Alimentos, Frios</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-pencil-alt"></i>
                                                                <span id="details">Editar</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <img src={productImg} height="100" width="100" alt="produto"/>
                                                        </th>
                                                        <th scope="col">Produto 4</th>
                                                        <td className="hidden-xs">R$ 200,05</td>
                                                        <td>Casa, Cozinha</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-pencil-alt"></i>
                                                                <span id="details">Editar</span>
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