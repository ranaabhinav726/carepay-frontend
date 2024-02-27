import { Header } from "../../comps/Header";
import Fingerprint from '../../assets/fingerprint.png'

export default function ArthKyc(){

    const[consent, setConsent] = useState(false);

    return(
        <main>
            <Header />
            <h3 style={{margin:"1.5rem 0"}}>KYC</h3>
            <p>Verify your identity to proceed further with the credit application.</p>
            <div style={{padding:"10px", background:"#FAE1CD", borderRadius:"4px"}}>
                If your Aadhaar and PAN are not linked to your number then keep their physical copy ready.
            </div>
            <div style={{display:"flex"}}>
                <img style={{margin:"1rem auto", maxWidth:"40%"}} src={Fingerprint} alt="" />
            </div>
            <div style={{display:"flex", gap:"12px", marginTop:"1.8rem", marginBottom:"1rem"}}>
                <input 
                    value={consent} 
                    onChange={()=>setConsent(!consent)} 
                    type="checkbox" 
                    name="" 
                    id="kycConsent" 
                    style={{
                        accentColor:"#514C9F", 
                        alignSelf:"start", 
                        aspectRatio:"1/1", 
                        width:"36px", 
                        marginTop:"3px"
                    }} 
                />
                <label 
                    htmlFor='kycConsent'
                    style={{userSelect:"none"}}
                >
                    I hereby give my consent to CarePay and Arthmatetech 
                    Private limited to collect, store and verify my KYC details for 
                    processing my loan application.
                </label>
            </div>
            <button className="submit">Proceed</button>
        </main>
    )
}