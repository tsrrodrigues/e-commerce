import React, { useState } from 'react';
import api from '../../../services/api';

export default function ModalAddProduto() {

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTc0MTE5M2FmMTlhNmFkMTc0ODYyZSIsImFjY2Vzc19sZXZlbCI6MywiaWF0IjoxNTg3NzY3MjU1LCJleHAiOjE1ODc4NTM2NTV9.54Km1ZrKeRtorTv2gpHfJNMiG6Zjy2Up3hxuzY8rOT4"

    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    
    async function handleAddProduct (e) {
        e.preventDefault();
        
        const data = {
            name: name,
            tag: tag,
            price: price,
            description: description,
            quantity: quantity
        };
        
        try {
            await api.post('product', data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
        } catch (err) {
            alert("Erro ao Adicionar produto, tente novamente. " + err);
        }
    }

    return (
        <div id="add_product" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header login-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Adicionar Produto</h4>
                    </div>
                    <form onSubmit={handleAddProduct}>
                        <div className="modal-body">
                            <input
                                type="text"
                                value={name}
                                placeholder="Nome do produto"
                                name="name"
                                onChange={ e => setName(e.target.value)}    
                            />
                            <input
                                type="text"
                                value={tag}
                                placeholder="Categoria"
                                name="tag"
                                onChange={ e => setTag(e.target.value)}
                            />
                            <input
                                type="text"
                                value={price}
                                placeholder="Preço"
                                name="price"
                                onChange={ e => setPrice(e.target.value)}
                            />
                            <input
                                type="text"
                                value={quantity}
                                placeholder="Quantidade"
                                name="quantity"
                                onChange={ e => setQuantity(e.target.value)}
                            />
                            <textarea
                                value={description}
                                placeholder="Descrição"
                                onChange={ e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="secondary" data-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-danger">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}