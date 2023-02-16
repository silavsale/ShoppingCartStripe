import { Col, Row } from "react-bootstrap"
import { productArray } from "../productStore"

function Store() {
  return (
    <>
      <h1 align="center" className="p-3">
        Welcome to the Store!
      </h1>
      <Row xs={1} md={3} className="g-4">
        {productArray.map((product, index) => (
          <Col align="center" key={index}>
            <h1>{product.title}</h1>
            <h1>{product.price}</h1>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Store
