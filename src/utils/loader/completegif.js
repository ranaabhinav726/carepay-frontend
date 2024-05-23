import React from "react";
import Loader from './Gratification.gif'

const CompletedGif = ({text}) => {
    return (
        <div style={{ marginTop: "12%", textAlign: 'center' }} >
            <img src={Loader} style={{ width: '60%' }} />
            <p style={{color:'#514C9F'}}><b>{text}</b></p>
        </div>
    )
}
export default CompletedGif