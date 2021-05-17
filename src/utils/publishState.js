import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getStorage } from './storage';

const Context = createContext();

export const useMyState = () => useContext(Context);

export const StateProvider = ({ children }) => {
  const storage = getStorage();

  const [state, setState] = useState({
    title: storage['title'] || '',
    location: storage['location'] || 'Guyane',
    contract: storage['contract'] || 'CDI',
    duration: storage['duration'] || '',
    salary: storage['salary'] || '',
    source: storage['source'] || '',
    companyName: storage['companyName'] || '',
    option1: storage['option1'] || false,
    option2: storage['option2'] || false,
    option3: storage['option3'] || false,
    option4: storage['option4'] || false,
    color: storage['color'] || '',
    price: 0,
  });

  const setMyState = (id, value) => {
    setState((s) => ({ ...s, [id]: value }));
  };

  const value = useMemo(() => ({ state, setState: setMyState }), [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

StateProvider.propTypes = { children: PropTypes.node.isRequired };
