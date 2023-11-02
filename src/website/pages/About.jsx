import './css/section.scss'
import './css/about.scss'
import HeroImg from '../assets/About-hero-banner.webp'
import { Contact, Footer } from './Homepage'
import user from '../assets/People/user.webp'

import Gaurav from '../assets/People/Gaurav.webp'
import Nikhil from '../assets/People/Nikhil.webp'
import Nupur from '../assets/People/Nupur.webp'
import Mohit from '../assets/People/Mohit bansal.webp'
import Sartaj from '../assets/People/Sartaj.webp'
import Tanwir from '../assets/People/Tanwir.webp'
import Sparsh from '../assets/People/Sparsh.webp'
import Sara from '../assets/People/Sara_.webp'
import Parishesh from '../assets/People/Parishesh.webp'
import Kalpataru from '../assets/People/Kalpataru.webp'
import Lavit from '../assets/People/Lavit.webp'
import Ashutosh from '../assets/People/Ashutosh.webp'
import Balbeer from '../assets/People/Balbeer.webp'



import { useEffect } from 'react'
import CustomNavbar from '../Components/Navbar'

function About(){

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [])

    return(
        <div className='website-container'>
            <CustomNavbar />
            <Hero />
            <OurTeam />
            <Contact />
            <Footer />
        </div>
    )
}

export default About

function Hero(){
    return(
        <section className='hero'>
            <div className="container">
                <div className="flex-content-wrapper">
                    <div className="section-content hero-container-content" style={{justifyContent:"center"}}>
                        <h1>We are committed to your growth</h1>
                        <p className="text-content">Our mission is to streamline healthcare financing, allowing providers like you, to focus on what you do best - delivering exceptional care!</p>
                    </div>
                    <div className="section-content hero-container-image">
                        <img src={HeroImg}
                        style={{
                            maxWidth: "90%",
                            display: "block",
                            margin: "auto"
                        }}
                        alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

function OurTeam(){

    return(
        <>
            <section className='aboutUs'>
                <div className="container">
                    <h3 style={{textAlign:"center", marginBottom:"32px"}}>Our Team</h3>
                    <div className="cards-grid-wrapper">
                        <MemberCard img={Gaurav} name={"Gaurav Gupta"} designation={"CEO"} />
                        <MemberCard img={Nikhil} name={"Nikhil Salkar"} designation={"CPO"} />
                        <MemberCard img={Nupur} name={"Nupur Khandelwal"} designation={"CSO"} />
                        <MemberCard img={Mohit} name={"Mohit Bansal"} designation={"CTO"} />
                        <MemberCard img={Ashutosh} name={"Ashutosh Shrivastava"} designation={"VP Sales - Key Accounts"} />
                        <MemberCard img={Sartaj} name={"Sartaj Abbasi"} designation={"Zonal Head"} area='- North India' type='- Super speciality' />
                        {/* <MemberCard img={Tanwir} name={"Md. Tanwir Akhtar"} designation={"Area Business Manager"} /> */}
                        {/* <MemberCard img={Sparsh} name={"Sparsh Vaid"} designation={"Area Business Manager"} /> */}
                        <MemberCard img={Sara} name={"Sara Fathima"} designation={"Area Business Manager"} />
                        {/* <MemberCard img={Parishesh} name={"Parishesh Vinod"} designation={"Area Business Manager"} /> */}
                        <MemberCard img={Kalpataru} name={"Kalpataru Panda"} designation={"Credit - Ops Manager"} />
                        <MemberCard img={Lavit} name={"Lavit Modi"} designation={"Finance Manager"} />
                        <MemberCard img={Balbeer} name={"Balbeer Kumar"} designation={"Regional Manager"} />
                        {/* <MemberCard img={user} name={"Deepak Joshi"} designation={"Frontend Developer"} />
                        <MemberCard img={user} name={"Deepanshu Sharma"} designation={"Mobile Developer"} />
                        <MemberCard img={user} name={"Vinay Verma"} designation={"Backend Developer"} />
                        <MemberCard img={user} name={"Raj Bansal"} designation={"Mobile Developer"} />
                        <MemberCard img={user} name={"Ritika Jain"} designation={"QA/Devops"} />
                        <MemberCard img={user} name={"Nikita Bansal"} designation={"UI/UX Designer"} />
                        <MemberCard img={user} name={"Aditya Meshram"} designation={"UI/UX Designer"} /> */}
                    </div>
                </div>
            </section>
        </>
    )
}

function MemberCard({img, name, designation, area="", type=""}){

    return(
        <div className="member-card">
            <img className='member-card-img' src={img} alt="" />
            <h5 className='member-card-name'>{name}</h5>
            <p className='member-card-designation'>{designation}</p>
            {area && <p className='member-card-area'>{area}</p>}
            {type && <p className='member-card-type'>{type}</p>}
        </div>
    )
}