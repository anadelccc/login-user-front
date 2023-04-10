import React, { useState } from 'react';
import axios from '../../api/axios';
import './login.css'
import Logo from '../../images/logoAventurero.png'
import GolondrinaL from '../../images/birdLeft.png'
import GolondrinaR from '../../images/birdRight.png'

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
         <header>
           
           <img src={GolondrinaL} id="bird1" />
           <img src={Logo} />
          <img src={GolondrinaR} id="bird2" /> 
      </header>
        {success ? (
            <section className='success'>
                <h2>¡Has iniciado sesión!</h2>
                <a href='#' className='btn-login'>Ve a las cards</a>
            </section> 
        ) : (
            <section>
                <h1>Login</h1>
                    <div className='box-fichaje'>
                        <form onSubmit={handleSubmit}>
                        <div  className="mb-3">
                            <label htmlFor='username' className="form-label" >Usuario</label>
                                <input
                                    type='text'
                                    id='username'
                                    autoComplete='off'
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                    className='form-control'
                                   
                                />
                            </div>
                            <div  className="mb-3">
                                <label htmlFor='password' className="form-label" >Contraseña</label>
                                <input
                                    type='password'
                                    id='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    className='form-control'
                                    minLength={6} 
                                />
                            </div>
                            <button className='btnAzul'>Entrar</button>
                            <a href="#" className='btn-password clearall'>Recuperar Contraseña</a>
                        </form>
                        <div  className="mb-3">
                       
                        </div>
                    </div>
            </section>
        )}
    </div>
  )
}

export default Login;