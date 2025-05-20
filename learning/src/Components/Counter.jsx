import React, { useState } from 'react'
import CountUp from 'react-countup'
import './Counter.css';
import ScrollTrigger from 'react-scroll-trigger'

const Counter = () => {
    const [counterOn, setcounterOn] = useState(false)
  return (
    <>
    {/* <ScrollTrigger onEnter={()=>setcounterOn(true)} onExit={()=>setcounterOn(false)}> */}
    <div className='counter'>
        <div className='counter_item'>
            <h1>Total Courses</h1>
            <p> <CountUp start={0} end={14829} duration={2} delay={0}/>+</p>
        </div>
        <div className='counter_item'>
            <h1>Ongoing Enrollments</h1>
            <p><CountUp start={0} end={960} duration={2} delay={0}/>+</p>
        </div>
        <div className='counter_item'>
            <h1>Total Enrollments</h1>
            <p><CountUp start={0} end={5} duration={2} delay={0}/> Crore +</p>
        </div>
        <div className='counter_item'>
            <h1>Total Certifications</h1>
            <p><CountUp start={0} end={3.75} duration={2} delay={0}/> lakh +</p>
        </div>
        <div className='counter_item'>
            <h1>Ongoing Courses</h1>
            <p><CountUp start={0} end={10} duration={2} delay={0}/>+</p>
        </div>
    </div>
    </>
  )
}

export default Counter