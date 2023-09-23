/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
    sku: string;
    name: string;
    price: number;
};

const initialState: ProductType[] = [];

// define an initial state for the product
// const initialState: ProductType[] = [
//     {
//         sku: "item0001",
//         name: "Widget",
//         price: 9.99,
//     },
//     {
//         sku: "item0002",
//         name: "Premium Widget",
//         price: 19.99,
//     },
//     {
//         sku: "item0003",
//         name: "Deluxe Widget",
//         price: 29.99,
//     },
// ];

export type UseProductContextType = {
    products: ProductType[];
};

const initContextState: UseProductContextType = {
    products: [],
};

const ProductContext = createContext<UseProductContextType>(initContextState);

type ChildrenType = {
    children?: ReactElement | ReactElement[];
};

export const ProductProvide = ({ children }: ChildrenType) => {
    const [products, setProducts] = useState<ProductType[]>(initialState);

    // Load the product when app mounts
    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const response = await fetch("http://localhost:3500")
                .then((res) => res.json())
                .catch((err) => {
                    if (err instanceof Error) {
                        console.log(err);
                    }
                });
            return response;
        };
        fetchProducts().then((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
