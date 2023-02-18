import { Col, Row } from "react-bootstrap"
import ProductCard from "../components/ProductCard"
import { productArray } from "../productStore"
import { Product } from "../interfaces/Types"

function Store() {
  return (
    <>
      <h1 align="center" className="p-3">
        Welcome to the Store!
      </h1>
      <Row xs={1} md={3} className="g-4">
        {productArray.map((product: Product, index) => (
          <Col align="center" key={index}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Store
