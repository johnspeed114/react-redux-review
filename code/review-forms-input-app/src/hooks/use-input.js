import { useState, useReducer } from "react";

const intialState = {
  enteredValue: "",
  isTouched: false,
};

function valueReducer(state, action) {
  switch (action.type) {
    case "change_value": {
      return {
        enteredValue: action.newEnteredValue,
        isTouched: state.istouched,
      };
    }
    case "reset": {
      return {
        enteredValue: "",
        isTouched: false,
      };
    }
    case "on_blur": {
      return {
        isTouched: true,
        enteredValue: state.enteredValue,
      };
    }
    default: 
      return intialState;
  }
}

const useInput = (validateValue) => {
  const [state, dispatch] = useReducer(valueReducer, intialState);

  //[fyi] inputs for hooks should be generic (we can pass a valid function as an arg)
  const valueIsValid = validateValue(state.enteredValue);
  const hasError = !valueIsValid && state.isTouched;
  const classIsValid = hasError ? "form-control invalid" : "form-control";

  const valueChangeHandler = (event) => {
    dispatch({ type: "change_value", newEnteredValue: event.target.value });
  };

  const valueInputBlurHandler = () => {
    dispatch({ type: "on_blur" });

    //so we can run the logic of validation after losing focus
  };

  const reset = () => {
    // console.log(state.enteredValue, 'vv');
    dispatch({ type: "reset" });
  };

  return {
    value: state.enteredValue,
    hasError,
    isValid: valueIsValid,
    classIsValid,
    valueChangeHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;
