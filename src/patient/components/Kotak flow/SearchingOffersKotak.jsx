import { useEffect, useState } from 'react';
// import SearchImg from '../../assets/GIFs/searching.png'
import Header from '../Header/Header'
import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/Comp 1.json'
import { preEligibility } from './apis';
import { useNavigate } from 'react-router-dom';
const SearchingOffersKotak = () =>{

    const navigate = useNavigate();
    const [number, setNumber] = useState(localStorage.getItem("phoneNumber"));

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
          renderer: "canvas"
        });
      }, []);

      useEffect(()=>{
        if(! number) return;

        preEligibility(number, res=>{
          if(res?.data?.message === "success"){
            let data = res?.data?.data?.data;
            console.log(data);

            navigate("/patient/congratsPreApprovedIcici", {state : {"offer":data}})
          }
        })
      }, [number])
    return(
        <main style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Header progressbarDisplay="none" />
            {/* <img src={SearchImg} alt="searching" style={{border:"1px solid black", width:"60%", marginTop:"30%"}} /> */}
            <div id="searchAnimation"></div>
            <p style={{marginTop:"1rem"}}>Searching best offers for you...</p>
        </main>
    )
}

export default SearchingOffersKotak