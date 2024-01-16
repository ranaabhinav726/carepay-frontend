import { useEffect } from 'react';
import SearchImg from '../../assets/GIFs/searching.png'
import Header from '../Header/Header'
import lottie from "lottie-web";
import animationData from '../../assets/JSON animations/Comp 1.json'
const SearchingOffers = () =>{


    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          // animationData: animationData,
          renderer: "canvas"
        });
      }, []);
    return(
        <main style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Header progressbarDisplay="none" />
            {/* <img src={SearchImg} alt="searching" style={{border:"1px solid black", width:"60%", marginTop:"30%"}} /> */}
            <div id="searchAnimation"></div>
            <p style={{marginTop:"1rem"}}>Searching best offers for you...</p>
        </main>
    )
}

export default SearchingOffers