import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import Cart from '../components/Cart';
import useExchangeRate from '../utils/useExchangeRate';
import SEO from '../components/Seo';

const Heading = styled.h1`
  ${tw`text-3xl font-bold`}
  color: #D45D27;;
`;

const OrderPage = () => {
  const exchangeRate = useExchangeRate('EUR_USD');
  return (
    <Layout>
      <SEO title="Order" />
      <Heading id="order-review">Your order:</Heading>
      <Cart exchangeRate={exchangeRate} hideFooter />
      <Heading>To complete order, fill the form below:</Heading>
    </Layout>
  );
};
export default OrderPage;
