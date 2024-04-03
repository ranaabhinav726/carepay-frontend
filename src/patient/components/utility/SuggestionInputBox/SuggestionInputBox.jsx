import React, { useEffect, useState } from 'react';
import styles from './SuggestionInputBox.module.css'

export const AutocompleteInput = ({id, title, value, setValue, placeholder, list, fieldError, otherValueSettter}) => {

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
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue === 'Other') {
      e.preventDefault(); // Prevent the default behavior of the backspace key
      setValueBoth(''); // Clear the input value
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setValueBoth(suggestion);
    setShowSuggestions(false); // Hide suggestions when a suggestion is selected
  };

  const handleInputBlur = (e) => {
    // console.log(e)
    setTimeout(() => {
        setShowSuggestions(false); // Hide suggestions when input loses focus
    }, 400);
    // You can perform any additional actions on input blur if needed
  };

  const [selectedItemError, setSelectedItemError] = useState(false);
  useEffect(()=>{
    console.log(inputValue)
    if(inputValue === undefined || inputValue === "" || inputValue === "Other"){
        setSelectedItemError(false);
    }else{
        if(! list.includes(inputValue)){
            setSelectedItemError(true);
        }else{
            setSelectedItemError(false);
        }
    }
  }, [inputValue])

  function otherValueHandler(value){
    let otherValue = inputValue;
    otherValueSettter(otherValue)
    handleSelectSuggestion(value);
  }
  return (
    <>
    <label className={styles.suggestionInputLabel} htmlFor={id}>{title}</label>
    <div className={styles.suggestionInputWrapper}>
        <input
            type="text"
            id={id}
            list="suggestions"
            value={inputValue}
            placeholder={placeholder}
            onChange={(e)=>handleInputChange(e)}
            onBlur={(e)=>handleInputBlur(e)}
            className={styles.suggestionInput}
            onKeyDown={handleKeyDown}
        />
        <span className="fieldError">{fieldError}</span>
        <div className={styles.suggestionListWrapper}>
            <ul className={styles.suggestionListItemWrapper} tabIndex={0}>
                {(showSuggestions && inputValue.length > 0) && suggestions
                .filter((suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase())).slice(0,4)
                .map((suggestion, index) => (
                    <li 
                    className={styles.suggestionItem} 
                    key={index} 
                    onClick={() => handleSelectSuggestion(suggestion)}
                    >
                        {suggestion}
                    </li>
                )).concat([<li className={styles.suggestionItem} key={suggestions.length} onClick={() => otherValueHandler("Other")}>Other: {inputValue}</li>])}
            </ul>
        </div>
    </div>
    
    <p style={{display:(selectedItemError?"block":"none")}} className={styles.notFromListError}>Please select one option from the dropdown, select 'Other' if your treatment name is not in the list.</p>
    </>
  );
};

export default AutocompleteInput;


