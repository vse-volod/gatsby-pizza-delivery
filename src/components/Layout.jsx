import React from 'react';
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { CartProvider } from '../utils/useCart';
import Cart from './Cart';
import Header from './Header';
import useExchangeRate from '../utils/useExchangeRate';

const Container = styled.div`
  ${tw`container mx-auto pt-12 sm:pt-24`}
`;

const Layout = ({ children }) => {
  const exchangeRate = useExchangeRate('EUR_USD');
  return (
    <CartProvider>
      <Header />
      <Container>
        <main>
          {children}
          <Cart exchangeRate={exchangeRate} />
        </main>
      </Container>
    </CartProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
