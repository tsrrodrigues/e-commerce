import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

export default function LoginForm() {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const history = useHistory();

    async function handleLogin (e) {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        try {
            await api.post('user/authenticate', 
                data,
            ).then(response=> {
                localStorage.setItem('userID', response.data.user._id);
                localStorage.setItem('userToken', `Bearer ${response.data.token}`);

                history.push('/');
            })
        } catch (err) {
            alert('Não foi possível logar, tente novamente.')
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label>Email</label>
                <input value={email} onChange={e => SetEmail(e.target.value)} name="email" className="form-control" type="text" />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <input value={password} onChange={e => SetPassword(e.target.value)} name="senha" className="form-control" type="password" />
            </div>

            <button type="submit" className="btn btn-danger">Entrar</button>
        </form>
    );
}