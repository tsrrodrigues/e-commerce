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

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYTQ5MzU3Mzg4Njg0MTQwOTY1NDdiMyIsImFjY2Vzc19sZXZlbCI6MywiaWF0IjoxNTg3ODQzOTI3LCJleHAiOjE1ODc5MzAzMjd9.FEONP_Qw1bcavUm-OnZHnRyiz15RG8RjVcbttJJ7DXI"
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
    });
    
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
                                <div className="col-md-5 col-sm-5 col-xs-12">

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

                                    </div>

                                </div>
                                <div className="col-md-7 col-sm-7 col-xs-12">

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