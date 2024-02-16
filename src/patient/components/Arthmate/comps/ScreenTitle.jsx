
export default function ScreenTitle({title, styles, className="", id}){

    return(
        <>
            <h3 
            id={id}
            className={className}
            style={{
                fontSize:"22px",
                lineHeight:"26px",
                fontWeight:"700",
                marginTop:"24px",
                marginBottom:"32px",
                ...styles,
            }}>
                {title}
            </h3>
        </>
    )
}