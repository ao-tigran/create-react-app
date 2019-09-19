import React, { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';
import humps from 'humps';
import PropTypes from 'prop-types';

export const GlobalErrContext = createContext();

export const GlobalErrProvider = ({ children }) => {
  const [globalError, setGlobalError] = useState(null);

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => ({
        ...config,
        data: humps.decamelizeKeys(config.data),
      }),
      (error) => Promise.reject(error),
    );

    axios.interceptors.response.use(
      (response) => ({
        ...response,
        data: humps.camelizeKeys(response.data),
      }),
      (error) => {
        setGlobalError(error.response);

        return Promise.reject(error);
      },
    );
  }, []);

  return (
    <GlobalErrContext.Provider value={[globalError, setGlobalError]}>
      {children}
    </GlobalErrContext.Provider>
  );
};

GlobalErrProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useError = () => useContext(GlobalErrContext);
