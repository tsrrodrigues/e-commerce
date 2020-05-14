import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

export default function DashConfig () {

    const user_name = localStorage.getItem('userDisplayName')
    const token = localStorage.getItem('userToken')

    const [market, setMarket] = useState({ adress: {} })

    const UFs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", 
                 "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", 
                 "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

    useEffect(() => {
        api.get('market', {
            headers: {
                Authorization: token,
            },
            errorHandler: true,

        }).then(response => {
            setMarket(response.data)
        })

    }, [token])

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [cnpj, setCNPJ] = useState('')

    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [uf, setUf] = useState('')

    async function handleMarketEdit (e) {
        e.preventDefault();
        
        if (!market.adress && (!cep || !logradouro || !complemento || !bairro || !localidade || !uf)) {
            alert("Preencha todos os dados de endereço");
            return
        }

        const data = {
            name: name? name :  market.name,
            description: description? description : market.description,
            email: email? email : market.email,
            cnpj: cnpj? cnpj : market.cnpj,

            adress : {
                cep: cep? cep: market.adress.cep,
                logradouro: logradouro? logradouro : market.adress.logradouro,
                complemento: complemento? complemento : market.adress.complemento,
                bairro: bairro? bairro : market.adress.bairro,
                localidade: localidade? localidade : market.adress.localidade,
                uf: uf? uf : market.adress.uf,
            }
        };

        if (market.adress) {
            await api.put(`market`, data, {
                headers: {
                    Authorization: token,
                },
                successHandler: true,
                errorHandler: true,

            }).then(response => {
                setMarket(response.data)
            })
        }
        else {
            await api.post(`market`, data, {
                headers: {
                    Authorization: token,
                },
                successHandler: true,
                errorHandler: true,

            }).then(response => {
                setMarket(response.data)
            })
        }
    }

    document.title = "Ajustes";

    return (
        <section className="dashboard">
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <SideBar nav="adjusts"/>
                   
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                        <HeaderTop />
                        
                        <div className="user-dashboard">
                            <h1>Olá, {user_name}</h1>
                            <div id="info-div"></div>

                            <div className="row">
                                <div className="col-md-10 col-sm-11 col-xs-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Ajustes</h2>
                                        </div>

                                        <div className="card-body">
                                            <form onSubmit={handleMarketEdit}>
                                                <div className="form-group">
                                                    <label>Título do site</label>
                                                    <input
                                                        defaultValue={market.name}
                                                        type="text"
                                                        className="form-control"
                                                        onChange={e => setName(e.target.value)}
                                                        name="site"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Descrição</label>
                                                    <textarea
                                                        defaultValue={market.description}
                                                        className="form-control"
                                                        onChange={e  => setDescription(e.target.value)} 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Email de contato</label>
                                                    <input 
                                                        type="email" 
                                                        defaultValue={market.email} 
                                                        onChange={e => setEmail(e.target.value)} 
                                                        className="form-control" 
                                                        name="email" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>CNPJ</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={market.cnpj} 
                                                        onChange={e => setCNPJ(e.target.value)} 
                                                        className="form-control" 
                                                        name="cnpj" 
                                                        required
                                                    />
                                                </div>

                                                <button type="submit" className="btn btn-danger">Salvar</button>
                                            </form>
                                        </div>

                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Endereço</h2>

                                        </div>

                                        <div className="card-body">
                                            <form onSubmit={handleMarketEdit}>
                                                <div className="form-group">
                                                    <label>CEP</label>
                                                    <input 
                                                        type="number" 
                                                        defaultValue={market.adress ? market.adress.cep : null} 
                                                        onChange={e => setCep(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Endereço</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={market.adress ? market.adress.logradouro : null} 
                                                        onChange={e => setLogradouro(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Complemento</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={market.adress ? market.adress.complemento : null} 
                                                        onChange={e => setComplemento(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Bairro</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={market.adress ? market.adress.bairro : null} 
                                                        onChange={e => setBairro(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Cidade</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={market.adress ? market.adress.localidade : null} 
                                                        onChange={e => setLocalidade(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>UF</label>
                                                    <select 
                                                        value={uf ? uf : market.adress ? market.adress.uf : uf}
                                                        onChange={e => setUf(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    >
                                                        {UFs.map((uf, key) => (
                                                            <option key={key} value={uf}>{uf}</option>
                                                        ))}
                                                    </select>
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