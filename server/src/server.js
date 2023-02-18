"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const stripeKey = process.env.STRIPE_SECRET_KEY || "st_key";
const stripe = new stripe_1.default(stripeKey, {
    apiVersion: "2022-11-15",
});
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("combined"));
app.get("/", (req, res) => {
    res.send("Store root API");
});
app.post("/checkout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body", req.body);
    const items = req.body.items;
    let lineItems = [];
    items.array.forEach((item) => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity,
        });
    });
    const session = yield stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:5173/success`,
        cancel_url: `http://localhost:5173/cancel`,
    });
    res.send(JSON.stringify({
        url: session.url,
    }));
}));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
