import { createContext } from "react";

export const CartContext = createContext({'items': {}, 'promo': null});
export const CartManagerContext = createContext((_) => {});