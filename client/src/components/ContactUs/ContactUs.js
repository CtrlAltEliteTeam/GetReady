import React from 'react'
import './ContactUs.css'

export const ContactUs = () => {
  return (
    <div>
        <div className="Contact-us-block">
            <div className="Contact-us-title">Contact Us:</div>
            <div className='grid-container'>
                <div className="Contact-us-email">Email: admin@getready.com</div>
                <div className="Contact-us-phone">Tel: +27 71 855 9547</div>
                <div className="Contact-us-address">
                        <div>Address:</div> 
                        <div>1 Jan Smuts Avenue,</div> 
                        <div>Braamfontein,</div>
                        <div>2000,</div>
                        <div>Johannesburg,</div>
                        <div>South Africa</div>
                </div>
            </div>
        </div>
    </div>
  )
}
