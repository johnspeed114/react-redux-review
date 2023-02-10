import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  //Why does the console log keeep running even with memo? since reeact memo uses a comparison operatorr. that only compares for primitive values
  //functions saved in var are stored as references and previous and new variables references are always different
  console.log('button running');
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default React.memo(Button);
