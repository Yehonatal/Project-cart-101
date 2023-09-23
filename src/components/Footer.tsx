import "./style/footer.css";
import useCart from "../hooks/useCart";
type PropsType = {
    viewCart: boolean;
};

const Footer = ({ viewCart }: PropsType) => {
    const { totalItems, totalPrice } = useCart();
    const year: number = new Date().getFullYear();

    const pageContent = !viewCart ? (
        <div className="bar">
            <div className="header__title-bar">
                <h4 className="logo me">
                    CART by{" "}
                    <a href="https://github.com/Yehonatal" target="_blank">
                        Yehonatal
                    </a>{" "}
                    &copy;
                    <span> - {year}</span>
                </h4>
            </div>
            <div className="header__cart-detail">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalPrice.length ? totalPrice : "$0"}</p>
            </div>
        </div>
    ) : (
        <div className="bar">
            <div className="header__title-bar">
                <h4 className="logo me">
                    CART by{" "}
                    <a href="https://github.com/Yehonatal" target="_blank">
                        Yehonatal
                    </a>{" "}
                    &copy;
                    <span> - {year}</span>
                </h4>
            </div>
        </div>
    );
    const content = <footer className="footer">{pageContent}</footer>;
    return content;
};

export default Footer;
