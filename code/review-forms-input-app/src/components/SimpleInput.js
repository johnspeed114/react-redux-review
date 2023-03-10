import { useRef, useState } from 'react';

//[IMPORTANT] it's always important validate your inputs on the server not on the client
//Users can manipulate the validation logic code through the debugger's source code
const SimpleInput = (props) => {
  //we will use state first and set them to listen to input's onchanges
  const [enteredName, setEnteredName] = useState('');

  // [FYI] why use useref for inputs? since it doesn't cause rerenders holding the same value through the lifecycle of the componenet
  //You want the form input to be with no changes when submitted(but usestate is used more)
  const nameInputRef = useRef('');
  const onChangeNameHandler = (event)=>{
    // nameInputRef.current = event.target.value;
    // console.log(nameInputRef.current)
    setEnteredName(event.target.value )
  }

  const formSubmitHandler = (event)=> {
    event.preventDefault();
    console.log(enteredName)
    //form submit when click button, http request is sent immediately
    //and forces a reload of the page/rerender for the app and event.preventdefault stops all that 
    // const enteredValue = nameInputRef.current;
    //[FYI] on large issue with using refs for clearing input after submition is 
    //inputForm.current.value = '' you are directly manipulating the DOM (in react NOT GOOD, let react do it)
    // console.log(enteredValue)
    setEnteredName('')
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        {/* adding ref is great for text selection and focus on which input */}
        <input type='text' id='name' onChange={onChangeNameHandler} />
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
