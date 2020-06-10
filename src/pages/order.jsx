import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import Heading from '../components/Heading';
import useExchangeRate from '../utils/useExchangeRate';
import SEO from '../components/Seo';

const OrderPage = () => {
  const [showErrorMessage, toggleErrorMessage] = useState(false);
  const [showSuccessMessage, toggleSuccessMessage] = useState(false);
  const exchangeRate = useExchangeRate('EUR_USD');
  const formUrl = `https://getform.io/f/${process.env.GETFORM_API_KEY}`;
  const onSubmit = (data) => {
    axios.post(formUrl, data)
      .then((response) => {
        if (response.status === 200) {
          toggleErrorMessage(false);
          toggleSuccessMessage(true);
          return;
        }
        toggleErrorMessage(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <SEO title="Order" />
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
    </Layout>
  );
};
export default OrderPage;
