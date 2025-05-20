import React from 'react'
import './Robot.css';
import img1 from '../assets/chatbot.jpg'
import { Link } from 'react-router-dom';
const Robot = () => {
  return (
    <>
    <div className='hello'>
        <Link to={'/chatbot'}><img src={img1}/></Link>
    </div>
    </>
  )
}

export default Robot