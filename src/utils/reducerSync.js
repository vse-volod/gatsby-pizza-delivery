import {
  useReducer, useEffect,
} from 'react';

function useLocallyPersistedReducer(reducer, defaultState, storageKey = 'cart', init = null) {
  const hookVars = useReducer(reducer, defaultState, () => {
    const persisted = JSON.parse(window.localStorage.getItem(storageKey));
    if (persisted) {
      return persisted;
    }
    if (init) {
      return init(defaultState);
    }
    return defaultState;
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(hookVars[0]));
  }, [storageKey, hookVars[0]]);

  return hookVars;
}

export default useLocallyPersistedReducer;
