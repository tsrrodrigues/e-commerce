import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

export default function LoginForm () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    async function handleLogin (e) {
        e.preventDefault();

        const data = {
            email,
            password,
        };
        
        await api.post('user/authenticate', data, { 
            errorHandler: true,
            
        }).then(response => {
            if (response.data.user.access_level === 1) {
                alert("Clientes não podem acessar o painel")
            }
            else if (response.data.user) {
                const firstname = response.data.user.name.first
                const lastfull = response.data.user.name.last.split(' ')
                const lastname = lastfull[lastfull.length - 1]

                localStorage.setItem('userDisplayName', `${firstname} ${lastname}`)
                localStorage.setItem('userImage', response.data.user.image)
                localStorage.setItem('userID', response.data.user._id)
                localStorage.setItem('userToken', `Bearer ${response.data.token}`)
                localStorage.setItem('userLevel', response.data.user.access_level)

                history.push('/');
            }
        })
        
    }

    return (
        <form onSubmit={handleLogin}>
            <div id="info-div"></div>

            <div className="form-group">
                <label>Email</label>
                <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    name="email" 
                    className="form-control" 
                    type="text" 
                />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <input 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    name="senha" 
                    className="form-control" 
                    type="password" 
                />
            </div>

            <button type="submit" className="btn btn-danger">Entrar</button>
        </form>
    );
}