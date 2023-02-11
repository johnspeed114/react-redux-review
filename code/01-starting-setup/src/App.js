import React, { useState, useCallback } from 'react';
import Button from './components/UI/Button/Button';
import './App.css';
import DemoOutput from './components/UI/Demo/DemoOutput';

function App() {
  //[useCallback] saves the object function and compares it with that current one like ob2 = ob1 , ob1 === ob2
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log('running');
  //anytime the state/prop/context within that component changes react re-evaluates and re-executes all the component from that level and below
  //Also, [] dependencies is just like useeffect
  const toggleParagraphHandler = useCallback(() => {
    //closure example - when function defined the outscope variables are saved like a picture for the function, if we udpate allowToggle it wouldnt update. due to usecallback, unless we update the dependency like useEffect
    //to rend and update the function for a change in allowToggle state
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  return (
    <div className='app'>
      <h1>Hi there!</h1>
      {/* react components here like functions calls, if the state/prop changes the whole return is rerender. Hence, this is why DemoOutput comp re-evealuates(not rerend, that only happens
        with changes in the html) even without it's prop changes */}
      {/* [Question]What would you do if the child of DemoOutput more children below it has no changes in reality, would that button click every time be a huge waste from re-evaluation. 
        Performance issue(esp larger apps)  */}
      <DemoOutput show={showParagraph} />
      {/* FYI if the element page for a brower that tag flashes that tag was changed in the DOM */}
      <Button onClick={allowToggleHandler}>Allow Toggle</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
