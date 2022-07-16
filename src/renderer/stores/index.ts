import { createContext, useContext } from 'react';
import appStore from './modules/app';

interface Store {
  appStore: typeof appStore;
}

const store: Store = {
  appStore,
};

const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

export default store;
