import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

import $ from 'jquery';

export default function ModalAddProduto () {

    const token = localStorage.getItem('userToken')

    const [categories, setCategories] = useState([])

    useEffect(() => {
        api.get('tag', {
            headers: {
                Authorization: token,
            },
            errorHandler: true,

        }).then(response => {
            setCategories(response.data.tags)
        })
        
    }, [token]);

    const [images, setImages] = useState([""])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [tag, setTag] = useState('')

    function closeProductModal () {
        $('#add_product').modal('hide');

        setImages([""])
        setName('')
        setDescription('')
        setPrice('')
        setQuantity('')
        setTag('')
    }

    function handleImage (input) {
        if (input.files && input.files[0]) {
            if (images.length === 7) {
                alert("Não é possível adicionar mais nenhuma imagem");
                return
            }

            if (input.files[0].size > 2000000) {
                alert("Imagem maior que 2MB");
                return
            }

            let reader = new FileReader()
            
            reader.onload = function (e) {
                setImages([...images.slice(0, images.length - 1), e.target.result, ""]);
            }

            reader.readAsDataURL(input.files[0])
        }
    }

    function handleDeleteImg (e, id) {
        e.preventDefault();
        setImages(images.filter((image, key) => key !== id-10))
    }
    
    async function handleAddProduct (e) {
        e.preventDefault();

        if (images.length === 1) {
            alert("Adicione pelo menos 1 foto do produto");
            return
        }

        const newimages = images.slice(0, images.length - 1)
        
        const data = {
            images: newimages,
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            tag: tag
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
                    <div className="modal-header">
                        <button onClick={closeProductModal} type="button" className="close">×</button>
                        <h4 className="modal-title">Adicionar Produto</h4>
                    </div>
                    <form onSubmit={handleAddProduct}>
                        <div className="modal-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Nome do produto"
                                    className="form-control"
                                    name="product_name"
                                    onChange={ e => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    value={description}
                                    placeholder="Descrição"
                                    className="form-control"
                                    onChange={ e => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <div id="image-upload" className="row">
                                    {images.map((image, id) => (
                                        <div key={id + 10} className="file-box col-md-3 col-sm-6 col-xs-12">
                                            <div 
                                                className="file-container background-fit" 
                                                style={image ? {backgroundImage: `url(${image})`} : null}
                                            >
                                                <input 
                                                    type="file" 
                                                    id={`file-input-${id + 10}`} 
                                                    className="file-input" 
                                                    onChange={e => handleImage(e.target)}
                                                />
                                                <label htmlFor={image ? "has-file" : `file-input-${id + 10}`}>
                                                    <i 
                                                        className={image ? "fa fa-trash" : "fa fa-plus"} 
                                                        title={image ? "Remover imagem" : "Adicionar imagem"} 
                                                        onClick={image ? e => handleDeleteImg(e, id + 10) : null}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <select 
                                    value={tag} 
                                    onChange={e => setTag(e.target.value)} 
                                    className="form-control" 
                                    title="Categoria"
                                    required
                                >
                                    <option value="" disabled>Categoria</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={price}
                                    placeholder="Preço"
                                    className="form-control"
                                    name="price"
                                    onChange={ e => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Quantidade"
                                    className="form-control"
                                    name="quantity"
                                    onChange={ e => setQuantity(e.target.value)}
                                    required
                                />
                            </div>
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