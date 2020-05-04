import React, { useState } from 'react';
import api from '../../../services/api';

import $ from 'jquery';

export default function ModalAddProduto () {

    const token = localStorage.getItem('userToken')

    const [name, setName] = useState('')
    const [tag, setTag] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')

    function closeProductModal () {
        $('#add_product').modal('hide');

        setName('')
        setTag('')
        setPrice('')
        setDescription('')
        setQuantity('')
    }
    
    async function handleAddProduct (e) {
        e.preventDefault();
        
        const data = {
            name: name,
            tag: tag,
            price: price,
            description: description,
            quantity: quantity
        };
        
        await api.post('product', data, {
            headers: {
                Authorization: token,
            },
            successHandler: true,
            errorHandler: true,

        }).then(response => {
            closeProductModal();
        })
        
    }

    return (
        <div id="add_product" className="modal fade" data-backdrop="static" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header login-header">
                        <button onClick={closeProductModal} type="button" className="close">×</button>
                        <h4 className="modal-title">Adicionar Produto</h4>
                    </div>
                    <form onSubmit={handleAddProduct}>
                        <div className="modal-body">
                            <input
                                type="text"
                                value={name}
                                placeholder="Nome do produto"
                                name="product_name"
                                onChange={ e => setName(e.target.value)}    
                                required
                            />
                            <input
                                type="text"
                                value={tag}
                                placeholder="Categoria"
                                name="tag"
                                onChange={ e => setTag(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                value={price}
                                placeholder="Preço"
                                name="price"
                                onChange={ e => setPrice(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                value={quantity}
                                placeholder="Quantidade"
                                name="quantity"
                                onChange={ e => setQuantity(e.target.value)}
                                required
                            />
                            <textarea
                                value={description}
                                placeholder="Descrição"
                                onChange={ e => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeProductModal} type="button" className="btn btn-black">Cancelar</button>
                            <button type="submit" className="btn btn-danger">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}