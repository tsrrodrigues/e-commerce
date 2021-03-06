import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import api from '../../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';
import Pagination from '../content/Pagination';

export default function DashCategoryEdit (props) {

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')
    const user_access = localStorage.getItem('userLevel')
    
    const [category, setCategory] = useState({})
    const cat_id = props.match.params.id
    const [products, setProducts] = useState([])
    
    const [name, setName] = useState('')
    const [cat_edited, setCatEdited] = useState(0)
    const history = useHistory();

    const query = queryString.parse(window.location.search)
    const [currentPage, setCurrentPage] = useState(query.page)
    const [maxPages, setMaxPages] = useState(1)

    const isClient = parseInt(user_access) === 1 ? true : false
    
    useEffect(() => {
        api.get(`tag/${cat_id}`, {
            headers: {
                Authorization: token,
            },
            errorHandler: true,

        }).then(response => {
            setCategory(response.data)
        })
        
    }, [token, cat_id, cat_edited]);

    useEffect(() => {
        if (category.name) {
            api.get(`product/admin?tag=${category.name}&p=${currentPage ? currentPage : "1"}`, {
                headers: {
                    Authorization: token,
                },
                errorHandler: true,

            }).then(response => {
                setProducts(response.data.products)
                setMaxPages(response.data.pages)
            })
        }
        
    }, [token, category.name, currentPage]);

    useEffect(() => {
        setCurrentPage(query.page)

    }, [query.page]);

    async function handleEditCategory (e) {
        e.preventDefault();

        const data = {
            name,
        };

        await api.put(`tag/${cat_id}`, data, {
            headers: {
                Authorization: token,
            },
            successHandler: true,
            errorHandler: true,

        }).then(response => {
            setName('')
            setCatEdited(cat_edited + 1)
        })
        
    }

    document.title = `Editar categoria: ${category.name}`;

    return (
        <section className="dashboard">
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <SideBar nav="tags"/>
                   
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                        <HeaderTop />
                        
                        <div className="user-dashboard">
                            <h1>Olá, {user_name}</h1>
                            <div id="info-div"></div>

                            <div className="row">
                                <div className="col-md-5 col-sm-4 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Editar categoria: {category.name}</h2>

                                        </div>

                                        <div className="card-body">
                                            <form onSubmit={handleEditCategory}>
                                                <div className="form-group">
                                                    <label>Nome</label>
                                                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder={category.name} />
                                                </div>

                                                <button type="submit" className="btn btn-danger">Salvar</button>
                                            </form>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-7 col-sm-8 col-xs-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Produtos na categoria</h2>

                                        </div>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Produto</th>
                                                        <th scope="col" className="hidden-xs">Valor</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {products.map(product => (
                                                    <tr key={product._id}>
                                                        <th scope="row">{product.name}</th>
                                                        <td className="hidden-xs">R$ {product.price}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => {               
                                                                    history.push(`/produtos/${product._id}`)
                                                                }}
                                                                className="btn btn-danger"
                                                            >
                                                                <i id="icon" className="fa fa-pencil-alt"></i>
                                                                <span id="details">Editar</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {maxPages > 1 &&
                                            <Pagination currentPage={currentPage ? currentPage : "1"} maxPages={maxPages} />
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>

            {!isClient &&
                <div className="modals">
                    <ModalAddProduto />
                    <ModalAddAviso />
                </div>
            }
            
        </section>
    );
}