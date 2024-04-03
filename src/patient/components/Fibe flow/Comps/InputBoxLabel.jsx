
export default function InputBoxLabel({label, styles}){

    return(
        <label 
            style={{
                display:"block",
                fontSize:"16px", 
                lineHeight:"20px",
                marginBottom:"12px",
                ...styles, 
            }}
        >
            {label}
        </label>
    )
}