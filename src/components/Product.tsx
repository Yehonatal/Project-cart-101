import { ProductType } from "../context/ProductsProvide";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement } from "react";

type PropsType = {
    product: ProductType;
    dispatch: React.Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
    inCart: boolean;
};

const Product = ({
    product,
    dispatch,
    REDUCER_ACTIONS,
    inCart,
}: PropsType): ReactElement => {
    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
        .href;

    const onAddToCart = () =>
        dispatch({
            type: REDUCER_ACTIONS.ADD,
            payload: { ...product, quantity: 1 },
        });

    const itemInCart = inCart ? <span className="money-gone">💸</span> : null;

    const content = (
        <article className="card">
            <img src={img} alt={product.name} />
            <div className="card_detail">
                <div className="card_content">
                    <h3>{product.name}</h3>
                    <p>
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(product.price)}

                        <span className="in-cart">{itemInCart}</span>
                    </p>
                </div>
                <button className="add_to_btn" onClick={onAddToCart}>
                    {" "}
                    add to cart{" "}
                </button>
            </div>
        </article>
    );

    return content;
};

export default Product;
