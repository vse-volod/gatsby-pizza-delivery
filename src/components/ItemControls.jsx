import React from 'react';
import { useCart } from 'use-cart';
import PropTypes from 'prop-types';

const ItemControls = ({ price, sku }) => {
  const { addItem, removeItem, items } = useCart();
  const currentItemInCart = items.find((cartItem) => cartItem.sku === sku);
  const quantity = currentItemInCart ? currentItemInCart.quantity : 0;
  return (
    <section>
      <small>
        $
        {price}
      </small>
      <button type="button" onClick={() => addItem(sku)}>
        Increase Quantity
      </button>
      {quantity}
      <button type="button" onClick={() => removeItem(sku)}>
        Decrease Quantity
      </button>
    </section>
  );
};

ItemControls.propTypes = {
  price: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired,
};

export default ItemControls;
