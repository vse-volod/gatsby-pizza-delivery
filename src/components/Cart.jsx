import React from 'react';
import { useCart } from 'use-cart';
import { useStaticQuery, graphql } from 'gatsby';

const getPizzaData = (sku, pizzas) => pizzas.nodes.find((p) => p.fields.sku === sku).frontmatter;
const priceTotal = (items, pizzas) => items.reduce(
  (total, onePizza) => total + (getPizzaData(onePizza.sku, pizzas).price * onePizza.quantity), 0,
);

const Cart = () => {
  const {
    items, addItem, removeItem, removeLineItem, clearCart, lineItemsCount,
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
              {item.quantity}
              {' '}
              $
              {pizzaData.price}
              <button type="button" onClick={() => addItem(item.sku)}>Increase Quantity</button>
              <button type="button" onClick={() => removeItem(item.sku)}>
                Decrease Quantity
              </button>
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
          {priceTotal(items, pizzas)}
        </div>
        <button type="button" onClick={clearCart}>Clear Cart</button>
      </div>
    );
  }
  return (<div>empty cart</div>);
};

export default Cart;
