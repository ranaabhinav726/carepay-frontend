import './addressDetails.scss'
import { useState } from 'react'
import CarepayLogo from '../../../assets/Logo-carepay.svg'
import Oops from '../../../assets/newOops.png'
import RadioInput from '../../utility/RadioInput/RadioInput'

export default function AddressNotServiceable(){

    const[isPermanent, setIsPermanent] = useState();
    return(
        <main className="addressNotServiceable">
            <header>
                <img src={CarepayLogo} alt="" />
            </header>
            <img className='oopsIcon' src={Oops} alt="" />
            <p className='oopsMsg'>Sorry! Your <strong>current address</strong><br/>is non-serviceable.</p>
            <div className='radioWrapper'>
                <p className='radioTitle'>Is your permanent address the same as your current address?</p>
                <RadioInput
                    name='addressType'
                    options={["Yes", "No"]}
                    values={["true", "false"]}
                    selected={isPermanent}
                    setSelected={setIsPermanent}
                    
                />
                <button className='submit lite faqSubmit'>Submit</button>
            </div>
        </main>
    )
}