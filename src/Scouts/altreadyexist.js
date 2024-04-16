

import React, { useEffect, useState } from "react";
import CarepayLogo from '../patient/assets/Logo-carepay.svg'
import Alert from './imagesscouts/Vector (31).png'
const Alreadyexist = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="screen-width-max">
            <div className="header-scouts">
                <img src={CarepayLogo} />
            </div>
            <div className="scout-body text-center mt-5">
                <img src={Alert} style={{ width: '70px' }} />
                <p className="" style={{ fontSize: '14px', marginTop: '20px' }}>Your number is registered with us as a ‘Partner’<br />
                    Are you sure you want to log in for a doctor?</p>
                <button className="carepay-button-purple">Yes</button>
                <p style={{ fontSize: '14px', marginTop: '20px' }}>No. I want to log in for</p>
                <button className="carepay-button-purple-disable">Partner</button>

            </div>
        </div>
    )
}

export default Alreadyexist