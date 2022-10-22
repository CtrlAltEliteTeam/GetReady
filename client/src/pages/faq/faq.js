import React from 'react'
import { ContactUs } from '../../components/ContactUs/ContactUs'
import "./faq.css"
import { FAQ_Data } from './faq_data'

export const Faq = () => {
  return (
    <div>
    <div className='faq-content'>
        {FAQ_Data.map((element)=>{
            return(
                <div key={element.id} className='faq-qna-body'>
                    <div className='faq-question'>Q: {element.question}</div>
                    <div className='faq-answer'>A: {element.answer}</div>
                </div>
            );
        })}
    </div>
    <ContactUs/>
    </div>
  )
}
