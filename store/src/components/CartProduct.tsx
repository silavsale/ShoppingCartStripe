import { useState, useContext } from "react"
import { Button, Container, Navbar, Modal, Nav } from "react-bootstrap"
import { CartContext } from "../CartContext"
import { getProductData } from "../productStore"
import NotFound from "./404"

function CartProduct(props: any) {
  const cart = useContext(CartContext)
  const id = props.id
  const quantity = props.quantity
  const productData = getProductData(id)

  if (productData?.price !== undefined) {
    return (
      <>
        <h3>{productData?.title}</h3>
        <p>{quantity} total</p>
        <p>${(quantity * productData?.price).toFixed(2)}</p>
        <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
          Remove
        </Button>
        <hr></hr>
      </>
    )
  } else {
    return <NotFound />
  }
}

export default CartProduct
