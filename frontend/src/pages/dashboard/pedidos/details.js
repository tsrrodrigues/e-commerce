import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

export default function DashOrderDetail() {
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
                                            <h2>Pedido #0000001</h2>
                                        </div>

                                        <div className="card-body">
                                            <button type="button" className="btn btn-danger">Saiu para Entrega</button>
                                            <button type="button" className="btn btn-danger">Confirmar Entrega</button>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2><strong>Dados do cliente</strong></h2>
                                        </div>

                                        <div className="card-body">
                                            <h5><strong>Nome: </strong>Cliente 1</h5>
                                            <h5><strong>CPF: </strong>000.000.000-00</h5>
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
                                                    <tr>
                                                        <th scope="row">Produto 1</th>
                                                        <td className="hidden-xs hidden-sm">R$ 5,99</td>
                                                        <td>1</td>
                                                        <td className="hidden-xs">R$ 5,99</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Produto 2</th>
                                                        <td className="hidden-xs hidden-sm">R$ 2,99</td>
                                                        <td>2</td>
                                                        <td className="hidden-xs">R$ 5,99</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Produto 3</th>
                                                        <td className="hidden-xs hidden-sm">R$ 5,99</td>
                                                        <td>1</td>
                                                        <td className="hidden-xs">R$ 5,99</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Produto 4</th>
                                                        <td className="hidden-xs hidden-sm">R$ 5,99</td>
                                                        <td>1</td>
                                                        <td className="hidden-xs">R$ 5,99</td>
                                                    </tr>
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