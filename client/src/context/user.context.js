import { createContext } from 'react';

const noop = () => {};

export const UserContext = createContext({
  room: null,
  name: null,
});
