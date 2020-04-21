import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

import userImg from '../../../assets/img/user-circle-solid.svg';

export default function DashUser() {
    document.title = "Perfil de Usuário";

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
                                            <h2>Seu perfil</h2>

                                        </div>

                                        <div className="card-body">
                                            <form>
                                                <img src={userImg} className="user-img" alt="foto"/>

                                                <div className="form-group">
                                                    <label>Foto de perfil</label>
                                                    <input type="file" className="form-control-file"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Nome</label>
                                                    <input type="text" className="form-control" defaultValue="Person"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Sobrenome</label>
                                                    <input type="text" className="form-control" defaultValue="Silva"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" className="form-control" defaultValue="person.silva@email.com"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>CPF</label>
                                                    <input type="text" className="form-control" defaultValue="000.000.000-00"/>
                                                </div>

                                                <button type="submit" className="btn btn-danger">Salvar</button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Dados de entrega</h2>

                                        </div>

                                        <div className="card-body">
                                            <form>
                                                <div className="form-group">
                                                    <label>Endereço</label>
                                                    <input type="text" className="form-control" defaultValue=""/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Bairro</label>
                                                    <input type="text" className="form-control" defaultValue=""/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Cidade</label>
                                                    <input type="text" className="form-control" defaultValue=""/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Telefone</label>
                                                    <input type="text" className="form-control" defaultValue=""/>
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