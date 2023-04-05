import React, { useState } from 'react';
import axios from '../../api/axios';

const LOGIN_URL = '/api/login_check';


function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({username: username, password: password}),
                    {
                        headers:{'content-Type' : 'application/json'},
                        withCredentials: true
                    }
            )

            const accessToken = response.data;
            const user = { username: username, accessToken: accessToken };
            
            const storedToken = window.localStorage.setItem(
                'loggedAppUser', JSON.stringify(user)
            );

            console.log(storedToken)

            setUsername('')
            setPassword('')
            setSuccess(true)

            console.log('¡Estás logead@!')

        }catch (err){
            console.log('Oh vaya! No funciona ...')
        }
    }

  return (
    <div>
        {success ? (
            <section className='success'>
                <h2>¡Has iniciado sesión!</h2>
                <a href='#' className='btn-login'>Ve al inicio</a>
            </section> 
        ) : (
            <section>
                <h1>Login</h1>
                    <div className='box-fichaje'>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='username'>username</label>
                            <input
                                type='text'
                                id='username'
                                autoComplete='off'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />

                            <label htmlFor='password'>Contraseña</label>
                            <input
                                type='password'
                                id='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <button className='btn'>Entrar</button>
                        </form>

                        <a href="#" className='btn-password'>Recuperar Contraseña</a>
                    </div>
            </section>
        )}
    </div>
  )
}

export default Login;