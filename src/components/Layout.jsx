import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CartProvider } from '../utils/useCart';
import Cart from './Cart';
import useExchangeRate from '../utils/useExchangeRate';


const Layout = ({ location, title, children }) => {
  const rootPath = '/';
  let header;
  const exchangeRate = useExchangeRate('EUR_USD');

  if (location.pathname === rootPath) {
    header = (
      <h1 style={{ marginTop: 0 }}>
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
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          marginTop: 0,
        }}
      >
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
      </h3>
    );
  }
  return (
    <CartProvider>
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <header>{header}</header>
        <main>
          {children}
          <Cart exchangeRate={exchangeRate} />
        </main>
        <footer>
          ©
          {' '}
          {new Date().getFullYear()}
          , Built with
          {' '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </CartProvider>
  );
};

Layout.propTypes = {
  location: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};

export default Layout;
