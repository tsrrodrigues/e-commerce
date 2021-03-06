import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import api from '../../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';
import Pagination from '../content/Pagination';

export default function DashProducts () {

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')
    const user_access = localStorage.getItem('userLevel')

    const [products, setProducts] = useState([])
    const apiURL = api.defaults.baseURL

    const query = queryString.parse(window.location.search)
    const [currentPage, setCurrentPage] = useState(query.page)
    const [maxPages, setMaxPages] = useState(1)

    const isClient = parseInt(user_access) === 1 ? true : false

    useEffect(() => {
        api.get(`/product/admin?p=${currentPage ? currentPage : "1"}`, {
            headers: {
                Authorization: token
            },
            errorHandler: true,

        }).then(response => {
            setProducts(response.data.products)
            setMaxPages(response.data.pages)
        })

    }, [token, currentPage]);

    useEffect(() => {
        setCurrentPage(query.page)

    }, [query.page]);

    document.title = "Produtos";

    return (
        <section className="dashboard">
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <SideBar nav="products"/>
                   
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                        <HeaderTop />
                        
                        <div className="user-dashboard">
                            <h1>Olá, {user_name}</h1>
                            <div id="info-div"></div>

                            <div className="row">
                                <div className="col-lg-10 col-md-11 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Produtos</h2>

                                        </div>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="hidden-xs"></th>
                                                        <th scope="col">Nome</th>
                                                        <th scope="col" className="hidden-xs">Preço</th>
                                                        <th scope="col">Categorias</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map(product => (
                                                        <tr key={product._id}>
                                                            <th scope="row" className="hidden-xs">
                                                                <img src={apiURL + product.images[0]} width="100" alt="produto"/>
                                                            </th>
                                                            <th>{product.name}</th>
                                                            <td className="hidden-xs">R$ {product.price}</td>
                                                            <td>{product.tag.name}</td>
                                                            <td>
                                                                <Link to={`/produtos/${product._id}`} className="btn btn-danger">
                                                                    <i id="icon" className="fa fa-pencil-alt"></i>
                                                                    <span id="details">Editar</span>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        {maxPages > 1 &&
                                            <Pagination currentPage={currentPage ? currentPage : "1"} maxPages={maxPages} />
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>

            {!isClient &&
                <div className="modals">
                    <ModalAddProduto />
                    <ModalAddAviso />
                </div>
            }
            
        </section>
    );
}