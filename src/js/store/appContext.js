import React, { createContext, useContext, useState } from 'react';
import getState from './flux';

const Context = createContext(null);

const ContextProvider = ({ children }) => {
    const [store, setStore] = useState(getState({ getStore, setStore }).store);
    const actions = getState({ getStore, setStore }).actions;

    return (
        <Context.Provider value={{ store, actions }}>
            {children}
        </Context.Provider>
    );
};

const useAppContext = () => useContext(Context);

export { Context, ContextProvider, useAppContext };
