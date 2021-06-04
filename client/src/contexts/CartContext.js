import { createContext, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const cartContextValue = {
        products: []
    };
    return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext);

// class CartProvider {
//     render() {
//         return <CartContext.Provider value={cartContextValue}>{this.props.children}</CartContext.Provider>
//     }
// }