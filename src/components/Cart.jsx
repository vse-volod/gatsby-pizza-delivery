import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useCart } from '../utils/useCart';
import ItemControls from './ItemControls';

const getPizzaData = (sku, pizzas) => pizzas.nodes.find((p) => p.fields.sku === sku).frontmatter;
const priceTotal = (items, pizzas, deliveryPrice) => items.reduce(
  (total, onePizza) => total + (getPizzaData(onePizza.sku, pizzas).price * onePizza.quantity),
  deliveryPrice,
);
const convertPriceToEUR = (price, rate) => (rate ? (price * rate).toFixed(2) : 'N/A');

const Cart = ({ exchangeRate }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMdx {
          nodes {
            fields {
              sku
            }
            frontmatter {
              title
              price
            }
          }
        }
      }
    `,
  );
  const {
    items, removeLineItem, clearCart, lineItemsCount, itemsCount,
  } = useCart();
  const pizzas = data.allMdx;
  const deliveryPriceInUSD = 5;
  const priceTotalInUSD = priceTotal(items, pizzas, deliveryPriceInUSD);
  if (items.length > 0) {
    return (
      <div>
        {items.map((item) => {
          const pizzaData = getPizzaData(item.sku, pizzas);
          return (
            <div key={item.sku}>
              {pizzaData.title}
              {' '}
              -
              $
              {pizzaData.price}
              <ItemControls
                sku={item.sku}
              />
              <button type="button" onClick={() => removeLineItem(item.sku)}>
                X
              </button>
            </div>
          );
        })}
        {lineItemsCount > 0 && (
        <div>
          delivery costs: $
          {' '}
          {deliveryPriceInUSD}
          /
          {convertPriceToEUR(deliveryPriceInUSD, exchangeRate)}
          €
        </div>
        )}
        <div>
          Total:
          {itemsCount}
          /$
          {priceTotalInUSD}
          /
          {convertPriceToEUR(priceTotalInUSD, exchangeRate)}
          €
        </div>
        <button type="button" onClick={clearCart}>Clear Cart</button>
      </div>
    );
  }
  return (<div>empty cart</div>);
};

Cart.propTypes = {
  exchangeRate: PropTypes.number.isRequired,
};

export default Cart;
