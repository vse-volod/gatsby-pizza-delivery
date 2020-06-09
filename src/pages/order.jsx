import React from 'react';
import Layout from '../components/Layout';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import useExchangeRate from '../utils/useExchangeRate';
import SEO from '../components/Seo';


const OrderPage = () => {
  const exchangeRate = useExchangeRate('EUR_USD');
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <SEO title="Order" />
      <div id="order-review">
        <Cart id="order-review" exchangeRate={exchangeRate} hideFooter />
        <OrderForm onSubmit={onSubmit} />
      </div>
    </Layout>
  );
};
export default OrderPage;
