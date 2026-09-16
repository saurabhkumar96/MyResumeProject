import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'




const Register = () => {
    const { loading, handleRegister } = useAuth()

    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if(loading) return (<main><h1>loading...</h1></main>)
    
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor="username">username</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" id='username' name='username' placeholder='Enter username' className='border-2' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="email">email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id='email' name='email' placeholder='Enter email address' className='border-2' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="password">password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id='password' name='password' placeholder='Enter email address' className='border-2' />
                    </div>
                    <button className='cursor-pointer bg-amber-300 p-2 rounded-xl'>register</button>
                </form>
                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register