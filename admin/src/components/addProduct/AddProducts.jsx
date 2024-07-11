import React, { useEffect, useRef, useState } from "react";
import "./addProduct.scss";
import { BiImageAdd, IoIosArrowDown, beveragesImage } from "../../constants";
import {
  getCategory,
  uploadCategory,
} from "../../features/category/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/product/productAction";

export default function AddProducts() {
  const [productFile, setProductFile] = useState(null);
  const [categoryFile, setCategoryFile] = useState(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory(token));
  }, []);

  const productNameRef = useRef();
  const productRatingRef = useRef();
  const productDescRef = useRef();
  const productVegRef = useRef();
  const productPriceRef = useRef();
  const productCatRef = useRef();

  // category ref
  const categoryNameRef = useRef();
  const categoryDescRef = useRef();

  console.log(productFile?.name.replace(/\s+/g, "_"));

  const handleAddProduct = (e) => {
    e.preventDefault();

    const product = {
      productName: productNameRef.current.value,
      image: productFile?.name.replace(/\s+/g, "_"),
      rating: parseFloat(productRatingRef.current.value),
      description: productDescRef.current.value,
      vegetarian: parseInt(productVegRef.current.value),
      price: parseInt(productPriceRef.current.value),
      categoryId: productCatRef.current.value,
    };

    console.log(productFile, product, token);

    dispatch(addProduct(productFile, product, token));

    productNameRef.current.value = "";
    productRatingRef.current.value = "";
    productDescRef.current.value = "";
    productVegRef.current.value = "";
    productPriceRef.current.value = "";
    productCatRef.current.value = "";
    setProductFile(null);
  };

  // upload category item
  const handleUploadCategory = (e) => {
    e.preventDefault();

    const category = {
      categoryName: categoryNameRef.current.value,
      categoryDesc: categoryDescRef.current.value,
    };

    console.log(category);

    dispatch(uploadCategory(token, category));
  };

  return (
    <div className="addProdCat">
      <div className="add-product-wrapper">
        <h1>Add New Product Item</h1>
        <form onSubmit={handleAddProduct} className="new-product-form">
          <div className="product-img-wrap">
            {" "}
            <label htmlFor="product-img">
              {productFile ? (
                <img
                  src={productFile ? URL.createObjectURL(productFile) : ""}
                  alt=""
                />
              ) : (
                <BiImageAdd className="icon" />
              )}
            </label>
            <input
              type="file"
              onChange={(e) => setProductFile(e.target.files[0])}
              id="product-img"
              hidden
            />
          </div>
          <div className="product-name-wrap">
            <label htmlFor="product-name">Product Name</label>
            <input
              type="text"
              id="product-name"
              placeholder="Enter product Name..."
              required
              ref={productNameRef}
            />
          </div>

          <div className="veg-wrap">
            <label htmlFor="select-category">Select Category</label>
            <select
              type="text"
              id="select-category"
              required
              ref={productVegRef}
            >
              <option value={1}>veg</option>
              <option value={0}>Non-Veg</option>
            </select>
          </div>

          <div className="category-wrap">
            <label htmlFor="select-category">Select Category</label>
            <select
              type="text"
              id="select-category"
              required
              ref={productCatRef}
            >
              {categories?.map((category) => (
                <option value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="rating-wrap">
            <label htmlFor="product-rating">Rating</label>
            <input
              type="text"
              id="product-price"
              placeholder="Enter rating 1 to 5..."
              required
              ref={productRatingRef}
            />
          </div>

          <div className="price-wrap">
            <label htmlFor="product-price">Price</label>
            <input
              type="number"
              id="product-price"
              placeholder="Enter price..."
              required
              ref={productPriceRef}
            />
          </div>

          <div className="desc-wrap">
            <label htmlFor="product-desc">Description</label>
            <textarea
              placeholder="Enter product description..."
              id="product-desc"
              cols="80"
              rows="5"
              ref={productDescRef}
            ></textarea>
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="add-category-wrapper">
        <h1>Add New category Item</h1>
        <form className="new-category-form" onSubmit={handleUploadCategory}>
          {/* <div className="category-img-wrap">
            {" "}
            <label htmlFor="category-img">
              {categoryFile ? (
                <img src={URL.createObjectURL(categoryFile)} alt="" />
              ) : (
                <BiImageAdd className="icon" />
              )}
            </label>
            <input
              type="file"
              onChange={(e) => {
                setCategoryFile(e.target.files[0]);
              }}
              id="category-img"
              hidden
              required
            />
          </div> */}
          <div className="category-name-wrap">
            <label htmlFor="category-name">category Name</label>
            <input
              type="text"
              id="category-name"
              placeholder="Enter category Name..."
              required
              ref={categoryNameRef}
            />
          </div>

          <div className="desc-wrap">
            <label htmlFor="category-desc">Description</label>
            <textarea
              id="category-desc"
              cols="80"
              rows="5"
              ref={categoryDescRef}
            ></textarea>
          </div>
          <button type="submit">Add category</button>
        </form>
      </div>
    </div>
  );
}
