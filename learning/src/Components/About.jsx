import React, { useState } from 'react'
import './About.css';
import img1 from '../assets/About/img1.jpg'
import { aboutContent } from './AboutContent';
import Footer from './Footer';
import Header from './Header';
import Partner from './Partner';


const About = () => {
  return (
    <>
    <Header/>
    <div className='about'>
        <div className='about_heading'>
            <h1>About ज्ञानSetu </h1>
            <p>ज्ञानSetu is a programme initiated by Government of India and designed to achieve the three cardinal principles of Education Policy viz., access, equity and quality. The objective of this effort is to take the best teaching learning resources to all, including the most disadvantaged. ज्ञानSetu seeks to bridge the digital divide for students who have hitherto remained untouched by the digital revolution and have not been able to join the mainstream of the knowledge economy.</p>
        </div>
        <div className='about_img'>
            <img src={img1} alt="" />
        </div>
    </div>
    <div className='about_data'>
        <p>This is done through a platform that facilitates hosting of all the courses, taught in classrooms from Class 9 till post-graduation to be accessed by anyone, anywhere at any time. All the courses are interactive, prepared by the best teachers in the country and are available, free of cost to any learner. More than 1,000 specially chosen faculty and teachers from across the country have participated in preparing these courses.</p>
        <p>The courses hosted on ज्ञानSetu are in 4 quadrants – (1) video lecture, (2) specially prepared reading material that can be downloaded/printed (3) self-assessment tests through tests and quizzes and (4) an online discussion forum for clearing the doubts. Steps have been taken to enrich the learning experience by using audio-video and multi-media and state of the art pedagogy / technology.</p>
        <p>In order to ensure that best quality content is produced and delivered, ten National Coordinators have been appointed. They are:</p>
        <ul>
            <li><label>AICTE</label> (All India Council for Technical Education) for self-paced and international courses</li>
            <li> <label>NPTEL</label> (National Programme on Technology Enhanced Learning) for Engineering</li>
            <li><label>UGC</label> (University Grants Commission) for non technical post-graduation education</li>
            <li><label>CEC</label> (Consortium for Educational Communication) for under-graduate education</li>
            <li><label>NCERT</label> (National Council of Educational Research and Training) for school education</li>
            <li><label>NIOS</label> (National Institute of Open Schooling) for school education</li>
            <li><label>IGNOU</label> (Indira Gandhi National Open University) for out-of-school students</li>
            <li><label>IIMB</label> (Indian Institute of Management, Bangalore) for management studies</li>
            <li><label>NITTTR</label> (National Institute of Technical Teachers Training and Research) for Teacher Training programme</li>
            <li><label>INI</label> (Institutes of National Importance) for Non-Technical Courses</li>
        </ul>
        <p>Courses delivered through ज्ञानSetu are available free of cost to the learners, however learners wanting a ज्ञानSetu certificate should register for the final proctored exams that come at a fee and attend in-person at designated centres on specified dates. Eligibility for the certificate will be announced on the course page and learners will get certificates only if this criteria is matched. Universities/colleges approving credit transfer for these courses can use the marks/certificate obtained in these courses for the same.</p>
    </div>
    <hr />
    <div className='about_icons'>
        {aboutContent.map((v,i)=>{
            return(
            <div className='icons_box' key={i}>
            <img src={v.image} />
            <h4>{v.name}</h4>
            {v.institute.map((v,i)=>{
                return(
                    <p>{v}</p>
                )
            })}
        </div>)
        })}
    </div>
    <Partner/>
    <Footer/> 
    </> 
  )
}

export default About