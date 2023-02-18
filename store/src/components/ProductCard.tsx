import {
  Button,
  Container,
  Navbar,
  Modal,
  Nav,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap"
import { Product } from "../interfaces/Types"
import { CartContext } from "../CartContext"
import { useContext } from "react"

function ProductCard(product: Product) {
  const cart = useContext(CartContext)
  const productQuantity = cart.getProductQuantity(product.id)
  console.log(cart.items)

  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Car: {productQuantity}{" "}
              </Form.Label>
              <Col sm="6">
                <Button
                  sm="6"
                  className="mx-2"
                  onClick={() => cart.addOneToCart(product.id)}
                >
                  +
                </Button>
                <Button
                  sm="6"
                  className="mx-2"
                  onClick={() => cart.removeOneFromCart(product.id)}
                >
                  -
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => cart.deleteFromCart(product.id)}
                >
                  Remove from cart
                </Button>
              </Col>
            </Form>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={() => cart.addOneToCart(product.id)}
          >
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
