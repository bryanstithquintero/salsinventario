import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";

const ProductDetail = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const { product, isLoading, isError, message } = useSelector(
        (state) => state.product
    );

    const stockStatus = (quantity) => {
        if (quantity > 0) {
            return <span className="--color-success">In Stock</span>;
        }
        return <span className="--color-danger">Out Of Stock</span>;
    };

    useEffect(() => {
        dispatch(getProduct(id));
    }, [isError, message, dispatch]);

    return (
        <div className="product-detail">
            <h3 className="--mt">Product Detail</h3>
            <Card cardClass="card">
                {isLoading && <SpinnerImg />}
                {product && (
                    <div className="detail">
                        <Card cardClass="group">
                            {product?.image ? (
                                <img
                                    src={product.image.filePath}
                                    alt={product.image.fileName}
                                />
                            ) : (
                                <p>No image set for this product</p>
                            )}
                        </Card>
                        <h4>Product Availability: {stockStatus(product.quantity)}</h4>
                        <hr />
                        <h4>
                            <span className="badge">Name: </span> &nbsp; {product.name}
                        </h4>
                        <p>
                            <b>&rarr; SKU : </b> {product.sku}
                        </p>
                        <p>
                            <b>&rarr; Category : </b> {product.category}
                        </p>
                        <p>
                            <b>&rarr; Price : </b> {"$"}
                            {product.price}
                        </p>
                        <p>
                            <b>&rarr; Quantity in stock : </b> {product.quantity}
                        </p>
                        <p>
                            <b>&rarr; Total Value in stock : </b> {"$"}
                            {product.price * product.quantity}
                        </p>
                        <hr />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.description),
                            }}
                        ></div>
                        <hr />
                        <code className="--color-dark">
                            Created on: {product.createdAt.toLocaleString("en-US")}
                        </code>
                        <br />
                        <code className="--color-dark">
                            Last Updated: {product.updatedAt.toLocaleString("en-US")}
                        </code>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ProductDetail;
