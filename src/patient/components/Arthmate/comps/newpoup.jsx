import routes from "../../../../layout/Routes";

export default function BottomPopOverModal({ navigateToPersonal,showPopOver, setShowPopOver, color = "#ECEBFF", ...props }) {
    console.log(props.popUpMsg)
    let popUpMsg = <p style={{ color: "black", lineHeight: 'revert', fontSize: '15px' }}>For more offers, we will have to check with<br /> other banks and NBFCs, <br />for which we require more data and <br />might require more time.</p>;

    return (
        <div
            className={'bottomPopOverModal ' + (showPopOver ? "open" : "")}
            onClick={() => { setShowPopOver(false) }}
            style={{
                height: "100%",
                width: "100%",
                background: "rgba(0,0,0,0.2)",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: 5,
                display: "flex",
                alignItems: "center",
                padding: "0"
            }}>
            <div
                className="popUpCard-custom"
                style={{
                    width: "100%",
                    background: ' #fff',
                    borderRadius: "8px 8px 0px 0px",
                    padding: "1rem",
                    paddingBottom: "32px",
                    position: "absolute",
                    margin: "0"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ background: '#ECEBFF', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                    {popUpMsg}
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <b>Are you sure you want to <br />
                        explore more options?</b>
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '40%',marginLeft:'auto',marginRight:'auto' }}>
                        <button
                        onClick={()=>setShowPopOver(false)}
                        style={{background:'#ECEBFF',color:'#000'}}
                            className='submit'
                        >
                            No
                        </button>
                    </div>
                    <div style={{ width: '40%',marginLeft:'auto',marginRight:'auto' }}>

                    <button
                    onClick={()=>navigateToPersonal()}
                        className='submit'
                    >
                        Yes
                    </button>
                    </div>
                </div>

            </div>
        </div>
    )
}