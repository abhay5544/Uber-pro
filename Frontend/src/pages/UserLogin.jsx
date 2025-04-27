import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [userData, setuserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault();
        setuserData({
            email: email,
            password: password
        })
        console.log(userData);
        setEmail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <img className='w-10 mb-10' src='https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp' alt="Logo" />
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

                    <p className='text-center text-lg'>New here? <Link to='/Signup' className='text-blue-600'>Create New Account</Link></p>
                </form>
            </div>
            <div>
                <Link 
                to='/Captain-Login'
                    className='bg-[#7daf37] flex items-center justify-center text-lg mb-5 rounded px-4 py-2 border w-full text-white placeholder:text-base'>
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default UserLogin
