// Stylesheet
import './Products.css';
// Navbar
import Navbar from '../../common/navbar/Navbar'
// React hooks
import { useEffect, useState } from "react";
// API calls
import { get } from "../../api/api-calls";
// Structure and dialogs
import ProductCard from "./structure/ProductCard"
import AddProduct from './dialogs/AddProduct';

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        get("products", setProducts);
      }, []);

    return (
        <>
            <Navbar />
            {products.length > 0 
                ? products.map((product) => (
                    <ProductCard
                        product = {product}
                        products = {products}
                        setProducts = {setProducts}
                        key = {product.id}
                    />
                ))
                : <p>No products available</p>
            }
            <AddProduct setProducts={setProducts}/>
        </>
    )
}