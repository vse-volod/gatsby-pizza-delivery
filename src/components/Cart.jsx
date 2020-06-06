import React from 'react';
import { useCart } from 'use-cart';
import { useStaticQuery, graphql } from 'gatsby';
import ItemControls from './ItemControls';

const getPizzaData = (sku, pizzas) => pizzas.nodes.find((p) => p.fields.sku === sku).frontmatter;
const priceTotal = (items, pizzas) => items.reduce(
  (total, onePizza) => total + (getPizzaData(onePizza.sku, pizzas).price * onePizza.quantity), 0,
);

const Cart = () => {
  const {
    items, removeLineItem, clearCart, lineItemsCount,
  } = useCart();
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
  const pizzas = data.allMdx;
  const priceTotalInUSD = priceTotal(items, pizzas);
  const exchangeRate = 1.13;
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
              <ItemControls
                price={pizzaData.price}
                sku={item.sku}
              />
              <button type="button" onClick={() => removeLineItem(item.sku)}>
                Remove from cart
              </button>
            </div>
          );
        })}
        <div>
          Total:
          {lineItemsCount}
          /$
          {priceTotalInUSD}
          /€
          {(priceTotalInUSD * exchangeRate).toFixed(2)}
        </div>
        <button type="button" onClick={clearCart}>Clear Cart</button>
      </div>
    );
  }
  return (<div>empty cart</div>);
};

export default Cart;
