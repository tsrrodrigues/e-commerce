import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../../../pages/dashboard/content/SideBar';
import HeaderTop from '../../../pages/dashboard/content/HeaderTop';
import ModalAddProduto from '../../../pages/dashboard/content/ModalAddProduto';
import ModalAddAviso from '../../../pages/dashboard/content/ModalAddAviso';

export default function DashCategories() {
    document.title = "Categorias";

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
                                <div className="col-md-7 col-sm-7 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Categorias</h2>

                                        </div>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Categoria</th>
                                                        <th scope="col" className="hidden-xs hidden-sm">Link</th>
                                                        <th scope="col">Produtos</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Acessórios</th>
                                                        <td className="hidden-xs hidden-sm">/acessorios</td>
                                                        <td>6</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-pencil-alt"></i>
                                                                <span id="details">Editar</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Casa</th>
                                                        <td className="hidden-xs hidden-sm">/casa</td>
                                                        <td>2</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-pencil-alt"></i>
                                                                <span id="details">Editar</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Eletrônicos</th>
                                                        <td className="hidden-xs hidden-sm">/eletronicos</td>
                                                        <td>2</td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger">
                                                                <i id="icon" className="fa fa-pencil-alt"></i>
                                                                <span id="details">Editar</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Utilidades</th>
                                                        <td className="hidden-xs hidden-sm">/utilidades</td>
                                                        <td>10</td>
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

                                <div className="col-md-5 col-sm-5 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Adicionar nova categoria</h2>
                                        </div>

                                        <div className="card-body">
                                            <form>
                                                <div className="form-group">
                                                    <label>Nome</label>
                                                    <input type="text" className="form-control" placeholder="Exemplo: Casa"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Link</label>
                                                    <input type="text" className="form-control" placeholder="Exemplo: /casa"/>
                                                </div>

                                                <button type="submit" className="btn btn-danger">Adicionar</button>
                                            </form>
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