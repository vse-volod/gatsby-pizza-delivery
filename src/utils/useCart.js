import React, {
  useContext, createContext,
} from 'react';
import PropTypes from 'prop-types';
import { reducer } from './reducer';
import useLocallyPersistedReducer from './reducerSync';

const CartContext = createContext();


export const CartProvider = ({ children, initialCart }) => {
  const [state, dispatch] = useLocallyPersistedReducer(reducer, { items: initialCart }, 'cart');

  const addItemHandler = (sku, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { sku, quantity } });
  };

  const removeItemHandler = (sku, quantity = 1) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { sku, quantity } });
  };

  const getItemsCount = state.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const removeLineItemHandler = (sku) => {
    dispatch({ type: 'REMOVE_LINE_ITEM', payload: { sku } });
  };

  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCartHandler = (sku) => state.items.some((item) => item.sku === sku);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        lineItemsCount: state.items.length,
        itemsCount: getItemsCount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        removeLineItem: removeLineItemHandler,
        clearCart: clearCartHandler,
        isInCart: isInCartHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialCart: PropTypes.array,
};

CartProvider.defaultProps = {
  initialCart: [],
};

export const useCart = () => useContext(CartContext);
