import React, {useState,useEffect} from 'react';

const FAQs = () => {

    const [contact, setContact] = useState(false);

    const clickContact = () => {
        setContact(!contact);
    }
    return (
        <div className='info-wrapper'>
            <div className='info-container'>
                <div className='info' onClick={clickContact}>
                    heading
                </div>
                { (contact) ? (
                    <div>
                        show
                    </div>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default FAQs