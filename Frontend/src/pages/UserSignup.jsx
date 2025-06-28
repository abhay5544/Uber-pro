import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);
                navigate('/Home');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. Please try again!');
        }

        setEmail('');
        setFirstname('');
        setLastname('');
        setPassword('');
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <img 
                className='w-14 mb-10' 
                src='https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp' 
                alt="Logo" 
            />
            <div>
                <form onSubmit={submitHandler}>
                    <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
                    <div className='flex gap-4 mb-6'>
                        <input
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                            placeholder='First name'
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                        <input
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                            placeholder='Last name'
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>

                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        type='email'
                        placeholder='example@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter password</h3>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] text-black mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base'
                        required
                    />

                    <button
                        type="submit"
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>
                        Create account
                    </button>

                    <p className='text-center text-lg'>
                        Already have an account?
                        <Link to='/Login' className='text-blue-600'> Login here</Link>
                    </p>
                </form>
            </div>

            <div>
                <p className='text-[10px] leading-tight'>
                    This site is protected by reCAPTCHA and the
                    <span className='text-blue-600 underline'> Google Privacy Policy</span> and
                    <span className='text-blue-600 underline'> Terms of Service</span> apply.
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
