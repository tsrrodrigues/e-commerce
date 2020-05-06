import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

export default function DashOrders() {

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')

    const [orders, setOrders] = useState([])
    const history = useHistory()

    const query = queryString.parse(window.location.search)
    const [currentPage, setCurrentPage] = useState(query.page)
    const [maxPages, setMaxPages] = useState(1)

    useEffect(() => {
        api.get(`/order?p=${currentPage}`, {
            headers: {
                Authorization: token
            },
            errorHandler: true,
            
        }).then(response => {
            setOrders(response.data.orders)
            setMaxPages(response.data.pages)
        })

    }, [token, currentPage]);

    useEffect(() => {
        setCurrentPage(query.page)

    }, [query.page]);

    document.title = "Pedidos";
    
    return (
        <section className="dashboard">
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <SideBar />
                   
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                        <HeaderTop />
                        
                        <div className="user-dashboard">
                            <h1>Olá, {user_name}</h1>
                            <div id="info-div"></div>

                            <div className="row">
                                <div className="col-lg-8 col-md-10 col-xs-12">

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
                                                        <th scope="col" className="hidden-xs">Valor</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col" className="hidden-xs">Data</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map(order => (
                                                        <tr key={order._id}>
                                                            <th scope="row">{order.user.name.first}</th>
                                                            <td className="hidden-xs">R$ {order.cart.total}</td>
                                                            <td>{order.status}</td>
                                                            <td className="hidden-xs">
                                                                {
                                                                    order.date.substring(8, 10) + "/" +
                                                                    order.date.substring(5, 7) + "/" +
                                                                    order.date.substring(0, 4)
                                                                }
                                                            </td>
                                                            <td>
                                                                <button 
                                                                    onClick={() => {               
                                                                        history.push(`/pedidos/${order._id}`)
                                                                    }}
                                                                    className="btn btn-danger"
                                                                >
                                                                    <i id="icon" className="fa fa-search"></i>
                                                                    <span id="details">Detalhes</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {maxPages > 1 &&
                                            <Pagination currentPage={currentPage ? currentPage : 1} maxPages={maxPages} />
                                        }
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