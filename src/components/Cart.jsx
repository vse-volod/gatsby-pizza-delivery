import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useCart } from '../utils/useCart';
import ItemControls from './ItemControls';

const getPizzaData = (sku, pizzas) => pizzas.nodes.find((p) => p.fields.sku === sku).frontmatter;
const priceTotal = (items, pizzas, deliveryPrice) => items.reduce(
  (total, onePizza) => total + (getPizzaData(onePizza.sku, pizzas).price * onePizza.quantity),
  deliveryPrice,
);

const Cart = () => {
  const [exchangeRate, setExchangeRate] = useState(1.13);
  useEffect(() => {
    async function fetchData() {
      const res = await window.fetch('https://free.currconv.com/api/v7/convert?q=EUR_USD&compact=ultra&apiKey=22116ba83b453185f79c');
      res
        .json()
        .then((result) => setExchangeRate(result.EUR_USD))
        .catch((err) => console.error(err));
    }

    fetchData();
  });
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
        {lineItemsCount > 0 && (
        <div>
          delivery costs: $
          {' '}
          {deliveryPriceInUSD}
          /€
          {(deliveryPriceInUSD * exchangeRate).toFixed(2)}
        </div>
        )}
        <div>
          Total:
          {itemsCount}
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
