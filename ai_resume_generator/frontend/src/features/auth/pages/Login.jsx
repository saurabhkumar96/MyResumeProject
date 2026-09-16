import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'




const Login = () => {
    
    const navigate = useNavigate()
    
    const { loading,handleLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e)=>{
        e.preventDefault()
        await handleLogin({email,password})
        navigate("/")
    }

    if(loading){
        return (<main><h1>loading...</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor="email">email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id='email' name='email' placeholder='Enter email address' className='border-2' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="password">password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id='password' name='password' placeholder='Enter email address' className='border-2' />
                    </div>
                    <button className='cursor-pointer bg-amber-300 p-2 rounded-xl'>Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login