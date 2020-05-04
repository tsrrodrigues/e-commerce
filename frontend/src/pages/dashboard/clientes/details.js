import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

import userImg from '../../../assets/img/user-circle-solid.svg';

export default function DashClientDetail (props) {

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem("userToken")

    const [client, setClient] = useState({ name: {}, adress: {} })
    const client_id = props.match.params.id

    useEffect(() => {
        api.get(`user/${client_id}`, {
            headers: {
                Authorization: token,
            },
            errorHandler: true,
            
        }).then(response => {
            setClient(response.data)
        })

    }, [client_id, token]);

    document.title = `Detalhes do cliente: ${client.name.first} ${client.name.last}`;
    
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
                                <div className="col-md-8 col-sm-10 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2><strong>Dados do cliente</strong></h2>
                                        </div>

                                        <div className="card-body">
                                            <img src={userImg} className="user-img" alt="foto"/>

                                            <h5><strong>Nome: </strong>{client.name.first} {client.name.last}</h5>
                                            <h5><strong>CPF: </strong>{client.cpf}</h5>
                                            <h5><strong>Email: </strong>{client.email}</h5>
                                            <h5><strong>Telefone: </strong>{client.phone}</h5>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2><strong>Dados de entrega</strong></h2>
                                        </div>

                                        <div className="card-body">
                                            <h5><strong>CEP: </strong>{client.adress.cep}</h5>
                                            <h5><strong>Endereço: </strong>{client.adress.logradouro}</h5>
                                            <h5><strong>Complemento: </strong>{client.adress.complemento}</h5>
                                            <h5><strong>Bairro: </strong>{client.adress.bairro}</h5>
                                            <h5><strong>Cidade: </strong>{client.adress.localidade}</h5>
                                            <h5><strong>Estado: </strong>{client.adress.uf}</h5>
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