import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CartProvider, useCart } from 'use-cart';

const Cart = () => {
  const {
    items, addItem, removeItem, removeLineItem, clearCart,
  } = useCart();

  return (
    <div>
      {items.map((item) => (
        <div key={item.sku}>
          {item.sku}
          {' '}
          -
          {item.quantity}
          {' '}
          <button type="button" onClick={() => addItem(item.sku)}>Increase Quantity</button>
          <button type="button" onClick={() => removeItem(item.sku)}>
            Decrease Quantity
          </button>
          <button type="button" onClick={() => removeLineItem(item.sku)}>
            Remove from cart
          </button>
        </div>
      ))}
      <button type="button" onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

const Layout = ({ location, title, children }) => {
  const rootPath = '/';
  let header;

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
          <Cart />
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
