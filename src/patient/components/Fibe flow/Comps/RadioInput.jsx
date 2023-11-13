
export default function RadioInput({name="", options=[], value, setValue, styles, id}){

    const radios = options.map((option, idx)=>{
        return(
            <div style={{display:"flex", padding:"0 12px 12px 12px", gap:"12px", alignItems:"center", ...styles}} key={idx} >
                <input 
                    id={option} 
                    name={name} 
                    value={option}
                    type="radio"
                    checked={value === option}
                    onChange={(e)=>setValue(e.target.value)}
                    style={{
                        height:"24px", 
                        aspectRatio:"1/1",
                        border:"2px solid #5E5E5E",
                        accentColor:"#514C9F"
                    }}
                    />
                <label 
                htmlFor={option}
                style={{
                    fontSize:"16px",
                    lineHeight:"20px",
                    // textTransform:"capitalize"

                }}
                >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
                <br/>
            </div>
            
        )
    })

    return(
        <div id={id} style={{borderRadius:"4px"}}>
            {radios}
        </div>
    )
}