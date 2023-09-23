import { ProductType } from "../context/ProductsProvide";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement, memo } from "react";

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
            <h3 className="prod_name">{product.name.toUpperCase()}</h3>

            <img src={img} alt={product.name} />
            <div className="card_detail">
                <div className="card_content">
                    <p className="product_price">
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

function areProductsEqual(
    { product: prevProd, inCart: prevInCart }: PropsType,
    { product: nextProd, inCart: nextInCart }: PropsType
) {
    return Object.keys(prevProd).every((key) => {
        return (
            prevProd[key as keyof ProductType] ===
                nextProd[key as keyof ProductType] && prevInCart === nextInCart
        );
    });
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
