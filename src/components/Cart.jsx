import React from 'react';
import { useCart } from 'use-cart';
import { useStaticQuery, graphql } from 'gatsby';

const Cart = () => {
  const {
    items, addItem, removeItem, removeLineItem, clearCart,
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
  const getPizzaData = (sku) => pizzas.nodes.find((p) => p.fields.sku === sku);
  return (
    <div>
      {items.map((item) => {
        const pizzaData = getPizzaData(item.sku);
        return (
          <div key={item.sku}>
            {pizzaData.frontmatter.title}
            {' '}
            -
            {item.quantity}
            {' '}
            $
            {pizzaData.frontmatter.price}
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
      <button type="button" onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
