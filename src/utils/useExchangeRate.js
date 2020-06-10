import { useState, useEffect } from 'react';
import lscache from 'lscache';

function useExchangeRate(currencyPair) {
  const [exchangeRate, setExchangeRate] = useState(null);
  lscache.flushExpired(); // flushing expired cache
  const cachedRate = lscache.get('rate');
  const saveAndSetExchangeRate = (rate) => {
    if (rate) {
      lscache.set('rate', rate, 60); // caching exchage rate for 60 min
      setExchangeRate(rate);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const res = await window.fetch(`https://free.currconv.com/api/v7/convert?q=${currencyPair}&compact=ultra&apiKey=${process.env.CURRCONV_API_KEY}`);
      res
        .json()
        .then((result) => saveAndSetExchangeRate(result[currencyPair]))
        .catch((err) => console.error(err));
    }
    if (!cachedRate) {
      fetchData();
    }
  });
  console.log(typeof exchangeRate, exchangeRate);
  return exchangeRate || cachedRate;
}

export default useExchangeRate;
