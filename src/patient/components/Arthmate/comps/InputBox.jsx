
export default function InputBox({type="text", length=10, id, styles, placeholder="Enter here", value, setValue, variant="filled", Prefix, min, max}){
    // console.log(typeof(Prefix))
    function processData(val){
        if(type === "number"){
            if(val.length > length) return
            setValue(val);
        }else{
            setValue(val);
        }
    }
    return(
        <div style={{display:"flex", alignItems:"center", borderRadius:"4px", fontSize:"16px", lineHeight:"20px", border:"1px solid #000000CC", height:"54px", background:variant=="filled"?"#ECEEFF":"transparent", ...styles}}>
            {Prefix && 
                <span style={{
                    padding:"10px", 
                    fontSize:"inherit", 
                    lineHeight:"inherit"
                    }}
                >
                    {Prefix}
                </span>}
            <input autoComplete="off" 
                type="text"
                id={id}
                min={min}
                max={max}
                style={{
                    width:"100%",
                    height:"inherit",
                    padding:"14px 10px", 
                    fontSize:"inherit", 
                    lineHeight:"inherit",
                    border:"0",
                    background:"transparent",
                    appearance:"textfield",
                    outline:"none",
                    letterSpacing:styles?.letterSpacing
                }}
                placeholder={placeholder} 
                value={value} 
                onChange={(e)=>processData(e.target.value)}
            />
        </div>
    )
}