/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style/cart.css";
import useCart from "../hooks/useCart";
import { useState } from "react";
import CartLineItem from "./CartLineItem";

const Cart = () => {
    const [confirm, setConfirm] = useState<boolean>(false);

    const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } =
        useCart();

    const onSubmitOrder = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT });
        setConfirm(true);
    };

    const pageContent = confirm ? (
        <div className="success__tag">
            <h2>Thank for your order.</h2>
        </div>
    ) : (
        <div className="shop">
            <ul className="carts">
                {!cart.length ? (
                    <div className="empty__cart">
                        <h1>No products in CART.</h1>
                    </div>
                ) : (
                    cart.map((item) => {
                        return (
                            <CartLineItem
                                key={item.sku}
                                item={item}
                                dispatch={dispatch}
                                REDUCER_ACTIONS={REDUCER_ACTIONS}
                            />
                        );
                    })
                )}
            </ul>

            <hr />
            <div className="cart_totals">
                <h1>Summary</h1>

                <p>
                    Price: <span>{totalPrice}</span>
                </p>
                <p>
                    Quantity: <span>{totalItems}</span>
                </p>
                <button
                    className="sub_btn"
                    onClick={onSubmitOrder}
                    disabled={!totalItems}
                >
                    Place Order
                </button>
            </div>
        </div>
    );

    const content = (
        <main className="carts_container">
            <h3 className="cart__heading">Shopping Cart</h3>
            <hr />
            {pageContent}
        </main>
    );

    return content;
};

export default Cart;
