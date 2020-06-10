import React from 'react';
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { useCart } from '../utils/useCart';

const ControlButton = styled.button`
  ${tw`px-3 focus:outline-none hover:cursor-pointer last:pr-0`};
`;

const Controls = styled.div`
  ${tw`flex text-green`};
`;

const Quantity = styled.div`
  min-width: 1.5rem;
  ${tw`text-center`};
`;

const ItemControls = ({ sku }) => {
  const { addItem, removeItem, getItem } = useCart();
  const currentItemInCart = getItem(sku);
  const quantity = currentItemInCart ? currentItemInCart.quantity : 0;
  return (
    <section>
      <Controls>
        <ControlButton type="button" onClick={() => removeItem(sku)}>
          -
        </ControlButton>
        <Quantity>
          {quantity}
        </Quantity>
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
