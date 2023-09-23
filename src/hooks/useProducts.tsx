import { useContext } from "react";
import ProductContext from "../context/ProductsProvide";
import { UseProductContextType } from "../context/ProductsProvide";

const useProducts = (): UseProductContextType => {
    return useContext(ProductContext);
};

export default useProducts;
