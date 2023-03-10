import { useState, useEffect } from 'react';

const SimpleInput = (props) => {
  //we will use state first and set them to listen to input's onchanges
  const [enteredName, setEnteredName] = useState('');
  //usestate starting as true can have issues with useeffect firing http effects if added as true
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(null);
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log('Name Input is valid!');
    }
  }, [enteredNameIsValid]);

  const onChangeNameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(true);
      console.log(enteredNameIsValid);
      return;
    }

    setEnteredNameIsValid(false);
    console.log(enteredName);
  };

  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = enteredNameIsValid
    ? 'form-control invalid'
    : 'form-control';
  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          onChange={onChangeNameHandler}
          value={enteredName}
          id='name'
        />
        {enteredNameIsValid && <p className='error-text'>Name is empty</p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
