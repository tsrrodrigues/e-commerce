import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

import userImg from '../../../assets/img/user-circle-solid.svg';

export default function DashClientDetail() {
    document.title = "Detalhes do cliente";
    
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
                                <div className="col-md-8 col-sm-10 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2><strong>Dados do cliente</strong></h2>
                                        </div>

                                        <div className="card-body">
                                            <img src={userImg} className="user-img" alt="foto"/>

                                            <h5><strong>Nome: </strong>Cliente 1</h5>
                                            <h5><strong>CPF: </strong>000.000.000-00</h5>
                                            <h5><strong>Email: </strong>pessoa@email.com</h5>
                                            <h5><strong>Telefone: </strong>(61) 9999-9999</h5>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2><strong>Dados de entrega</strong></h2>
                                        </div>

                                        <div className="card-body">
                                            <h5><strong>Endereço: </strong>St. de Habitações Individuais Norte</h5>
                                            <h5><strong>Bairro: </strong>Lago Norte</h5>
                                            <h5><strong>Cidade: </strong>Brasília</h5>
                                            <h5><strong>Estado: </strong>DF</h5>
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