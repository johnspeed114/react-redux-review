import useInput from '../hooks/use-input';

const BasicForm = (props) => {
  const {
    value: firstName,
    hasError: hasFirstNameError,
    isValid: isFirstNameValid,
    valueChangeHandler: firstNameChangeHandler,
    valueInputBlurHandler: firstInputBlurHandler,
    reset: firstNameReset,
  } = useInput((value) => value.trim() !== '');

  const nameChangeHandler = (event) => {
    firstNameChangeHandler(event.target.value);
    console.log(firstName);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    firstNameReset(); // maybe we can just have one
  };
  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={nameChangeHandler} />
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' />
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' />
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
