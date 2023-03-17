import useInput from "../hooks/use-input";
import Input from "./Input";

const BasicForm = (props) => {
  const {
    value: firstName,
    hasError: hasFirstNameError,
    isValid: isFirstNameValid,
    classIsValid: firstNameClassValid,
    valueChangeHandler: firstNameChangeHandler,
    valueInputBlurHandler: firstInputBlurHandler,
    reset: firstNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: lastName,
    hasError: hasLastNameError,
    isValid: isLastNameValid,
    classIsValid: lastNameClassValid,
    valueChangeHandler: lastNameChangeHandler,
    valueInputBlurHandler: lastInputBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    hasError: hasEmailError,
    isValid: isEmailValid,
    classIsValid: emailClassValid,
    valueChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  const submitHandler = (event) => {
    event.preventDefault();
    firstNameReset(); // maybe we can just have one
    lastNameReset();
    emailReset();
  };
  let formValid = isFirstNameValid && isLastNameValid && isEmailValid;

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <Input content='firstName'  />
        <div className={firstNameClassValid}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstNameChangeHandler}
            onBlur={firstInputBlurHandler}
            value={firstName}
          />
          {hasFirstNameError && <p>Missing First Name!</p>}
        </div>
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
      </div>
      <div className={emailClassValid}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          value={email}
          onBlur={emailInputBlurHandler}
        />
        {hasEmailError && <p>Wrong email format or missing email input</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
