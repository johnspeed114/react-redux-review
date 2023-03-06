import { useState, useEffect } from 'react';

import Card from './Card';
import useCounter from '../hooks/use-counter';
//forwardcounter the same exact code but with + 1 to the prevCounter, we need a reusable component
const BackwardCounter = () => {
  const counter = useCounter(false);

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
