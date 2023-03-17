import React from "react";
import useInput from "../hooks/use-input";

const Input = (props) => {
    const {
        value,
        hasError,
        isValid,
        classIsValid,
        valueChangeHandler,
        valueInputBlurHandler,
        reset,
      } = props.content ==='email' ?  (value) => value.trim() !== "" && value.includes("@"): useInput((value) => value.trim() !== "") ;
// [Issue] how would we set up value function prop conditional and make this work?
//Since I need a conditional expression for two different things, name and email
      //found a solution but need to try if it works or not
  return (
    <div className={lastNameClassValid}>
      <label htmlFor="name">Last Name</label>
      <input
        type="text"
        id="name"
        onChange={lastNameChangeHandler}
        value={lastName}
        onBlur={lastInputBlurHandler}
      />
      {hasLastNameError && (
        <p>Obama will not be happy for you not adding a last name</p>
      )}
    </div>
  );
};

export default Input;
