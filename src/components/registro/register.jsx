import React, {useState} from 'react';
import axios from '../../api/axios';
import Logo from '../../images/logoAventurero.png';
import GolondrinaL from '../../images/birdLeft.png';
import GolondrinaR from '../../images/birdRight.png';
import './registro.css';


const REGISTRATION_URL = '/api/register'

function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post(REGISTRATION_URL, { 
                username: username, 
                password: password
            },
            {
                headers: {'Content-Type': 'application/json'} 
            })

            console.log(response.data)
            setSuccess(true)
        }catch{
                console.log('No funciona')
        }
        if (!username || !password) {
            console.log('Los campos son obligatorios');
            return;
        }
    
        try {
            const response = await axios.post(
                REGISTRATION_URL,
                { 
                    username: username, 
                    password: password
                },
                {
                    headers: {'Content-Type': 'application/json'} 
                }
            );
    
            console.log(response.data);
            setSuccess(true);
        } catch {
            console.log('No funciona');
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
                    <h2>¡Registro completado!</h2>
                    <a href='#' className='btn-login'>Ve al inicio de sesión</a>
                </section> 
            ) : (
                <section>

                    <h1>¡Registrate y <br/>
comienza tu aventura!</h1>
                        <div className='box-registration'>
                            <form onSubmit={handleSubmit}>
                                    <div  className="mb-3">
                                <label  className="form-label" htmlFor='username'>Usuario</label>
                                <input
                                    type='text'
                                    id='username'
                                    autoComplete='off'
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                    className='form-control'
                                    label='Usuario'
                                    minLength={6} 
                                />
</div>
<div  className="mb-3">
                                <label htmlFor='password'>Contraseña</label>
                                <input
                                    type='password'
                                    id='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    className='form-control'
                                    label='Contraseña'
                                    minLength={6} 
                                />
                                </div>
                                <button className='btnAzul'>Registrarse</button>
                                <a href="/login" className='btn-login'>Iniciar sesión</a>
                            </form>

                           
                        </div>
                </section>
            )}
    </div>
  )
}

export default Register