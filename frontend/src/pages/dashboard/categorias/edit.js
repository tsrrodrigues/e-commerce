import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../../../pages/dashboard/content/SideBar';
import HeaderTop from '../../../pages/dashboard/content/HeaderTop';
import ModalAddProduto from '../../../pages/dashboard/content/ModalAddProduto';
import ModalAddAviso from '../../../pages/dashboard/content/ModalAddAviso';

export default function DashCategoryEdit() {
    document.title = "Editar: Categoria";

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
                                <div className="col-md-5 col-sm-4 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Editar categoria: Acessórios</h2>
                                        </div>

                                        <div className="card-body">
                                            <form>
                                                <div className="form-group">
                                                    <label>Nome</label>
                                                    <input type="text" className="form-control" placeholder="Acessórios"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Link</label>
                                                    <input type="text" className="form-control" placeholder="/acessorios"/>
                                                </div>

                                                <button type="submit" className="btn btn-danger">Salvar</button>
                                            </form>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-7 col-sm-8 col-xs-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Produtos na categoria</h2>

                                        </div>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Produto</th>
                                                        <th scope="col" className="hidden-xs">Outras Cat.</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Produto 1</th>
                                                        <td className="hidden-xs">0</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-trash-alt"></i>
                                                                <span id="details">Remover</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Produto 2</th>
                                                        <td className="hidden-xs">4</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-trash-alt"></i>
                                                                <span id="details">Remover</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Produto 3</th>
                                                        <td className="hidden-xs">1</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-trash-alt"></i>
                                                                <span id="details">Remover</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Produto 4</th>
                                                        <td className="hidden-xs">2</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-trash-alt"></i>
                                                                <span id="details">Remover</span>
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