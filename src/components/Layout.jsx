import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { CartProvider } from '../utils/useCart';
import Cart from './Cart';
import useExchangeRate from '../utils/useExchangeRate';

const Container = styled.div`
  ${tw`container mx-auto`}
`;

const Layout = ({ title, children }) => {
  const exchangeRate = useExchangeRate('EUR_USD');
  return (
    <CartProvider>
      <Container>
        <header>
          <h1>
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
              }}
              to="/"
            >
              {title}
            </Link>
          </h1>
        </header>
        <main>
          {children}
          <Cart exchangeRate={exchangeRate} />
        </main>
      </Container>
    </CartProvider>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
