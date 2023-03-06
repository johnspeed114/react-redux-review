import { useState, useEffect } from 'react';
//[FYI] use word MUST start in this component name, since it will tell react that this is a custom hook

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forwards
        ? setCounter((prevCounter) => prevCounter + 1)
        : setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
    //why add forwards to dependency? since it's a prop not defined in this useeffect function and a set state
  }, [forwards]);
  //you can return whatever you want in here
  return counter;
};

export default useCounter;
