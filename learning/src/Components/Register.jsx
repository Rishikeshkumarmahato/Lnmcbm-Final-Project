import React, { useState } from 'react'
import './Register.css';
import img1 from '../assets/register.jpg'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const [studentRecord, setstudentRecord] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    })

    const onSubmit = async(data) => {
        try {
            const r = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            const res = await r.json()
            
            if (res.success) {
                alert("Registration successful! Please login.")
                navigate("/login")
            } else {
                alert(res.message || "Registration failed")
            }

            setstudentRecord({
                username: "",
                email: "",
                phone: "",
                password: ""
            })
        } catch (error) {
            alert("An error occurred during registration")
            console.error("Registration error:", error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setstudentRecord({
            ...studentRecord,
            [name]: value
        })
    }

    return (
        <div className='register'>
            <div className='register_img'>
                <img src={img1} alt="Register" />
            </div>
            <div className='register_container'>
                <h1>Register Here</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='register_box'>
                        <i className="fa-solid fa-user"></i>
                        <input 
                            type="text" 
                            placeholder='Enter username' 
                            {...register("username", {
                                required: {value: true, message: "This field is required"},
                                minLength: {value: 3, message: "Min length is 3"},
                                maxLength: {value: 25, message: "Max length is 25"}
                            })} 
                            value={studentRecord.username} 
                            onChange={handleChange} 
                        />
                    </div>
                    {errors.username && <p className='error'>{errors.username.message}</p>}
                    <div className='register_box'>
                        <i className="fa-solid fa-envelope"></i>
                        <input 
                            type="text" 
                            placeholder='Enter Email' 
                            {...register("email", {
                                required: {value: true, message: "This field is required"},
                                minLength: {value: 11, message: "Min length is 11"}
                            })} 
                            value={studentRecord.email} 
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                    <div className='register_box'>
                        <i className="fa-solid fa-phone"></i>
                        <input 
                            type="text" 
                            placeholder='Phone number'
                            {...register("phone", {
                                required: {value: true, message: "This field is required"},
                                minLength: {value: 10, message: "Min length is 10"},
                                maxLength: {value: 10, message: "Max length is 10"}
                            })} 
                            value={studentRecord.phone} 
                            onChange={handleChange}
                        />
                    </div>
                    {errors.phone && <p className='error'>{errors.phone.message}</p>}
                    <div className='register_box'>
                        <i className="fa-solid fa-lock"></i>
                        <input 
                            type="password" 
                            placeholder='Password' 
                            {...register("password", {
                                required: {value: true, message: "This field is required"},
                                minLength: {value: 5, message: "Min length is 5"},
                                maxLength: {value: 20, message: "Max length is 20"}
                            })} 
                            value={studentRecord.password} 
                            onChange={handleChange}
                        />
                    </div>
                    {errors.password && <p className='error'>{errors.password.message}</p>}
                    <div className='register_box'>
                        <button type="submit">Register</button>
                        <p onClick={() => navigate('/login')}>Already Registered?</p>
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

export default Register