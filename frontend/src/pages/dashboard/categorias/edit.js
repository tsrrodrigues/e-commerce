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

export default function DashCategoryEdit (props) {

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')
    const cat_id = props.match.params.id
    
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    
    useEffect(() => {
        api.get('tag', {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setCategory(response.data.find(category => category._id === cat_id))

            if (category.name !== undefined)  {
                api.get(`product/admin?tag=${category.name}`, {
                    headers: {
                        Authorization: token,
                    }
                }).then(response => {
                    setProducts(response.data)
                })
            }      
        })
        
    }, [token, cat_id, category.name]);

    async function handleEditCategory (e) {
        e.preventDefault();

        const data = {
            name,
        };

        try {
            await api.put(`tag/${cat_id}`, data, {
                headers: {
                    Authorization: token,
                }
            })
        } catch (err) {
            alert('Erro ao editar nome.');
        }

        setName('')
    }

    async function handleRemoveProduct (product) {
        const name = product.name;
        const description = product.description;
        const price = product.price;
        const quantity = product.quantity;
        const tag = "";

        const data = {
            name,
            description,
            price,
            quantity,
            tag,
        };

        try {
            await api.put(`product/${product._id}`, data, {
                headers: {
                    Authorization: token
                }
            })
        } catch (err) {
            alert('Erro ao remover produto da categoria.')
        }

        setProducts(products.filter(p =>  p._id !== product._id))
    }

    document.title = `Editar categoria: ${category.name}`;

    return (
        <section className="dashboard">
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <SideBar />
                   
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                        <HeaderTop />
                        
                        <div className="user-dashboard">
                            <h1>Olá, {user_name}</h1>
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
                                                        <th scope="col" className="hidden-xs">Outras Cat.</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {products.map(product => (
                                                    <tr key={product._id}>
                                                        <th scope="row">{product.name}</th>
                                                        <td className="hidden-xs">0</td>
                                                        <td>
                                                            <button onClick={() => handleRemoveProduct(product)} className="btn btn-danger" type="button">
                                                                <i id="icon" className="fa fa-trash-alt"></i>
                                                                <span id="details">Remover</span>
                                                            </button>
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