import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

import SideBar from './content/SideBar';
import HeaderTop from './content/HeaderTop';
import ModalAddProduto from './content/ModalAddProduto';
import ModalAddAviso from './content/ModalAddAviso';

export default function DashBoard() {

    const token = localStorage.getItem('userToken')

    const history = useHistory();

    document.title = "Painel";

    const [waitDeliverOrders, setWaitDeliverOrders] = useState([]);
    const [forDeliverOrders, setForDeliverOrders] = useState([]);

    useEffect(() => {
        api.get('/order?s=waitdeliver', {
            headers: {
                Authorization: token
            }
        }).then(response => {
            setWaitDeliverOrders(response.data);
        })

        api.get('/order?s=fordeliver', {
            headers: {
                Authorization: token
            }
        }).then(response => {
            setForDeliverOrders(response.data);
        })
    }, [token]);
    
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
                                                            <th scope="row">{order.user.name.first}</th>
                                                            <td className="hidden-xs">R$ {order.cart.total}</td>
                                                            <td> {
                                                                order.date.substring(11, 16) + " - " +
                                                                order.date.substring(8, 10) + "/" +
                                                                order.date.substring(5, 7)
                                                            } </td>
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
                                                            <th scope="row">{order.user.name.first}</th>
                                                            <td className="hidden-xs">R$ {order.cart.total}</td>
                                                            <td> {
                                                                order.date.substring(11, 16) + " - " +
                                                                order.date.substring(8, 10) + "/" +
                                                                order.date.substring(5, 7)
                                                            } </td>
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