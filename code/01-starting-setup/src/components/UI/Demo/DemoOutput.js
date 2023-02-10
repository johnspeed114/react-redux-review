import React from 'react';

const DemoOutput = (props) => {
  console.log('demo run');
  return <p>{props.show ? 'This is new!' : ''}</p>;
};
// [FYI]This is new. I never full knew why we used react memo. Since it only lets react re-execute and re-evaluate when the props are changed
//Cool stuff!
//With this memo demoutput doesn't get re-evaluated hence no console log
//[FYI] There is a performace cost to memo. Since it needs to compare props, it would need to save the previous prop state and then compare the two props
//Re-eveluating cost vs prop comparison costs(you have to figure that out, likee if the children component goes deep use memo)
//just pick for key parts of your app to use memo
export default React.memo(DemoOutput);
