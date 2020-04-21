import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

export default function DashConfig() {
    document.title = "Ajustes";

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
                                <div className="col-md-10 col-sm-11 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Ajustes</h2>
                                        </div>

                                        <div className="card-body">
                                            <form>
                                                <div className="form-group">
                                                    <label>Título do site</label>
                                                    <input type="text" className="form-control" placeholder="E-Commerce"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Descrição</label>
                                                    <input type="text" className="form-control" placeholder="Descreva em poucas palavras"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Email de contato</label>
                                                    <input type="text" className="form-control" placeholder="exemplo@email.com"/>
                                                </div>

                                                <button type="submit" className="btn btn-danger">Salvar</button>
                                            </form>
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