import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import NavbarComponent from "./components/Navbar"
import { Container } from "react-bootstrap"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cancel from "./pages/Cancel"
import Store from "./pages/Store"
import Success from "./pages/Success"
import CartProvider from "./CartContext"
import NotFound from "./components/404"

function App() {
  return (
    <CartProvider>
      <Container>
        <NavbarComponent />
        <BrowserRouter>
          <Routes>
            <Route index element={<Store />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </CartProvider>
  )
}

export default App
