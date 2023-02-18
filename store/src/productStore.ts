import { Product } from "./interfaces/Types"

const productArray: Product[] = [
  { id: "price_1McfAXL14atq42zlIzo5M7FB", title: "Cofee", price: 4.99 },
  { id: "price_1McfBcL14atq42zlcUUlDYzt", title: "Sunglasses", price: 9.99 },
  { id: "price_1McfC8L14atq42zloaJHw3E0", title: "Camera", price: 39.99 },
]

function getProductData(id: string) {
  let productData = productArray.find((product: Product) => product.id === id)

  if (productData === undefined) {
    console.log(`Product with ID ${id} not exist`)
    return undefined
  }

  return productData
}

export { productArray, getProductData }
