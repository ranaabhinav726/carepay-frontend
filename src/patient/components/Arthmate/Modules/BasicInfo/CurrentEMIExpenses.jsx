import { useState } from "react";
import { Header } from "../../comps/Header";
import './styles/currentEMIExpenses.scss'
import { env, showErrorOnUI } from "../../../../environment/environment";
import { onlyCharacters, onlyNumbers } from "../../servicesAndUtility/utilityFunctions";
import { saveMonthlyExpensesApi, saveOrUpdateAdditionalUserData } from "../../servicesAndUtility/api";
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";
import axios from "axios";

export default function ArthCurrentEMIExpenses() {
    let doctorId = localStorage.getItem("doctorId");

    let userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [isCurrEMI, setIsCurrEMI] = useState(true);
    const [currEMI, setCurrEMI] = useState("");

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    async function handleSubmit() {

        if (isCurrEMI && (!currEMI)) {
            let elem = document.getElementById('emiExpense');
            if (elem) showErrorOnUI(elem);
            return;
        }

        let data = {
            "userId": userId,
            "monthliEmiExpense": currEMI
        }

        saveMonthlyExpensesApi(data, res => {
            if (res.data.status === 200) {
                // navigate("/patient/ArthmateOffers")
                // if (window.localStorage.getItem('flowRedirect') === 'CF' && window.localStorage.getItem('flowRedirect') !== null) {
                //     navigate(routes.CREDIT_FAIR_OFFERS)
                // }
                // if (window.localStorage.getItem('flowRedirect') === 'FIBE' || window.localStorage.getItem('flowRedirect') === null) {
                //     navigate(routes.FIBE_CHECKING_STATUS)
                // }
                // if (window.localStorage.getItem('flowRedirect') === 'AM' ) {
                axios.get(env.api_Url + "findSuitableNbfc?userId=" + userId + '&doctorId=' + doctorId)
                    .then(response => {
                        if (response.data.status === 200) {
                            console.log(response.data.data)
                            let data = response.data.data;
                            if (!!data) {
                                window.localStorage.setItem('flowRedirect', data)
                            }
                        }
                    }).catch(() => {
                        console.log("Error fetching data");
                    })
                axios.post(env.api_Url + "leadAPI?userId=" + userId)
                    .then((response) => {
                        console.log(response)


                        if (response.data.message === "success") {
                            axios.post(env.api_Url + "requestAScore?userId=" + userId)
                                .then((response) => {
                                    console.log(response)
                                }).catch(error => {
                                    console.log(error);
                                });
                            navigate(routes.ARTHMATE_OFFERS)
                        }


                    }).catch(error => {
                        console.log(error);
                    });


            }
            // }
        })
    }

    async function handleSubmitNew() {

        if (isCurrEMI && (!currEMI)) {
            let elem = document.getElementById('emiExpense');
            if (elem) showErrorOnUI(elem);
            return;
        }

        let data = {
            "userId": userId,
            "monthliEmiExpense": currEMI
        }

        saveMonthlyExpensesApi(data, res => {
            if (res.data.status === 200) {
                // navigate("/patient/ArthmateOffers")
                // if (window.localStorage.getItem('flowRedirect') === 'CF' && window.localStorage.getItem('flowRedirect') !== null) {
                //     navigate(routes.CREDIT_FAIR_OFFERS)
                // }
                // if (window.localStorage.getItem('flowRedirect') === 'FIBE' || window.localStorage.getItem('flowRedirect') === null) {
                //     navigate(routes.FIBE_CHECKING_STATUS)
                // }
                // if (window.localStorage.getItem('flowRedirect') === 'AM' ) {
                // axios.get(env.api_Url + "findSuitableNbfc?userId=" + userId + '&doctorId=' + doctorId)
                axios.post(env.api_Url + "leadAPI?userId=" + userId)

                    .then(response => {
                        if (response.data.status === 200) {
                            console.log(response.data.data)

                            let data = response.data.data;
                            if (!!data) {
                                window.localStorage.setItem('flowRedirect', data)
                            }
                            if (response.data.message === "success") {
                                axios.post(env.api_Url + "requestAScore?userId=" + userId)
                                    .then((response) => {
                                        console.log(response)
                                        if (response.data.message === "success") {
                                            axios.post(env.api_Url + 'getAScore?userId=' + userId)
                                                .then((response) => {
            
                                                    if (response.data.message === 'success') {
                                                        axios.get(env.api_Url + "findSuitableNbfc?userId=" + userId + '&doctorId=' + doctorId)
                                                    } else {
                                                   
            
            
                                                    }
            
                                                })
                                        }
            
                                    }).catch(error => {
                                        console.log(error);
                                    });
                                navigate(routes.ARTHMATE_OFFERS)
                            }
                        }
                    }).catch(() => {
                        console.log("Error fetching data");
                    })


               





            }
            // }
        })
    }


    return (
        <main className="arthCurrentEMIExpenses">
            <Header />
            <h3>Current EMI expenses</h3>

            <p>Select your ongoing EMI expenses</p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px 0", marginBottom: "0" }} >
                <input
                    id={"currEMI"}
                    name={"isCurrEMI"}
                    value={""}
                    type="radio"
                    checked={isCurrEMI}
                    onChange={() => setIsCurrEMI(true)}
                    style={{
                        height: "24px",
                        width: "max-content",
                        aspectRatio: "1/1",
                        border: "2px solid #5E5E5E",
                        accentColor: "#514C9F",
                        marginLeft: "6px"
                    }}
                />
                <label
                    htmlFor="currEMI"
                    style={{
                        fontSize: "16px",
                        lineHeight: "20px"
                    }}
                >
                    I have ongoing EMIs
                </label>
                <br />
            </div>

            {isCurrEMI &&
                <div className="emiExpense">
                    <p>EMI expenses value (approxx.)</p>
                    <input
                        id="emiExpense"
                        type="text"
                        value={currEMI}
                        onChange={(e) => onlyNumbers(e.target.value, setCurrEMI)}
                        placeholder="Enter your monthly EMI total here"
                    />
                    <span className="fieldError">This field can't be empty.</span>
                </div>}

            <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px 0", marginBottom: "0" }} >
                <input
                    id={"noCurrEMI"}
                    name={"isCurrEMI"}
                    value={""}
                    type="radio"
                    checked={!isCurrEMI}
                    onChange={() => setIsCurrEMI(false)}
                    style={{
                        height: "24px",
                        width: "max-content",
                        aspectRatio: "1/1",
                        border: "2px solid #5E5E5E",
                        accentColor: "#514C9F",
                        marginLeft: "6px"
                    }}
                />
                <label
                    htmlFor="noCurrEMI"
                    style={{
                        fontSize: "16px",
                        lineHeight: "20px"
                    }}
                >
                    I do not have any current EMI expense
                </label>
                <br />
            </div>

            <p className={apiError ? "apiError" : "apiError hide"}>An error has occured, please try again.</p>
            <button onClick={handleSubmit} className="submit">Next</button>

        </main>
    )
}