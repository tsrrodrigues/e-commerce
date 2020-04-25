import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

export default function DashOrderDetail(props) {

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTc0MTE5M2FmMTlhNmFkMTc0ODYyZSIsImFjY2Vzc19sZXZlbCI6MywiaWF0IjoxNTg3NzU2MzIzLCJleHAiOjE1ODc4NDI3MjN9.7xlpbt3hE75_PTQQFora1RzYsTl3oCD1-_xXnEuVhxw"

    const orderId = props.match.params.id
    const [order, setOrder] = useState({})

    useEffect(() => {
        api.get(`/order/${orderId}`, {
            headers: {
                Authorization: token
            }
        }).then(response => {
            setOrder(response.data)
        })
    })

    document.title = "Detalhes do pedido";
    
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
                                <div className="col-md-10 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Pedido #{orderId}</h2>
                                        </div>

                                        <div className="card-body">
                                            <button type="button" className="btn btn-danger">Confirmar Entrega</button>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2><strong>Dados do cliente</strong></h2>
                                        </div>

                                        <div className="card-body">
                                            <h5><strong>Nome: </strong>{order.user ? order.user.name : null}</h5>
                                            <h5><strong>CPF: </strong>{order.user ? order.user.cpf : null}</h5>
                                            <h5><strong>Telefone: </strong>(61) 9999-9999</h5>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Carrinho de compras</h2>
                                        </div>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Produto</th>
                                                        <th scope="col" className="hidden-xs hidden-sm">Preço Und.</th>
                                                        <th scope="col">Quantidade</th>
                                                        <th scope="col" className="hidden-xs">Preço Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.cart ? order.cart.items.map( item => (
                                                        <tr>
                                                            <th scope="row">{item.name}</th>
                                                            <td className="hidden-xs hidden-sm">R$ {item.price}</td>
                                                            <td>1</td>
                                                            <td className="hidden-xs">R$ {item.price*item.quantity}</td>
                                                        </tr>
                                                    )) : null}
                                                </tbody>
                                            </table>

                                            <h5><strong>Custo de Entrega: </strong>R$ 10,00</h5>
                                            <h5><strong>Valor Total: </strong>R$ 33,99</h5>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2><strong>Dados de entrega</strong></h2>
                                        </div>

                                        <div className="card-body">
                                            <h5><strong>CEP: </strong>{order.adress ? order.adress.cep : null}</h5>
                                            <h5><strong>Endereço: </strong>{order.adress ? order.adress.logradouro : null}</h5>
                                            <h5><strong>Bairro: </strong>{order.adress ? order.adress.bairro : null}</h5>
                                            <h5><strong>Complemento: </strong>{order.adress ? order.adress.complemento : null}</h5>
                                            <h5><strong>Cidade: </strong>{order.adress ? order.adress.localidade : null}</h5>
                                            <h5><strong>Estado: </strong>{order.adress ? order.adress.uf : null}</h5>
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