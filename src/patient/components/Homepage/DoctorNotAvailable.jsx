import Header from "../Header/Header";
import NotFound from "../../assets/notFound.png";

export default function DoctorNotAvailable() {

  return (
    <main>
      <Header />
      <div style={{display:"flex", gap:"12px", marginTop:"4rem", padding:"10px"}}>
        <img style={{maxWidth:"30%"}} src={NotFound} alt="" />
        <div>
            <p style={{fontSize:"30px", color:"#B9B7D9", fontWeight:"700",}}>404</p>
            <p style={{color:"#514C9F", fontWeight:"700", margin:"6px 0"}}>Page not found!</p>
            <p style={{}}>The page you are looking
                for might have been removed
                or is temporarily unavailable.
                We are looking into it.
            </p>
        </div>
      </div>
    </main>
  );
}
