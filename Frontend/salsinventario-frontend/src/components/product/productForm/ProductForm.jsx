import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
    product,
    productImage,
    imagePreview,
    description,
    setDescription,
    handleInputChange,
    handleImageChange,
    saveProduct,
}) => {
    return (
        <div className="add-product">
            <Card cardClass={"card"}>
                <form onSubmit={saveProduct}>
                    <Card cardClass={"group"}>
                        <label>Imagen del producto</label>
                        <code className="--color-dark">
                            Supported Formats: jpg, jpeg, png
                        </code>
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => handleImageChange(e)}
                            value=""
                        />

                        {imagePreview != null ? (
                            <div className="image-preview">
                                <img src={imagePreview} alt="product" />
                            </div>
                        ) : (
                            <p>Sin imagen para este producto.</p>
                        )}
                    </Card>
                    <label>Nombre del producto:</label>
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        name="name"
                        value={product?.name}
                        onChange={handleInputChange}
                    />

                    <label>Categoria del producto:</label>
                    <input
                        type="text"
                        placeholder="Categoria del producto"
                        name="category"
                        value={product?.category}
                        onChange={handleInputChange}
                    />

                    <label>Precio del producto:</label>
                    <input
                        type="text"
                        placeholder="Precio del producto"
                        name="price"
                        value={product?.price}
                        onChange={handleInputChange}
                    />

                    <label>Cantidad del producto:</label>
                    <input
                        type="text"
                        placeholder="Cantidad del producto"
                        name="quantity"
                        value={product?.quantity}
                        onChange={handleInputChange}
                    />

                    <label>Descripcion del producto:</label>
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        modules={ProductForm.modules}
                        formats={ProductForm.formats}
                    />

                    <div className="--my">
                        <button type="submit" className="--btn --btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

ProductForm.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["clean"],
    ],
};
ProductForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
];

export default ProductForm;