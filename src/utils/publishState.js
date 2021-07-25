import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getStorage, setStorage } from './storage';

const Context = createContext();

export const useMyState = () => useContext(Context);

export const StateProvider = ({ children }) => {
  const storage = getStorage();

  const [state, setState] = useState({
    companyName: storage['companyName'] || '',
    title: storage['title'] || '',
    location: storage['location'] || 'Guyane',
    contract: storage['contract'] || 'CDI',
    duration: storage['duration'] || '',
    option1: storage['option1'] || false,
    option2: storage['option2'] || false,
    option3: storage['option3'] || false,
    option4: storage['option4'] || false,
    color: storage['color'] || '',
    logo: storage['logo'] || null,
    salary: storage['salary'] || '',
    description: storage['description'] || '',
    source: storage['source'] || '',
    sourceEmail: storage['sourceEmail'] || '',
    companyTwitter: storage['companyTwitter'] || '',
    companyEmail: storage['companyEmail'] || '',
    companyUrl: storage['companyUrl'] || '',
    consent: false,
  });

  const setMyState = (id, value, stored = true) => {
    setState((s) => ({ ...s, [id]: value }));
    if (stored) setStorage(id, value);
  };

  const value = useMemo(() => ({ state, setState: setMyState }), [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

StateProvider.propTypes = { children: PropTypes.node.isRequired };
