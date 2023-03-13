import { useState } from "react";
import useInput from "../hooks/use-input";

//[IMPORTANT] it's always important validate your inputs on the server not on the client
//Users can manipulate the validation logic code through the debugger's source code
const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueInputBlurHandler: nameBlurHandler,
    reset: nameReset
    // fyi this prop is passed as an arg to useInput we run this funct as an arg then wrap with the enteredValue
  } = useInput(value => value.trim()!== '');
  //we will use state first and set them to listen to input's onchanges
  //usestate starting as true can have issues with useeffect firing http effects if added as true

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // const [formIsValid, setFormIsValid] = useState(false)
  //[IMPORTANT] I can use this logic and apply it to all my if conditions on my Portfolio repo! Check that out!
  // const enteredNameIsValid = enteredName.trim() !== "";
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredEmailIsValid =
    enteredEmail.includes("@") && enteredEmail.trim() !== "";
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  //[fyi] instead of using useeffect we can use just variable formisalid
  let formIsValid = enteredNameIsValid && enteredEmailIsValid;
  //[FYI] the code gets rerendered after each change to the change input already; hence, why we don't need useffect to call again
  // if (enteredNameIsValid && enteredEmailIsValid){
  //   formIsValid = true;
  // }

  // [FYI] why use useref for inputs? since it doesn't cause rerenders holding the same value through the lifecycle of the componenet
  //You want the form input to be with no changes when submitted(but usestate is used more)
  // const nameInputRef = useRef("");
  // const nameChangeHandler = (event) => {
  //   // nameInputRef.current = event.target.value;
  //   // console.log(nameInputRef.current)
  //   setEnteredName(event.target.value);
  //   //this form of validation(mix of keystrokes and unselected element)
  //   //would work better, you get submit error, then leave it error unless it's keystroke detects corrects
  //   //[fyi] setEnteredname is one step behind... so just use event.target.value
  // };

  const onChangeEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  //function for onblur but onblur just means once the element is not selected
  // const nameInputBlurHandler = () => {
  //   setEnteredNameTouched(true);
  //   //so we can run the logic of validation after losing focus
  // };

  const emailInputBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();


    //form submit when click button, http request is sent immediately
    //and forces a reload of the page/rerender for the app and event.preventdefault stops all that
    // const enteredValue = nameInputRef.current;
    //[FYI] on large issue with using refs for clearing input after submition is
    //inputForm.current.value = '' you are directly manipulating the DOM (in react NOT GOOD, let react do it)
    if (!enteredNameIsValid) {
      return;
    }
    if (!enteredEmailIsValid) {
      return;
    }
    // console.log(enteredValue)
    console.log(enteredName);
    nameReset();
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          onChange={nameChangeHandler}
          value={enteredName}
          id="name"
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p className="error-text">Name is empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          onChange={onChangeEmailHandler}
          value={enteredEmail}
          id="email"
          onBlur={emailInputBlurHandler}
        />

        {emailInputIsInvalid && (
          <p className="error-text">Email is is empty or missing '@'</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
