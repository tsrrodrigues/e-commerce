import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import api from '../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

import SideBar from './content/SideBar';
import HeaderTop from './content/HeaderTop';
import ModalAddProduto from './content/ModalAddProduto';
import ModalAddAviso from './content/ModalAddAviso';
import Pagination from './content/Pagination';

export default function DashBoard () {

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')
    const user_access = localStorage.getItem('userLevel')

    const [waitDeliverOrders, setWaitDeliverOrders] = useState([])
    const [forDeliverOrders, setForDeliverOrders] = useState([])

    const query = queryString.parse(window.location.search)

    const [currentPage, setCurrentPage] = useState(query.waitdeliver)
    const [maxPages, setMaxPages] = useState(1)

    const [currentPage2, setCurrentPage2] = useState(query.fordeliver)
    const [maxPages2, setMaxPages2] = useState(1)

    const isClient = parseInt(user_access) === 1 ? true : false

    useEffect(() => {
        api.get(`order?u=${isClient}&s=waitdeliver&p=${currentPage ? currentPage : "1"}`, {
            headers: {
                Authorization: token,
            },
            errorHandler: true,

        }).then(response => {
            setWaitDeliverOrders(response.data.orders)
            setMaxPages(response.data.pages)
        })

    }, [token, currentPage, isClient]);

    useEffect(() => {
        api.get(`order?u=${isClient}&s=fordeliver&p=${currentPage2 ? currentPage2 : "1"}`, {
            headers: {
                Authorization: token
            },
            errorHandler: true,

        }).then(response => {
            setForDeliverOrders(response.data.orders)
            setMaxPages2(response.data.pages)
        })

    }, [token, currentPage2, isClient]);

    useEffect(() => {
        setCurrentPage(query.waitdeliver)

    }, [query.waitdeliver]);

    useEffect(() => {
        setCurrentPage2(query.fordeliver)

    }, [query.fordeliver]);

    document.title = "Painel";
    
    return (
        <section className="dashboard">
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <SideBar nav="dash"/>
                   
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                        <HeaderTop />
                        
                        <div className="user-dashboard">
                            <h1>Olá, {user_name}</h1>
                            <div id="info-div"></div>
                            
                            <div className="row">
                                <div className="col-md-6 col-sm-10 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Aguardando Entrega</h2>

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
                                                        <th scope="col">Data</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {waitDeliverOrders.map(order => (
                                                        <tr key={order._id}>
                                                            <th scope="row">{order.user? order.user.name.first : null}</th>
                                                            <td className="hidden-xs">R$ {order.cart.total}</td>
                                                            <td> {
                                                                order.date.substring(11, 16) + " - " +
                                                                order.date.substring(8, 10) + "/" +
                                                                order.date.substring(5, 7)
                                                            } </td>
                                                            <td>
                                                                <Link to={`/pedidos/${order._id}`} className="btn btn-danger">
                                                                    <i id="icon" className="fa fa-search"></i>
                                                                    <span id="details">Detalhes</span>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {maxPages > 1 &&
                                            <Pagination currentPage={currentPage ? currentPage : "1"} maxPages={maxPages} query="waitdeliver" />
                                        }
                                    </div>

                                </div>
                                <div className="col-md-6 col-sm-10 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Para entrega</h2>

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
                                                        <th scope="col">Data</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {forDeliverOrders.map(order => (
                                                        <tr key={order._id}>
                                                            <th scope="row">{order.user? order.user.name.first : null}</th>
                                                            <td className="hidden-xs">R$ {order.cart.total}</td>
                                                            <td> {
                                                                order.date.substring(11, 16) + " - " +
                                                                order.date.substring(8, 10) + "/" +
                                                                order.date.substring(5, 7)
                                                            } </td>
                                                            <td>
                                                                <Link to={`/pedidos/${order._id}`} className="btn btn-danger">
                                                                    <i id="icon" className="fa fa-search"></i>
                                                                    <span id="details">Detalhes</span>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {maxPages2 > 1 &&
                                            <Pagination currentPage={currentPage2 ? currentPage2 : "1"} maxPages={maxPages2} query="fordeliver" />
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