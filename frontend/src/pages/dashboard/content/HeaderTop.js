import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';

export default function HeaderTop() {

    const user_name = localStorage.getItem('userDisplayName')
    const user_image = localStorage.getItem('userImage')
    const user_id = localStorage.getItem('userID')
    const token = localStorage.getItem('userToken')

    const [user, setUser] = useState([])
    const history = useHistory()
    const apiURL = api.defaults.baseURL

    const handleLogout = useCallback(() => {
        localStorage.clear()
        history.push('/login')

    }, [history]);

    useEffect(() => {
        if (!token) {
            handleLogout();
        }

        api.get(`user/${user_id}`, {
            headers: {
                Authorization: token,
            }
            
        }).then(response => {
            setUser(response.data)

        }).catch(error => {
            if (error.response) {
                //handleLogout();
            }
        })

    }, [token, user_id, handleLogout]);

    return (
        <div className="row">
                            
            <header>
                <div className="col-md-5">
                    <nav className="navbar-default pull-left">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation" id="nav-toggle" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                    </nav>
                    <div className="search hidden-xs hidden-sm">
                        <form className="form-inline">
                            <div className="form-group">
                                <label className="sr-only">Pesquisa</label>
                                <input type="text" className="form-control" name="search" placeholder="Pesquisa"/>
                            </div>
                            <button type="submit" className="btn btn-danger">
                                <i className="fa fa-search" aria-hidden="false"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="header-top">

                        <ul className="list-inline pull-right">
                            {user.access_level >= 2 &&
                                <li className="dropdown">
                                    <button className="btn btn-danger dropdown-toggle" data-toggle="dropdown">Novo</button>
                                    <ul className="dropdown-menu drop-link">
                                        <li>
                                            <div className="navbar-content">
                                                <Link to="#add_product" data-toggle="modal" data-target="#add_product">Novo Produto</Link>
                                                <Link to="#add_mens" data-toggle="modal" data-target="#add_mens">Nova Mensagem</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            }
                            <li>
                                <Link to="#" className="icon-info">
                                    <i className="fa fa-bell" aria-hidden="false"></i>
                                    <span className="label label-primary">3</span>
                                </Link>
                            </li>
                            <li className="dropdown">
                                <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={apiURL + user_image} alt="foto do perfil"/>
                                    <b className="caret"></b>
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <div className="navbar-content">
                                            <span>{user_name}</span>
                                            <p className="text-muted small">
                                                {user.email}
                                            </p>
                                            <p className="text-muted small">
                                                <Link to="#" onClick={handleLogout}>Sair</Link>
                                            </p>
                                            <div className="divider"></div>

                                            <Link to={`/perfil`} className="btn btn-sm btn-danger btn-profile">Ver Perfil</Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </header>
                           
        </div>
    );
}