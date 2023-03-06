import { useState, useEffect } from 'react';

import Card from './Card';
import useCounter from '../hooks/use-counter';

const ForwardCounter = () => {
  //any state called inside the custom hook will be applied and tied to this component(but each different component using this custom hook will have their own unique state from the custom hook)
  //[FYI]custom hooks like any other component is a just function since this functional components right for react?
  const counter = useCounter(); //this reminds me of useNavigate or any react router hooks, since they are like our custom hooks here

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
