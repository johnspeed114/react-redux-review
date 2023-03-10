import { useState, useEffect } from "react";

//[IMPORTANT] it's always important validate your inputs on the server not on the client
//Users can manipulate the validation logic code through the debugger's source code
const SimpleInput = (props) => {
  //we will use state first and set them to listen to input's onchanges
  //usestate starting as true can have issues with useeffect firing http effects if added as true

  const [enteredName, setEnteredName] = useState("");
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(null);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name Input is valid!");
    }
  }, [enteredNameIsValid]);

  // [FYI] why use useref for inputs? since it doesn't cause rerenders holding the same value through the lifecycle of the componenet
  //You want the form input to be with no changes when submitted(but usestate is used more)
  const nameInputRef = useRef("");
  const onChangeNameHandler = (event) => {
    // nameInputRef.current = event.target.value;
    // console.log(nameInputRef.current)
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // setEnteredNameTouched(true);

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(true);
      console.log(enteredNameIsValid);
      return;
    }
    //form submit when click button, http request is sent immediately
    //and forces a reload of the page/rerender for the app and event.preventdefault stops all that
    // const enteredValue = nameInputRef.current;
    //[FYI] on large issue with using refs for clearing input after submition is
    //inputForm.current.value = '' you are directly manipulating the DOM (in react NOT GOOD, let react do it)
    // console.log(enteredValue)

    setEnteredNameIsValid(false);
    console.log(enteredName);
  };

  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = enteredNameIsValid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          onChange={onChangeNameHandler}
          value={enteredName}
          id="name"
        />
        {enteredNameIsValid && <p className="error-text">Name is empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
