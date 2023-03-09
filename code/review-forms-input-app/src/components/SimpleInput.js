import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  //we will use state first and set them to listen to input's onchanges
  const [enteredName, setEnteredName] = useState('');
  return (
    <form>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' />
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
