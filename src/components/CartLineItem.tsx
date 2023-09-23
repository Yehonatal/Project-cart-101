/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, ReactElement } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";
import { MdRemoveShoppingCart } from "react-icons/md";

type PropsType = {
    item: CartItemType;
    dispatch: React.Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
    const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
        .href;

    const lineTotal: number = item.quantity * item.quantity;
    const highestQty: number = 20 > item.quantity ? 20 : item.quantity;

    const optValues: number[] = [...Array(highestQty).keys()].map((i) => i + 1);

    const options: ReactElement[] = optValues.map((value) => {
        return (
            <option key={`opt${value}`} value="value">
                value
            </option>
        );
    });

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: {
                ...item,
                quantity: Number(e.target.value),
            },
        });
    };

    const onRemoveFromCart = () =>
        dispatch({
            type: REDUCER_ACTIONS.REMOVE,
            payload: item,
        });

    const content = (
        <li className="cart">
            <img src={img} alt={item.name} />
            <div className="cart__detail">
                <h3 className="cart__title">{item.name.toUpperCase()}</h3>
                <p>
                    Price:{" "}
                    <span>
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(item.price)}
                    </span>
                </p>
                <p>
                    Quantity: <span>{item.quantity}</span>
                </p>
            </div>
            <button className="rm_btn" onClick={onRemoveFromCart}>
                <MdRemoveShoppingCart />
            </button>
        </li>
    );

    return content;
};

export default CartLineItem;
