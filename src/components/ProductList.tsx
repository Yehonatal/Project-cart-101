/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style/product.css";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
// import { UseProductContextType } from "../context/ProductsProvide";
import { ReactElement } from "react";

import Product from "./Product";

const ProductList = () => {
    const { dispatch, REDUCER_ACTIONS, cart } = useCart();
    const { products } = useProducts();

    let pageContent: ReactElement | ReactElement[] = (
        <p className="loading">Loading ...</p>
    );

    if (products?.length) {
        pageContent = products.map((product) => {
            const inCart: boolean = cart.some(
                (item) => item.sku === product.sku
            );
            return (
                <Product
                    key={product.sku}
                    product={product}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                    inCart={inCart}
                />
            );
        });
    }

    const content = (
        <main className="main main-products">
            <h3 className="cart__heading">Products</h3>
            <hr />
            <div className="grid">{pageContent}</div>
        </main>
    );

    return content;
};

export default ProductList;
