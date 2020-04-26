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
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTc0MTE5M2FmMTlhNmFkMTc0ODYyZSIsImFjY2Vzc19sZXZlbCI6MywiaWF0IjoxNTg3ODQyNjAzLCJleHAiOjE1ODc5MjkwMDN9.bir_nwV4Lbi2xURCnZWJ-_jpTIrogkQj8qYOyODubfY"
    const history = useHistory()

    const productId = props.match.params.id
    
    const [product, setProduct] = useState({ tag: {} })
    
    useEffect(() =>{
        api.get(`/product/${productId}`)
        .then(response => {
            setProduct(response.data)
        })
    }, [productId])
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')
    const [newTag, setNewTag] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    function addNewTag () {
        const select = document.getElementById("select-tag")
        const option = document.createElement("option")
        const tag = document.createTextNode(newTag)

        option.appendChild(tag)
        option.value = newTag
        select.appendChild(option)

        setNewTag('')
        setTag(newTag)
    }

    async function handleEditProduct (e) {
        e.preventDefault()
        const data = {
            name: name? name : product.name,
            description: description? description : product.description,
            price: price? price : product.price,
            quantity: quantity? quantity : product.quantity,
            tag: tag? tag : product.tag
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

    document.title = `Editar Produto: ${product.name}`;
    
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
                                                        defaultValue={product.name}
                                                        type="text"
                                                        className="form-control"
                                                        onChange={ e => setName(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Descrição</label>
                                                    <textarea
                                                        defaultValue={product.description}
                                                        className="form-control"
                                                        onChange={e  => setDescription(e.target.value)} 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Fotos do produto</label>
                                                    <input
                                                        type="file"
                                                        className="form-control-file"
                                                    />
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-lg-8 col-md-6 col-xs-12">
                                                        <label>Categoria</label>
                                                        <select 
                                                            value={tag ? tag : product.tag.name} 
                                                            onChange={e => setTag(e.target.value)} 
                                                            id="select-tag" 
                                                            className="form-control" 
                                                            required
                                                        >
                                                            <option value="id, nome, objeto">tag</option>
                                                            <option value={product.tag.name}>{product.tag.name}</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-inline col-lg-4 col-md-6 col-xs-12">
                                                        <label>Adicionar nova</label>
                                                        <input 
                                                            value={newTag} 
                                                            onChange = {e => setNewTag(e.target.value)} 
                                                            className="form-control" 
                                                            type="text"
                                                        />
                                                        <button onClick={addNewTag} type="button" className="btn btn-danger">Add</button>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Preço</label>
                                                    <input
                                                        defaultValue={product.price}
                                                        className="form-control"
                                                        type="value"
                                                        onChange = {e => setPrice(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Estoque</label>
                                                    <input
                                                        defaultValue={product.quantity}
                                                        type="number"
                                                        className="form-control"
                                                        onChange = {e => setQuantity(e.target.value)}
                                                        required
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