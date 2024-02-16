export default function ScreenContentWrapper({styles, ...props}){

    return(
        <div style={{display:"flex", height:"100lvh", flexDirection:"column", ...styles}}>
            {props.children}
        </div>
    )
}