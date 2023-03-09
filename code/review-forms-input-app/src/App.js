import SimpleInput from './components/SimpleInput';
//Validate forms has one of the most complex logic. why?
//You have two general groups of conditions you deal with
//[I] 1)one or more inputs are invalid 2) all inputs are valid(sooo you need to check each inputs valid logic and they are different!)
//[II] validation input logic may need to be async for backend api call, and various validation logics
//[III] each input can have multiple condition checkeers and error messages and highlight errors
//[IV] condition of not saved/submitted if there are errors and form to be submitted/saved for VALID ALL
//[V] When do you validate? too! 1) like when form is submitted 2)move away the selected input 3)on every keystroke or change
//-> SO MANY things to actually consider for forms!
function App() {
  return (
    <div className='app'>
      <SimpleInput />
    </div>
  );
}

export default App;
