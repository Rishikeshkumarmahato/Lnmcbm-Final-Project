import React from 'react'
import img1 from '../assets/img1.png'
import './Home.css';
import my_video from '../assets/course_background.mp4'
import Header from './Header';
import Slider from './Slider';
import Body from './Body';
import Footer from './Footer';
import Partner from './Partner';
import Moving_course from './Moving_course';

const Home = () => {
  return (
    <>
    <Header/>
    <div className='intro'>
        <video autoPlay loop muted className="background-video">
            <source src={my_video} type="video/mp4" />
        </video>
        <div className='intro_item1'>
            <div>
                <h1>Learning Today <br /> Leading Tomorrow</h1>
                <p>With India's #1 Learning Platform</p>
            </div>
            <div>
                <h2>All the skills you need in one place</h2>
                <h6>From critical skills to technical topics, We supports your professional development.</h6>
            </div>
        </div>
        <div className='intro_item2'>
            <img src={img1} />
        </div>
    </div>
    <Slider/>
    <Moving_course/>
    <Body/>
    <Partner/>
    <Footer/>
    </>
  )
}

export default Home