import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

export default function DashCategories() {
    
    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')
    const user_access = localStorage.getItem('userLevel')

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    
    const [name, setName] = useState('')
    const [cat_edited, setCatEdited] = useState(0)

    const query = queryString.parse(window.location.search)
    const [currentPage, setCurrentPage] = useState(query.page)
    const [maxPages, setMaxPages] = useState(1)

    const isClient = parseInt(user_access) === 1 ? true : false

    useEffect(() => {
        api.get(`tag?p=${currentPage ? currentPage : "1"}`, {
            headers: {
                Authorization: token,
            },
            errorHandler: true,

        }).then(response => {
            setCategories(response.data.tags)
            setMaxPages(response.data.pages)
        })
        
    }, [token, cat_edited, currentPage]);

    useEffect(() => {
        api.get(`/product/admin`, {
            headers: {
                Authorization: token,
            },
            errorHandler: true,

        }).then(response => {
            setProducts(response.data.products)
        })
        
    }, [token]);

    useEffect(() => {
        setCurrentPage(query.page)

    }, [query.page]);

    function countProductsInCategory (cat_id) {
        const category = products.filter(product => product.tag._id === cat_id)
        const nProducts = category.length
        
        return nProducts;
    }

    async function handleAddCategory (e) {
        e.preventDefault();
        
        const data = {
           name, 
        };

        await api.post("tag", data, {
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

    async function handleDeleteCategory (id, nProducts) {
        if (nProducts > 0) {
            alert('Não é possivel apagar pois há produtos na categoria')
            return
        }

        await api.delete(`tag/${id}`, {
            headers: {
                Authorization: token,
            },
            successHandler: true,
            errorHandler: true,
            
        }).then(response => {
            setCategories(categories.filter(category => category._id !== id))
        })

    }

    document.title = "Categorias";

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
                                <div className="col-lg-5 col-md-4 col-sm-4 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Adicionar nova categoria</h2>
                                        </div>

                                        <div className="card-body">
                                            <form onSubmit={handleAddCategory}>
                                                <div className="form-group">
                                                    <label>Nome</label>
                                                    <input 
                                                        value={name} 
                                                        onChange={e => setName(e.target.value)} 
                                                        type="text" className="form-control" 
                                                        placeholder="Exemplo: Casa"
                                                    />
                                                </div>

                                                <button className="btn btn-danger" type="submit">Adicionar</button>
                                            </form>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-lg-7 col-md-8 col-sm-8 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Categorias</h2>

                                        </div>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Categoria</th>
                                                        <th scope="col" className="hidden-xs hidden-sm">Produtos</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categories.map(category => {
                                                        const catProducts = countProductsInCategory(category._id)

                                                        return (
                                                            <tr key={category._id}>
                                                                <th scope="row">{category.name}</th>
                                                                <td className="hidden-xs hidden-sm">{catProducts}</td>
                                                                <td>
                                                                    <Link to={`/categorias/${category._id}`} className="btn btn-danger">
                                                                        <i id="icon" className="fa fa-pencil-alt"></i>
                                                                        <span id="details">Editar</span>
                                                                    </Link>

                                                                    <button 
                                                                        onClick={() => handleDeleteCategory(category._id, catProducts)} 
                                                                        className="btn btn-danger" 
                                                                        type="button"
                                                                    >
                                                                        <i id="icon" className="fa fa-trash-alt"></i>
                                                                        <span id="details">Apagar</span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            );
                                                        })}
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