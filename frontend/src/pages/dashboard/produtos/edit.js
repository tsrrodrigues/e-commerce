import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

export default function DashProductEdit() {
    document.title = "Editar: Produto";

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
                                            <h2>Editar Produto: </h2>

                                        </div>

                                        <div className="card-body">
                                            <form>
                                                <div className="form-group">
                                                    <label>Título</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Descrição</label>
                                                    <textarea className="form-control"></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <label>Fotos do produto</label>
                                                    <input type="file" className="form-control-file"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Categorias</label>
                                                    <select multiple className="form-control" title="Pressione Ctrl para selecionar mais de uma categoria">
                                                        <option>Categoria 1</option>
                                                        <option>Categoria 2</option>
                                                        <option>Categoria 3</option>
                                                        <option>Categoria 4</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Estoque</label>
                                                    <input type="number" className="form-control" defaultValue="1"></input>
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