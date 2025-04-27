import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [CaptainData, setCaptainData] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({
            email: email,
            password: password
        })
        console.log(userData);
        setEmail('');
        setPassword('');
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
            <img className='w-20 mb-3' src='https://pngimg.com/d/uber_PNG24.png' alt="Logo" />
            <div>
                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-xl mb-2'>What's your email</h3>
                    <input 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type='email' 
                        placeholder='example@gmail.com' 
                    />

                    <h3 className='text-xl font-medium mb-2'>Enter password</h3>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] text-black mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
                        type='password' 
                        placeholder='Password' 
                    />
                    <button 
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                        Login
                    </button>

                    <p className='text-center text-lg'>Join a fleet? <Link to='/Captain-Signup' className='text-blue-600'>Register as a Captain </Link></p>
                </form>
            </div>
            <div>
                <Link
                to='/Login'
                    className='bg-[#d5622d] flex items-center justify-center text-lg mb-5 rounded px-4 py-2 border w-full text-white placeholder:text-base'>
                    Sign in as User
                </Link>
            </div>
        </div>
  )
}

export default CaptainLogin
