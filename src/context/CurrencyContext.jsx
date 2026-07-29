import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CurrencyContext = createContext();

export const currencies = [
  { code: 'USD', symbol: '$',  label: 'USD ($)'  },
  { code: 'INR', symbol: '₹',  label: 'INR (₹)'  },
  { code: 'EUR', symbol: '€',  label: 'EUR (€)'  },
  { code: 'GBP', symbol: '£',  label: 'GBP (£)'  },
];

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useLocalStorage('hms_currency', currencies[0]);
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
