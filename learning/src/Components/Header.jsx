import React, { useState, useRef, useEffect } from 'react'
import logo from '../assets/logo.png'
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Robot from './Robot';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [index, setIndex] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const navigate = useNavigate()
    const { isLoggedIn, user, logout } = useAuth();

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleChange=(e)=>{
        const selectedIndex=e.target.value;
        setIndex(selectedIndex);
        navigate(`/courses/${selectedIndex}`);
    }

    const handleLogout = () => {
        setIsMenuOpen(false)
        logout();
        navigate('/');
    }

    const handleMenuClick = (path) => {
        setIsMenuOpen(false)
        navigate(path)
    }

    return (
        <>
        <Robot/>
        <div className='container'>
            <div className='logo'>
                <img src={logo} alt="..." />
                <select name="All Courses" value={index} onChange={handleChange}>
                    <option value={0} selected>All Courses</option>
                    <option value={0}>Engineering & Technology</option>
                    <option value={1}>Health Sciences</option>
                    <option value={2}>Humanities and Arts</option>
                    <option value={3}>Law</option>
                    <option value={4}>Management and Commerce</option>
                    <option value={5}>Maths and Science</option>
                    <option value={6}>School</option>
                </select>
            </div>
            <div className='nav'>
                <ul>
                    <Link to={'/'} className='nav_link'><li>Home</li></Link>
                    <Link to={'/about'} className='nav_link'><li>About</li></Link>
                    <Link to={'/scholarship'} className='nav_link'><li>Scholarship</li></Link>
                    <Link to={'/contact'} className='nav_link'><li>Contact</li></Link>
                    <Link to={'/faq'} className='nav_link'><li>FAQ</li></Link>
                </ul>
            </div>
            <div className='loginUser'>
                {isLoggedIn ? (
                    <div className={`user-menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
                        <i className="fa-solid fa-circle-user"></i>
                        <div className="user-dropdown" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <span className="username-text">{user?.username || 'User'}</span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <div className="user-dropdown-content">
                            <div className="dropdown-item" onClick={() => handleMenuClick('/profile')}>
                                <i className="fa-solid fa-user"></i>
                                My Profile
                            </div>
                            <div className="dropdown-item" onClick={() => handleMenuClick('/dashboard')}>
                                <i className="fa-solid fa-gauge-high"></i>
                                Dashboard
                            </div>
                            <div className="dropdown-item" onClick={() => handleMenuClick('/settings')}>
                                <i className="fa-solid fa-gear"></i>
                                Settings
                            </div>
                            <div className="dropdown-item logout" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Logout
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to={'/register'}><button><i className="fa-solid fa-file-invoice"></i>Register</button></Link>
                        <Link to={'/login'}><button><i className="fa-solid fa-right-to-bracket"></i>Login</button></Link>
                    </div>
                )}
            </div>
        </div> 
        </>
    )
}

export default Header