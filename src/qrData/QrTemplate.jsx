import React from "react"
import carepay from './assets/carepay.png'
import sides1 from './assets/sides1.png'
import sides2 from './assets/sides2.png'

const QrTemplate = ({clinicName, qrUrl}, ref)=>{
    console.log(clinicName, qrUrl)
    return(
        <>
            <main
                ref={ref}
                style={{
                    // transform:"scale(0.6)",
                    position: "relative",
                    background: "#fff",
                    borderRadius: 22,
                    width: "400px",
                    minHeight: "565.8px",
                    margin: "0 auto",
                    padding:0,
                    paddingTop: 22,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    border:"2px solid black"
                }}
            >
                <div
                style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                <img
                    src={carepay}
                    style={{ height: "36.7px", width: 150 }}
                    alt=""
                />
                </div>
                <div
                style={{
                    position: "relative",
                    width: 260,
                    background: "#ECEBFF",
                    borderRadius: 8,
                    minHeight: 66,
                    margin: "25px auto 0 auto",
                    fontSize: 18,
                    lineHeight: 32,
                    color: "rgba(0, 0, 0, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                <p
                    style={{ maxWidth: "16ch", margin: 0, textAlign: "center", overflowWrap:"break-word", lineHeight:"120%" }}
                    id="clinicName"
                >
                    {clinicName}
                </p>
                </div>
                <div
                style={{
                    width: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
                >
                <img
                    style={{ maxWidth: 80 }}
                    src={sides1}
                    alt=""
                />
                <img id="QR" style={{ width: 230 }} src={qrUrl} alt="QR" />
                <img
                    style={{ maxWidth: 80, zIndex:10}}
                    src={sides2}
                    alt=""
                />
                </div>
                <div
                style={{
                    position: "relative",
                    width: 260,
                    borderRadius: 8,
                    background: "#ECEBFF",
                    fontSize: "17px",
                    lineHeight: "23px",
                    overflow: "clip",
                    margin: "0 auto"
                }}
                >
                    <div
                        style={{
                        background: "#514C9F",
                        color: "white",
                        fontWeight: 700,
                        width: 260,
                        textAlign: "center",
                        padding: "5px 0"
                        }}
                    >
                        Pay in easy EMIs
                    </div>
                    <div
                        style={{
                        padding: "5px 0",
                        width: 260,
                        textAlign: "center",
                        fontWeight: 500,
                        color: "#514C9F"
                        }}
                    >
                        Scan with any scanning app
                        <br />
                        and follow the instructions.
                    </div>
                </div>
            </main>
        </>

    )
}

export default React.forwardRef(QrTemplate);