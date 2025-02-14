// configuratorStore.js
import create from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  totalItems: 0,
  cartTotal: () => 0,
  addToCart: (item) => set((state) => {
    const cart = [...state.cart];
    const existingProduct = cart.find(p => p.product._id === item.product._id);
    if (existingProduct) {
      existingProduct.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    return {
      cart,
      totalItems: cart.reduce((acc, p) => acc + p.quantity, 0),
      cartTotal: () => cart.reduce((acc, p) => acc + (p.product.price * p.quantity), 0).toFixed(2),
    };
  }),
  resetCart: () => set({ cart: [], totalItems: 0 }),
}));

export default useCartStore;
