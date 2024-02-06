import React, { useEffect, useState } from 'react';
import styles from './SuggestionInputBox.module.css'

export const AutocompleteInput = ({id, title, value, setValue, placeholder, list, fieldError}) => {

  const [inputValue, setInputValue] = useState(value);
  useEffect(()=>{
    setInputValue(value)
  }, [value])
  function setValueBoth(val){
    setValue(val);
    setInputValue(val);
  }
  const [suggestions, ] = useState(list);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleInputChange = (event) => {
    setValueBoth(event.target.value);
    setShowSuggestions(true); // Show suggestions when typing
  };

  const handleSelectSuggestion = (suggestion) => {
    setValueBoth(suggestion);
    setShowSuggestions(false); // Hide suggestions when a suggestion is selected
  };

  const handleInputBlur = (e) => {
    console.log(e)
    setTimeout(() => {
        setShowSuggestions(false); // Hide suggestions when input loses focus
    }, 400);
    // You can perform any additional actions on input blur if needed
  };

  return (
    <>
    <label className={styles.suggestionInputLabel} htmlFor="autocompleteInput">{title}</label>
    <div className={styles.suggestionInputWrapper} id={id}>
        <input
            type="text"
            id="autocompleteInput"
            list="suggestions"
            value={inputValue}
            placeholder={placeholder}
            onChange={(e)=>handleInputChange(e)}
            onBlur={(e)=>handleInputBlur(e)}
            className={styles.suggestionInput}
        />
        <div className={styles.suggestionListWrapper}>
            <ul className={styles.suggestionListItemWrapper} tabIndex={0}>
                {(showSuggestions && inputValue.length > 0) && suggestions
                .filter((suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase())).slice(0,5)
                .map((suggestion, index) => (
                    <li 
                        className={styles.suggestionItem} 
                        key={index} 
                        onClick={() => handleSelectSuggestion(suggestion)}
                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    </div>
    <span className="fieldError">{fieldError}</span>
    </>
  );
};

export default AutocompleteInput;


