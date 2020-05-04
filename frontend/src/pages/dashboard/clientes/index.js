import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

export default function DashClients () {

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')

    const [clients, setClients] = useState([])
    const [level, setLevel] = useState(1)

    useEffect(() => {
        api.get('user', {
            headers: {
                Authorization: token,
            },
            errorHandler: true,
            
        }).then(response => {
            setClients(response.data.users.filter(client => client.access_level === level))
        })

    }, [token, level]);

    document.title = "Clientes";
    
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
                                            <h2>Clientes</h2>

                                            <div className="btn-group">
                                                <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span>Mostrar: </span> Nível {level}
                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link to="#" onClick={() => setLevel(1)}>Nível 1</Link>
                                                    <Link to="#" onClick={() => setLevel(2)}>Nível 2</Link>
                                                    <Link to="#" onClick={() => setLevel(3)}>Nível 3</Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nome</th>
                                                        <th scope="col" className="hidden-xs hidden-sm">Email</th>
                                                        <th scope="col">Telefone</th>
                                                        <th scope="col" className="hidden-xs">Estado</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {clients.map(client => (
                                                        <tr key={client._id}>
                                                            <th scope="row">{client.name.first}</th>
                                                            <td className="hidden-xs hidden-sm">{client.email}</td>
                                                            <td>{client.phone}</td>
                                                            <td className="hidden-xs">{client.adress.uf}</td>
                                                            <td>
                                                                <Link to={`/clientes/${client._id}`} className="btn btn-danger">
                                                                    <i id="icon" className="fa fa-search"></i>
                                                                    <span id="details">Detalhes</span>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="card-pagination">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#" aria-label="Previous">
                                                            <span aria-hidden="true">«</span>
                                                            <span className="sr-only">Previous</span>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#" aria-label="Next">
                                                            <span aria-hidden="true">»</span>
                                                            <span className="sr-only">Next</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
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