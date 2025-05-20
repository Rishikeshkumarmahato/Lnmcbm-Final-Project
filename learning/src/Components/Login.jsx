import React, { useState } from 'react'
import './Login.css';
import img1 from '../assets/login.jpg'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const { login } = useAuth()

    const [studentLogin, setstudentLogin] = useState({
        email: "",
        password: ""
    })

    const onSubmit = async(data) => {
        try {
            const r = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            const res = await r.json()
            
            if (res.success) {
                // Store the token in localStorage
                localStorage.setItem('token', res.token);
                
                // Use the login function from context
                login(res.user)
                
                // Reset form state
                setstudentLogin({
                    email: "",
                    password: ""
                })
                
                // Navigate after login is complete
                navigate("/")
            } else {
                alert(res.message || "Login failed")
            }
        } catch (error) {
            alert("An error occurred during login")
            console.error("Login error:", error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setstudentLogin({
            ...studentLogin,
            [name]: value
        })
    }

    return (
        <div className='login'>
            <div className='login_img'>
                <img src={img1} alt="Login" />
            </div>
            <div className='login_container'>
                <h1>Login Here</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='login_box'>
                        <i className="fa-solid fa-envelope"></i>
                        <input 
                            type="email" 
                            name="email"
                            placeholder='Enter email' 
                            {...register("email", {
                                required: {value: true, message: "Email is required"},
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Please enter a valid email address"
                                }
                            })} 
                            value={studentLogin.email} 
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                    <div className='login_box'>
                        <i className="fa-solid fa-lock"></i>
                        <input 
                            type="password" 
                            name="password"
                            placeholder='Password' 
                            {...register("password", {
                                required: {value: true, message: "Password is required"},
                                minLength: {value: 5, message: "Password must be at least 5 characters"},
                                maxLength: {value: 20, message: "Password cannot exceed 20 characters"}
                            })} 
                            value={studentLogin.password} 
                            onChange={handleChange}
                        />
                    </div>
                    {errors.password && <p className='error'>{errors.password.message}</p>}
                    <div className='login_box'>
                        <button type="submit">Login</button>
                        <p onClick={() => navigate('/register')}>Need an account?</p>
                    </div>
                </form>
                <div className='login_with'>
                    <h1>-----------Login With-------------</h1>
                    <div className='login_icons'>
                        <i className="fa-brands fa-google"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-github"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login