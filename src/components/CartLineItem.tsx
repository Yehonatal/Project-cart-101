/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, ReactElement, memo } from "react";
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

    const lineTotal: number = item.quantity * item.price;
    const highestQty: number = 20 > item.quantity ? 20 : item.quantity;

    const optValues: number[] = [...Array(highestQty).keys()].map((i) => i + 1);

    const options: ReactElement[] = optValues.map((value) => {
        return (
            <option key={`opt${value}`} value={value}>
                {value}
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

                <div className="cart__items" aria-label="Line Item Subtotal">
                    <div>
                        Price:{" "}
                        <span>
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(item.price)}
                        </span>
                    </div>
                    <div>
                        {" "}
                        Sub-Total:
                        <span>
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(lineTotal)}
                        </span>
                    </div>
                </div>

                <div className="cart__items">
                    <p className="qty">
                        Quantity: <span>{item.quantity}</span>
                    </p>

                    <label className="label" htmlFor="itemQty">
                        Item Quantity
                    </label>
                    <select
                        className="item_qty"
                        name="itemQty"
                        id={item.name}
                        aria-label="Item Quantity"
                        value={item.quantity}
                        onChange={onChangeQty}
                    >
                        {options}
                    </select>
                </div>
            </div>
            <button className="rm_btn" onClick={onRemoveFromCart}>
                <MdRemoveShoppingCart />
            </button>
        </li>
    );

    return content;
};

function areItemsEqual(
    { item: prevItem }: PropsType,
    { item: nextTime }: PropsType
) {
    return Object.keys(prevItem).every((key) => {
        return (
            prevItem[key as keyof CartItemType] ===
            nextTime[key as keyof CartItemType]
        );
    });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
    CartLineItem,
    areItemsEqual
);

export default MemoizedCartLineItem;
