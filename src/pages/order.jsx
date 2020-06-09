import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import useExchangeRate from '../utils/useExchangeRate';
import SEO from '../components/Seo';

const Heading = styled.h1`
  ${tw`text-3xl font-bold px-3 pt-4`}
  color: #D45D27;
`;

const OrderPage = () => {
  const exchangeRate = useExchangeRate('EUR_USD');
  const onSubmit = (data) => console.log(data);
  return (
    <Layout>
      <SEO title="Order" />
      <Heading id="order-review">Your order:</Heading>
      <Cart exchangeRate={exchangeRate} hideFooter />
      <Heading>Complete your order:</Heading>
      <OrderForm onSubmit={onSubmit} />
    </Layout>
  );
};
export default OrderPage;
