import React from 'react'
import { footerContent } from './FooterContent'
import './Footer.css';
import logo from '../assets/logo.png'
import ministry_logo from '../assets/ministry_logo.png'
import download_app from '../assets/download_app.png'
import Partner from './Partner';

const Footer = () => {
  return (
    <>
    <hr />
    <div className='footer'>
        <div className='footerItem1'>
            <img src={logo} id='f'/ >
            <img src={ministry_logo}/>
            <div className='social_icons'>
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-instagram"></i>
            </div>
        </div>
        <div className='footerItem2'>
            <p>Download App</p>
            <img src={download_app} />
        </div>
        <div className='footerItem3'>
            <ul>
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>Honor Code</li>
                <li>Helpline / Support</li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Footer