import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    //fyi this is how you get the input values
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const inputNameValid = !isEmpty(enteredName);
    const inputStreetValid = !isEmpty(enteredStreet);
    const inputPostalValid = !isFiveChars(enteredPostal);
    const inputCityValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: inputNameValid,
      street: inputStreetValid,
      postal: inputPostalValid,
      city: inputCityValid,
    });

    const formisValid =
      inputCityValid && inputStreetValid && inputNameValid && inputPostalValid;

    if (formisValid) {
      //[to do ] post cart
      //think about it, i done this before. How would I post a new order? we can use avaialbemeals follow a similar pattern but for post

      props.postOrders({enteredName, enteredCity, enteredPostal, enteredStreet});
    }
  };

  const controlClass = (inputField) => {
    return `${classes.control} ${
      formInputsValidity[inputField] ? "" : classes.invalid
    }`;
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={controlClass("name")}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={controlClass("street")}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && (
          <p>Please enter a valid street address!</p>
        )}
      </div>
      <div className={controlClass("postal")}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={controlClass("city")}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
