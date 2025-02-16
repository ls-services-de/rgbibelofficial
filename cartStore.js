import { create } from "zustand"

const useCartStore = create((set) => ({
  cart: [],
  cartTotal: 0,
  totalItems: 0,

  // Initialize the cart from local storage
  initializeCart: () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    const cartTotal = calculateCartTotal(savedCart)
    const totalItems = calculateTotalItems(savedCart)
    set({ cart: savedCart, cartTotal, totalItems })
  },

  addToCart: ({ product, quantity, color }) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex((item) => item._id === product._id && item.color === color)
      const newQuantity = Number.parseInt(quantity, 10)

      if (newQuantity <= 0) {
        // If the new quantity is less than or equal to zero, remove the item from the cart
        const updatedCart = state.cart.filter((item) => item._id !== product._id || item.color !== color)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        return {
          cart: updatedCart,
          cartTotal: calculateCartTotal(updatedCart),
          totalItems: calculateTotalItems(updatedCart),
        }
      }

      let updatedCart
      if (existingProductIndex !== -1) {
        // If the product already exists, update the quantity to the new quantity
        updatedCart = [...state.cart]
        updatedCart[existingProductIndex].quantity = newQuantity
      } else {
        // If the product doesn't exist, add it to the cart with the new quantity
        updatedCart = [...state.cart, { ...product, quantity: newQuantity, color }]
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return {
        cart: updatedCart,
        cartTotal: calculateCartTotal(updatedCart),
        totalItems: calculateTotalItems(updatedCart),
      }
    }),

  removeFromCart: (productId, color) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (item) => item._id !== productId && item._id !== `windows-${productId}` && item._id !== `shipping-${productId}`,
      )

      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return {
        cart: updatedCart,
        cartTotal: calculateCartTotal(updatedCart),
        totalItems: calculateTotalItems(updatedCart),
      }
    }),

  clearCart: () => {
    localStorage.removeItem("cart")
    set({ cart: [], cartTotal: 0, totalItems: 0 })
  },
}))

function calculateCartTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

function calculateTotalItems(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0)
}

export default useCartStore

