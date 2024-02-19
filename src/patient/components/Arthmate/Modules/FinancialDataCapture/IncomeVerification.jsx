import { Header } from '../../comps/Header';
import './styles/incomeVerification.scss'

import DocImg from '../../assets/incomeDoc.svg'
import { useNavigate, useLocation } from 'react-router-dom';

// import { BsArrowRight } from 'react-icons/bs'

const ArthIncomeVerification = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    return(
    <>
        <main className='arthIncomeVerification'>
            <Header />
            <h3>Income Verification</h3>
            
            <p>
                To verify your income, we need to access your 
                bank statement for the latest 3 months. This data 
                sharing is completely secured and encrypted. 
            </p>
            <div style={{display:'flex', marginTop:"2rem"}}>
                <img style={{margin:"1rem auto"}} src={DocImg} alt="financial docs placeholder image" />
            </div>
            <button 
                onClick={()=>navigate('/patient/FileUpload')} 
                className='submit'
            >
                Continue with bank selection
            </button>
        </main>
    </>
    )
}

export default ArthIncomeVerification