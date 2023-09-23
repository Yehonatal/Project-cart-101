import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";

type PropsType = {
    viewCart: boolean;
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
    const button = viewCart ? (
        <button onClick={() => setViewCart(false)}>
            <FaProductHunt />
        </button>
    ) : (
        <button onClick={() => setViewCart(true)}>
            <AiOutlineShoppingCart />
        </button>
    );
    const content = <nav className="nav">{button}</nav>;
    return content;
};

export default Nav;
