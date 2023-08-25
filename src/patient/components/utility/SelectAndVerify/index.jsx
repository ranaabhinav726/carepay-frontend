import './selectAndVerify.scss'

const SelectAndVerify = ({text = "Please select and verify your details"}) =>{

    return(
        <div className="verifyPrompt">
            {text}
        </div>
    )
}

export default SelectAndVerify