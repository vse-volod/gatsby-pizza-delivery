import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import OrderHandler from '../components/OrderHandler';

const OrderPage = () => (
  <Layout>
    <SEO title="Order" />
    <OrderHandler />
  </Layout>
);
export default OrderPage;
