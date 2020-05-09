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

export default function DashProductEdit (props) {

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')

    const [product, setProduct] = useState({ images: [], tag: {} })
    const productId = props.match.params.id
    const apiURL = api.defaults.baseURL

    const [categories, setCategories] = useState([])
    const history = useHistory()
    
    useEffect(() =>{
        api.get(`/product/${productId}`, {
            errorHandler: true,

        }).then(response => {
            setProduct(response.data)
            setImages(response.data.images)
            setImages(prevImages => [...prevImages, ""])
        })

    }, [productId]);

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
    
    const [images, setImages] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')
    const [newTag, setNewTag] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    function imageFilter (image) {
        if (image.charAt(0) === '/')
            return apiURL + image

        return image
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
        setImages(images.filter((image, key) => key !== id))
    }

    async function handleAddNewTag () {
        if (newTag === '') 
            return
        
        const data = {
            name: newTag, 
        };

        await api.post("tag", data, {
            headers: {
                Authorization: token,
            },
            errorHandler: true,

        }).then(response => {
            setCategories(prevTags => [...prevTags, response.data])
            setTag(newTag)
            setNewTag('')
        })

    }

    async function handleEditProduct (e) {
        e.preventDefault();

        if (images.length === 1) {
            alert("Adicione pelo menos 1 foto do produto");
            return
        }

        const data = {
            images,
            name: name ? name : product.name,
            description: description ? description : product.description,
            price: price ? price : product.price,
            quantity: quantity ? quantity : product.quantity,
            tag: tag ? tag : product.tag.name
        };

        api.put(`product/${productId}`, data, {
            headers: {
                Authorization: token,
            },
            successHandler: true,
            errorHandler: true,

        }).then(response => {
            history.push('/produtos')
        })

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
                            <h1>Olá, {user_name}</h1>
                            <div id="info-div"></div>

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
                                                        onChange={e => setName(e.target.value)}
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

                                                    <div id="image-upload" className="row">
                                                        {images.map((image, id) => {
                                                            const imagedone = imageFilter(image);

                                                            return (
                                                                <div key={id} className="file-box col-md-3 col-sm-6 col-xs-12">
                                                                    <div 
                                                                        className="file-container background-fit" 
                                                                        style={image ? {backgroundImage: `url(${imagedone})`} : null}
                                                                    >
                                                                        <input 
                                                                            type="file" 
                                                                            id={`file-input-${id}`} 
                                                                            className="file-input" 
                                                                            onChange={e => handleImage(e.target)}
                                                                        />
                                                                        <label htmlFor={image ? "has-file" : `file-input-${id}`}>
                                                                            <i 
                                                                                className={image ? "fa fa-trash" : "fa fa-plus"} 
                                                                                title={image ? "Remover imagem" : "Adicionar imagem"} 
                                                                                onClick={image ? e => handleDeleteImg(e, id) : null}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    
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
                                                            {categories.map(cat => (
                                                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                                                            ))}
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
                                                        <button onClick={handleAddNewTag} type="button" className="btn btn-danger">
                                                            Add
                                                        </button>
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