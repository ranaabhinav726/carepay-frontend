import { useState } from "react";
import { Header } from "../../comps/Header";
import './styles/currentEMIExpenses.scss'
import { showErrorOnUI } from "../../../../environment/environment";
import { onlyCharacters, onlyNumbers } from "../../servicesAndUtility/utilityFunctions";
import { getNbfcScoreBre, saveOrUpdateAdditionalUserData } from "../../servicesAndUtility/api";
import { useNavigate } from "react-router-dom";

export default function ArthCurrentEMIExpenses(){

    let userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [isCurrEMI, setIsCurrEMI] = useState(true);
    const [currEMI, setCurrEMI] = useState("");

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    async function handleSubmit(){

        if(isCurrEMI && (!currEMI)){
            let elem = document.getElementById('emiExpense');
            if(elem) showErrorOnUI(elem);
            return;
        }

        let data = {
            "userId" : userId,
            "monthliEmiExpense" : currEMI
        }

        saveOrUpdateAdditionalUserData(data, res=>{
            if(res.data.status === 200){
                getNbfcScoreBre(userId, res=>{
                    if(res.data.status === 200){
                        console.log(res);
                        navigate("/patient/ArthmateOffers")
                    }
                })
            }
        })
    }

    

    return(
        <main className="arthCurrentEMIExpenses">
            <Header />
            <h3>Current EMI expenses</h3>
            
            <p>Select your ongoing EMI expenses</p>
            <div style={{display:"flex", gap:"12px", alignItems:"center", padding:"12px 0", marginBottom:"0"}} >
                <input autoComplete="off" 
                    id={"currEMI"} 
                    name={"isCurrEMI"} 
                    value={""}
                    type="radio"
                    checked={isCurrEMI}
                    onChange={()=>setIsCurrEMI(true)}
                    style={{
                        height:"24px", 
                        width:"max-content",
                        aspectRatio:"1/1",
                        border:"2px solid #5E5E5E",
                        accentColor:"#514C9F",
                        marginLeft:"6px"
                    }}
                />
                <label 
                htmlFor="currEMI"
                style={{
                    fontSize:"16px",
                    lineHeight:"20px"
                }}
                >
                    I have ongoing EMIs
                </label>
                <br/>
            </div>

            {isCurrEMI &&
            <div className="emiExpense">
                <p>EMI expenses value (approxx.)</p>
                <input autoComplete="off" 
                    id="emiExpense"
                    type="text" 
                    value={currEMI}
                    onChange={(e)=>onlyNumbers(e.target.value, setCurrEMI)}
                    placeholder="Enter your monthly EMI total here" 
                />
                <span className="fieldError">This field can't be empty.</span>
            </div>}

            <div style={{display:"flex", gap:"12px", alignItems:"center", padding:"12px 0", marginBottom:"0"}} >
                <input autoComplete="off" 
                    id={"noCurrEMI"} 
                    name={"isCurrEMI"} 
                    value={""}
                    type="radio"
                    checked={!isCurrEMI}
                    onChange={()=>setIsCurrEMI(false)}
                    style={{
                        height:"24px", 
                        width:"max-content",
                        aspectRatio:"1/1",
                        border:"2px solid #5E5E5E",
                        accentColor:"#514C9F",
                        marginLeft:"6px"
                    }}
                />
                <label 
                htmlFor="noCurrEMI"
                style={{
                    fontSize:"16px",
                    lineHeight:"20px"
                }}
                >
                    I do not have any current EMI expense
                </label>
                <br/>
            </div>

            <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
            <button onClick={handleSubmit} className="submit">Next</button>

        </main>
    )
}