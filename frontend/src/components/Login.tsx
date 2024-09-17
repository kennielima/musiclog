"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Login = () => {
    const [guest, setGuest] = useState(true)
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({ ...prevInput, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (guest) {
                await axios.post('http://localhost:4001/signup', input);
                alert('Signup successful!');
                
            } else {
                await axios.post('http://localhost:4001/login', input);
                alert('Login successful!');
            }
            // const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_CALLBACK_URL || '')}&state=123&scope=user-read-private%20user-read-email&show_dialog=true`;
            window.location.href = '/home';
        } catch (err: any) {
            console.log(err)
            alert('Signup failed');
        }
    }
    const spotifyLogin = () => {
        window.location.href = 'http://localhost:4001/auth/spotify';
    };

    return (
        <main className='grid m-20 justify-center w-screen'>
            <div className='grid gap-3'>
                <h1 className='text-center text-3xl'>WELCOME TO MUSICLOG</h1>
                <p className='text-lg'>Select an option below to explore your playlist history</p>
            </div>
            <div className='flex gap-12 mt-20 justify-center'>
                <div className=' p-16 grid justify-center items-center text-lg w-auto h-auto bg-gray-500 rounded-xl'>
                    {/* <span>SPOTIFY</span> */}
                    <p>{guest ? "Signup" : "Login"}</p>
                    <form onSubmit={handleSubmit} className='grid'>
                        <label htmlFor='email'>email: </label>
                        <input
                            type='text'
                            name='email'
                            value={input.email}
                            className='border-0 outline-0 text-black'
                            onChange={handleChange} />

                        <label htmlFor='password'>password: </label>
                        <input
                            name='password'
                            type='text'
                            value={input.password}
                            className='border-0 outline-0 text-black'
                            onChange={handleChange} />
                        <button type='submit' className='bg-blue-700 rounded-lg mt-2'>submit</button>
                        {guest ? (
                            <p className='cursor-pointer' onClick={() => setGuest(false)}>Already have an account?</p>
                        ) : (
                            <p className='cursor-pointer' onClick={() => setGuest(true)}>Don't have an account?</p>
                        )}
                    </form>
                    {/* <Link
                     href='http://localhost:4001/auth/spotify'
                     > */}
                    <button
                        className='bg-blue-800 rounded-lg m-6 mb-0'
                        onClick={spotifyLogin}
                    >
                        Login with spotify
                    </button>
                    {/* </Link> */}
                </div>
                {/* <div
                    className='grid justify-center items-center text-lg w-56 h-56 bg-gray-500 rounded-xl'
                >
                    APPLE
                </div> */}
            </div>
        </main>
    )
}

export default Login