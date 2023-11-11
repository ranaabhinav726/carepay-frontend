
export default function NoteText({text, styles}){

    return(
        <>
            <p 
            style={{
                fontSize:"14px", 
                lineHeight:"18px",
                color:"#00000066",
                ...styles
            }}
            >
                {text}
            </p>
        </>
    )
}