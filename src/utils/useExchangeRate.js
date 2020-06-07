import { useState, useEffect } from 'react';
import lscache from 'lscache';

function useExchangeRate(currencyPair) {
  const [exchangeRate, setExchangeRate] = useState(null);
  lscache.flushExpired(); // flushing expired cache
  const cachedRate = lscache.get('rate');
  const saveAndSetExchangeRate = (rate) => {
    lscache.set('rate', rate, 60); // caching exchage rate for 60 min
    setExchangeRate(rate);
  };
  useEffect(() => {
    async function fetchData() {
      const res = await window.fetch(`https://free.currconv.com/api/v7/convert?q=${currencyPair}&compact=ultra&apiKey=22116ba83b453185f79c`);
      res
        .json()
        .then((result) => saveAndSetExchangeRate(result[currencyPair]))
        .catch((err) => console.error(err));
    }
    if (!cachedRate) {
      fetchData();
    }
  });
  return exchangeRate || cachedRate;
}

export default useExchangeRate;
