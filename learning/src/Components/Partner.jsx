import React from 'react'
import './Partner.css';
import { footerContent } from './FooterContent';

const Partner = () => {
  return (
    <>
    <h1 id='our_partner'>Partnered with <label>Top Institutions </label> to produce <label>Best Quality Education</label> content for Free</h1>
        <div className='partners'>
            {
                footerContent.map((v,i)=>{
                    return(
                        <div className='partner_image' key={i}>
                            <img src={v.image} alt="..." />
                            <p>{v.p_name}</p>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

export default Partner