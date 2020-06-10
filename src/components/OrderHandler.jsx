import React, { useState } from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';
import Heading from './Heading';
import Cart from './Cart';
import { useCart } from '../utils/useCart';
import useExchangeRate from '../utils/useExchangeRate';


const OrderHandler = () => {
  const [showErrorMessage, toggleErrorMessage] = useState(false);
  const [showSuccessMessage, toggleSuccessMessage] = useState(false);
  const exchangeRate = useExchangeRate('EUR_USD');
  const { clearCart } = useCart();
  const formUrl = `https://getform.io/f/${process.env.GETFORM_API_KEY}`;
  const onSubmit = (data) => {
    axios.post(formUrl, data)
      .then((response) => {
        if (response.status === 200) {
          toggleErrorMessage(false);
          toggleSuccessMessage(true);
          clearCart();
          return;
        }
        toggleErrorMessage(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {showSuccessMessage ? (
        <Heading>Thank you for the order!</Heading>
      ) : (
        <div id="order-review">
          <Cart id="order-review" exchangeRate={exchangeRate} hideFooter />
          <OrderForm onSubmit={onSubmit} />
          {showErrorMessage
              && <div>An error occured while sending your order, please try again</div>}
        </div>
      )}
    </>
  );
};

export default OrderHandler;
