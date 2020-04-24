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

export default function DashProductEdit(props) {
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTc0MTE5M2FmMTlhNmFkMTc0ODYyZSIsImFjY2Vzc19sZXZlbCI6MywiaWF0IjoxNTg3Njg1OTQzLCJleHAiOjE1ODc3NzIzNDN9.frkQ2FjbTNgnvTaG3H5bW4MqFx6M7CzjP5U52O4xm9s"
    const history = useHistory()

    const productId = props.match.params.id
    
    const [product, setProduct] = useState({})
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tag] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    
    useEffect(() =>{
        api.get(`/product/${productId}`)
        .then(response => {
            setProduct(response.data)
        })
    })

    async function handleEditProduct (e) {
        e.preventDefault()
        const data = {
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            tag: tag
        }

        try {
            await api.put(`product/${productId}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            history.push('/produtos')
        } catch (err) {
            alert("Erro ao editar produto, tente novamente. "+err);
        }
    }

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
                                            <form onSubmit={handleEditProduct}>
                                                <div className="form-group">
                                                    <label>Título</label>
                                                    <input
                                                        placeholder={product.name}
                                                        type="text"
                                                        className="form-control"
                                                        value={name}
                                                        onChange={ e => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Descrição</label>
                                                    <textarea
                                                        placeholder={product.description}
                                                        className="form-control"
                                                        value={description}
                                                        onChange={e  => setDescription(e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Fotos do produto</label>
                                                    <input
                                                    type="file"
                                                    className="form-control-file"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Categorias</label>
                                                    <select multiple className="form-control" title="Pressione Ctrl para selecionar mais de uma categoria">
                                                        <option>{product.tag}</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Preço</label>
                                                    <input
                                                        placeholder={product.price}
                                                        className="form-control"
                                                        type="value"
                                                        value={price}
                                                        onChange = {e => setPrice(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Estoque</label>
                                                    <input
                                                        placeholder={product.quantity}
                                                        type="number"
                                                        className="form-control"
                                                        value={quantity}
                                                        onChange = {e => setQuantity(e.target.value)}
                                                    />
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