import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

export default function DashOrderDetail (props) {

    const history = useHistory()

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')

    const orderId = props.match.params.id
    const [order, setOrder] = useState({})

    useEffect(() => {
        api.get(`/order/${orderId}`, {
            headers: {
                Authorization: token
            },
            errorHandler: true,
            
        }).then(response => {
            setOrder(response.data)
        })

    }, [token, orderId]);

    async function handleChangeStatus(message) {
        if (message === "Para Entrega")
            await api.patch(`/order/${orderId}?s=Para Entrega`)
        else if (message === "Finalizado")
            await api.patch(`/order/${orderId}?s=Finalizado`)
        history.push('/')
    }

    document.title = `Detalhes do pedido: ${orderId}`;
    
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
                                <div className="col-md-10 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Pedido #{orderId}</h2>
                                        </div>

                                        <div className="card-body">
                                            <button type="button" onClick={() => handleChangeStatus("Para Entrega")} className="btn btn-danger">Para Entrega</button>
                                            <button type="button" onClick={() => handleChangeStatus("Finalizado")} className="btn btn-danger">Confirmar Entrega</button>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2><strong>Dados do cliente</strong></h2>
                                        </div>

                                        <div className="card-body">
                                            <h5><strong>Nome: </strong>{order.user ? order.user.name.first : null}</h5>
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
                                                        <tr key={item._id}>
                                                            <th scope="row">{item.name}</th>
                                                            <td className="hidden-xs hidden-sm">R$ {item.price}</td>
                                                            <td>{item.quantity}</td>
                                                            <td className="hidden-xs">R$ {item.price*item.quantity}</td>
                                                        </tr>
                                                    )) : null}
                                                </tbody>
                                            </table>

                                            <h5><strong>Custo de Entrega: </strong>R$ 10,00</h5>
                                            <h5><strong>Valor Total: </strong>R${order.cart ? order.cart.total : null}</h5>
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