import { useState } from "react";


const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  //[fyi] inputs for hooks should be generic (we can pass a valid function as an arg)
  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlurHandler = () => {
    setIsTouched(true);
    //so we can run the logic of validation after losing focus
  }

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false)
  }

  return {
    value: enteredValue, hasError,isValid: valueIsValid, valueChangeHandler, valueInputBlurHandler, reset
  }
};

export default useInput;
