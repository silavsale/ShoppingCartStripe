import { useState, useContext } from "react"
import { Button, Container, Navbar, Modal, Nav } from "react-bootstrap"
import { CartContext } from "../CartContext"
import CartProduct from "./CartProduct"

function NavbarComponent() {
  const cart = useContext(CartContext)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const checkout = async () => {
    console.log("checkout")

    await fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url) // Forwarding user to Stripe
        }
      })
  }

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product?.quantity,
    0
  )

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecomerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart {productsCount} Items</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, index) => (
                <CartProduct
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                />
              ))}

              <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>

              <Button variant="success" onClick={checkout}>
                Purchase Items!
              </Button>
            </>
          ) : (
            <h1>There are no items in your cart!</h1>
          )}
          <h1>This is the modal body</h1>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavbarComponent
