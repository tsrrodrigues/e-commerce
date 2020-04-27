import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';

import SideBar from '../content/SideBar';
import HeaderTop from '../content/HeaderTop';
import ModalAddProduto from '../content/ModalAddProduto';
import ModalAddAviso from '../content/ModalAddAviso';

import userImg from '../../../assets/img/user-circle-solid.svg';

export default function DashUser() {
    const user_id = localStorage.getItem('userID')
    const token = localStorage.getItem('userToken')

    const [user, SetUser] = useState({ adress: {} })

    const [name, SetName] = useState('')
    const [email, SetEmail] = useState('')
    const [cpf, SetCpf] = useState('')
    const [password, SetPassword] = useState('')

    const [cep, SetCep] = useState('')
    const [logradouro, SetLogradouro] = useState('')
    const [complemento, SetComplemento] = useState('')
    const [bairro, SetBairro] = useState('')
    const [localidade, SetLocalidade] = useState('')
    const [uf, SetUf] = useState('')

    async function handleUserEdit(e) {
        e.preventDefault();
        
        const data = {
            name: name? name : user.name,
            cpf: cpf? cpf : user.cpf,
            email: email? email : user.email,

            adress : {
                cep: cep? cep: user.adress.cep,
                logradouro: logradouro? logradouro : user.adress.logradouro,
                complemento: complemento? complemento : user.adress.complemento,
                bairro: bairro? bairro : user.adress.bairro,
                localidade: localidade? localidade : user.adress.localidade,
                uf: uf? uf : user.adress.uf,
            },

            password,
        };

        try {
            await api.put(`user/${user_id}`, data, {
                headers: {
                    Authorization: token,
                }
            })
        } catch (err) {
            alert('Não foi possível atualizar o usuário. ' + err);
        }
    }

    useEffect(() => {
        api.get(`user/${user_id}`, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            SetUser(response.data);
        })
    }, [user_id, token, user.name]);

    document.title = `Perfil de Usuário: ${user.name}`;

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
                                            <h2>Seu perfil</h2>

                                        </div>

                                        <div className="card-body">
                                            <form onSubmit={handleUserEdit}>
                                                <img src={userImg} className="user-img" alt="foto"/>

                                                <div className="form-group">
                                                    <label>Foto de perfil</label>
                                                    <input type="file" className="form-control-file"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Nome</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={user.name} 
                                                        onChange={e => SetName(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Sobrenome</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue="Silva" 
                                                        className="form-control" 
                                                        disabled
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input 
                                                        type="email" 
                                                        defaultValue={user.email} 
                                                        onChange={e => SetEmail(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>CPF</label>
                                                    <input 
                                                        type="number" 
                                                        defaultValue={user.cpf} 
                                                        onChange={e => SetCpf(e.target.value)} 
                                                        className="form-control" 
                                                        name="cpf" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Senha (confirme ou troque a senha)</label>
                                                    <input 
                                                        type="password" 
                                                        defaultValue={password} 
                                                        onChange={e => SetPassword(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>

                                                <button type="submit" className="btn btn-danger">Salvar</button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Dados de entrega</h2>

                                        </div>

                                        <div className="card-body">
                                            <form onSubmit={handleUserEdit}>
                                                <div className="form-group">
                                                    <label>Telefone</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue="(00) 0000-0000" 
                                                        className="form-control" 
                                                        disabled 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>CEP</label>
                                                    <input 
                                                        type="number" 
                                                        defaultValue={user.adress.cep} 
                                                        onChange={e => SetCep(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Endereço</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={user.adress.logradouro} 
                                                        onChange={e => SetLogradouro(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Complemento</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={user.adress.complemento} 
                                                        onChange={e => SetComplemento(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Bairro</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={user.adress.bairro} 
                                                        onChange={e => SetBairro(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Cidade</label>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={user.adress.localidade} 
                                                        onChange={e => SetLocalidade(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>UF</label>
                                                    <select 
                                                        value={uf ? uf : user.adress.uf}
                                                        onChange={e => SetUf(e.target.value)} 
                                                        className="form-control" 
                                                        required
                                                    >
                                                        <option value="AC">AC</option>
                                                        <option value="AL">AL</option>
                                                        <option value="AP">AP</option>
                                                        <option value="AM">AM</option>
                                                        <option value="BA">BA</option>
                                                        <option value="CE">CE</option>
                                                        <option value="DF">DF</option>
                                                        <option value="ES">ES</option>
                                                        <option value="GO">GO</option>
                                                        <option value="MA">MA</option>
                                                        <option value="MT">MT</option>
                                                        <option value="MS">MS</option>
                                                        <option value="MG">MG</option>
                                                        <option value="PA">PA</option>
                                                        <option value="PB">PB</option>
                                                        <option value="PR">PR</option>
                                                        <option value="PE">PE</option>
                                                        <option value="PI">PI</option>
                                                        <option value="RJ">RJ</option>
                                                        <option value="RN">RN</option>
                                                        <option value="RS">RS</option>
                                                        <option value="RO">RO</option>
                                                        <option value="RR">RR</option>
                                                        <option value="SC">SC</option>
                                                        <option value="SP">SP</option>
                                                        <option value="SE">SE</option>
                                                        <option value="TO">TO</option>
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