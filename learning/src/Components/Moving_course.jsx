import React from 'react'
import './Moving_course.css';
import { moving_courseContent } from './Moving_courseContent'
const Moving_course = () => {
  return (
    <>
    <div className='icon_course'>
        {moving_courseContent.map((v,i)=>{
            return(<div className='icon_box' key={i}>
                <img src={v.image}/>
                <p>{v.name}</p>
            </div>)
        })}
    </div>
    </>
  )
}

export default Moving_course