import { Product } from "./interfaces/Types"

const productArray: Product[] = [
  { id: 1, title: "Cofee", price: 4.99 },
  { id: 2, title: "Sunglasses", price: 9.99 },
  { id: 3, title: "Camera", price: 39.99 },
]

function getProductData(id: number) {
  let productData = productArray.find((product: Product) => product.id === id)

  if (productData === undefined) {
    console.log(`Product with ID ${id} not exist`)
    return undefined
  }

  return productData
}

export { productArray, getProductData }
