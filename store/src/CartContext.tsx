import { createContext, useState, ReactNode } from "react"
import { Product } from "./interfaces/Types"
import { getProductData } from "./productStore"

type CartContextType = {
  items: Product[]
  getProductQuantity: (id: string) => number
  addOneToCart: (id: string) => void
  removeOneFromCart: (id: string) => void
  deleteFromCart: (id: string) => void
  getTotalCost: () => number
}

export const CartContext = createContext<CartContextType>({
  items: [],
  getProductQuantity: () => 0,
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => 0,
})

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartProducts, setCartProducts] = useState<Product[]>([])

  function getProductQuantity(id: string) {
    const quantity = cartProducts.find((product) => product.id === id)?.quantity

    if (quantity === undefined) {
      return 0
    }

    return quantity
  }

  function addOneToCart(id: string) {
    const quantity = getProductQuantity(id)

    if (quantity === 0) {
      setCartProducts([...cartProducts, { id: id, quantity: 1 }])
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      )
    }
  }

  function removeOneFromCart(id: string) {
    const quantity = getProductQuantity(id)

    if (quantity === 1) {
      deleteFromCart(id)
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      )
    }
  }

  function deleteFromCart(id: string) {
    setCartProducts(cartProducts.filter((product) => product.id !== id))
  }

  function getTotalCost() {
    let totalCost = 0
    cartProducts.forEach((cartItem) => {
      const productData = getProductData(cartItem.id)
      if (productData !== undefined && productData.price !== undefined) {
        totalCost += productData.price * cartItem.quantity
      }
    })
    return totalCost
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  }

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}

export default CartProvider
