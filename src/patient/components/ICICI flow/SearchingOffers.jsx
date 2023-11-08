import SearchImg from '../../assets/GIFs/searching.png'
import Header from '../Header/Header'
const SearchingOffers = () =>{

    return(
        <main style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Header progressbarDisplay="none" />
            <img src={SearchImg} alt="searching" style={{border:"1px solid black", width:"60%", marginTop:"30%"}} />
            <p style={{marginTop:"1rem"}}>Searching best offers for you...</p>
        </main>
    )
}

export default SearchingOffers