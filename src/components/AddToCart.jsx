import React from 'react';
import { useCart } from 'use-cart';
import PropTypes from 'prop-types';

const AddToCart = ({ price, sku }) => {
  const { addItem } = useCart();
  return (
    <section>
      <small>
        $
        {price}
      </small>
      <button type="button" onClick={() => addItem(sku)}>Add to basket</button>
    </section>
  );
};

AddToCart.propTypes = {
  price: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired,
};

export default AddToCart;
