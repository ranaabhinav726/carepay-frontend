import './welcome.scss'
import Logo from '../../assets/Logo-carepay.webp'
import WelcomeImg from '../../assets/welcome.png'
import { useNavigate } from 'react-router-dom'
const Welcome = () =>{
    const navigate = useNavigate()
    return(
        <main id='welcome'>
            <img id='logo' src={Logo} alt="Carepay's Logo" />
            <img className='hero' src={WelcomeImg} alt="" />
            <h2 className='clr-purple'>Welcome to CarePay</h2>
            <p>Getting your clinic ready to offer instant loans to patients<br/>is just a couple of steps away!</p>
            <button onClick={()=>navigate('/doctor/PersonalDetails') } className='submit'>Let's begin!</button>
        </main>
    )
}

export default Welcome