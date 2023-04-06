import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    //clicking to the order button would show the checkout confirm button
    setIsCheckout(true);
  };

  const postOrders = async (userData) => {
    try {
      setIsSubmitting(true)
      const response = await fetch(
        "https://react-http-2458e-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: userData,
            order: cartCtx.items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Somewhere for the push went wrong");
      }

      const data = response.json();
      //[TO DO] We will have to remove this later otherwises privacy data is shown to the public
      console.log(data);
      
      setIsSubmitting(false)
      setDidSubmit(true);
      cartCtx.clearItem();
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = <>{cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckout && (
    <Checkout onCancel={props.onClose} postOrders={postOrders} />
  )}
  {/* [IMPORTANT] always good to make your code lean for jsx!, Therefore
  you would have the modal conditionals */}
  {!isCheckout && modalAction}
  </>

  const isSubmittingModal = <p>Sending ordered data...</p>

  const didSubmitModal = <><p>Submit Successfully</p> <div className={classes.actions}>
  <button className={classes["button--alt"]} onClick={props.onClose}>
    Close
  </button></div></>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit &&cartModalContent}
      {isSubmitting && isSubmittingModal}
      {/* [fyi] issubmitting and didSubmit can't happen at the same time in this app, but good practice for future apps */}
      {!isSubmitting && didSubmit && didSubmitModal}
    </Modal>
  );
};

export default Cart;
