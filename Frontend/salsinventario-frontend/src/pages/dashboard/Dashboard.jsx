import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import { getProducts } from "../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products, isLoading, isError, message } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getProducts());

        if (isError) {
            console.log(message);
        }
    }, [isError, message, dispatch]);

    return (
        <div>
            <ProductSummary products={products} />
            <ProductList products={products} isLoading={isLoading} />
            <Link to="/product/create" className="--btn --btn-success">Crear Producto +</Link>
        </div>
    );
};

export default Dashboard;
