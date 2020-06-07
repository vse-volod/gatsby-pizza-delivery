import React from 'react';
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { useCart } from '../utils/useCart';

const ControlButton = styled.button`
  ${tw`px-3 focus:outline-none`};
`;

const Controls = styled.div`
  color: #337C31;
`;

const ItemControls = ({ sku }) => {
  const { addItem, removeItem, items } = useCart();
  const currentItemInCart = items.find((cartItem) => cartItem.sku === sku);
  const quantity = currentItemInCart ? currentItemInCart.quantity : 0;
  return (
    <section>
      <Controls>
        <ControlButton type="button" onClick={() => removeItem(sku)}>
          -
        </ControlButton>
        {quantity}
        <ControlButton type="button" onClick={() => addItem(sku)}>
          +
        </ControlButton>
      </Controls>
    </section>
  );
};

ItemControls.propTypes = {
  sku: PropTypes.string.isRequired,
};

export default ItemControls;
