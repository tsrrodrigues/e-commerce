import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

export default function LoginForm () {

    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')

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
            const firstname = response.data.user.name.first
            const lastfull = response.data.user.name.last.split(' ')
            const lastname = lastfull[lastfull.length - 1]

            localStorage.setItem('userDisplayName', `${firstname} ${lastname}`)
            localStorage.setItem('userID', response.data.user._id)
            localStorage.setItem('userToken', `Bearer ${response.data.token}`)

            history.push('/');
        })
        
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label>Email</label>
                <input 
                    value={email} 
                    onChange={e => SetEmail(e.target.value)} 
                    name="email" 
                    className="form-control" 
                    type="text" 
                />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <input 
                    value={password} 
                    onChange={e => SetPassword(e.target.value)} 
                    name="senha" 
                    className="form-control" 
                    type="password" 
                />
            </div>

            <button type="submit" className="btn btn-danger">Entrar</button>
        </form>
    );
}