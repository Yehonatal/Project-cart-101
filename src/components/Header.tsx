import "./style/header.css";
import Nav from "./Nav";
import useCart from "../hooks/useCart";

type PropsType = {
    viewCart: boolean;
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
    const { totalItems, totalPrice } = useCart();
    const content = (
        <header className="Header">
            <div className="bar">
                <div className="header__title-bar">
                    <h2 className="logo">CART</h2>
                </div>
                <div className="header__cart-detail">
                    <h4>Total Items: {totalItems}</h4>
                    <h4>
                        Total Price: {totalPrice.length ? totalPrice : "$0"}
                    </h4>
                    <Nav viewCart={viewCart} setViewCart={setViewCart} />
                </div>
            </div>
        </header>
    );
    return content;
};

export default Header;
