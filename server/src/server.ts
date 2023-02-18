import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import Stripe from "stripe"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const stripeKey = process.env.STRIPE_SECRET_KEY || "st_key"

const stripe = new Stripe(stripeKey, {
  apiVersion: "2022-11-15",
})

app.use(bodyParser.json())
app.use(cors())
app.use(morgan("combined"))

app.get("/", (req, res) => {
  res.send("Store root API")
})

app.post("/checkout", async (req, res) => {
  console.log("req.body", req.body)

  const items = req.body.items
  let lineItems: {}[] = []

  items.forEach((item: { id: number; quantity: number }) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    })
  })

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/success`,
    cancel_url: `http://localhost:5173/cancel`,
  })

  res.send(
    JSON.stringify({
      url: session.url,
    })
  )
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
