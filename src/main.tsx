import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./context/CartProvider.tsx";
import { ProductProvide } from "./context/ProductsProvide.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ProductProvide>
            <CartProvider>
                <App />
            </CartProvider>
        </ProductProvide>
    </React.StrictMode>
);
