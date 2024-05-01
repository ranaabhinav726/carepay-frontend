import styles from './RadioInput.module.css'

export default function RadioInput({name="", options=[], values=[], selected, setSelected, id}){

    const radios = options.map((option, idx)=>{

        return(
            <div className={styles.radioContainer} key={idx} >
                <input autoComplete="off" 
                    id={option} 
                    className={styles.radioInput}
                    name={name} 
                    value={values[idx]}
                    type="radio"
                    checked={selected === values[idx]}
                    onChange={(e)=>setSelected(e.target.value)}
                />
                <label 
                    className={styles.radioLabel}
                    htmlFor={option}
                >
                    {option}
                </label>
            </div>
            
        )
    })

    return(
        <div className={styles.radioContainerMain} id={id}>
            {radios}
        </div>
    )
}