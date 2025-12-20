import { mealsImage, profilePic } from "../../assets";
import {
  AiOutlineEdit,
  IoCheckmarkSharp,
  MdDeleteOutline,
  RxCross2,
  productList,
  // productList,
} from "../../constants";
import {
  deleteProduct,
  getProducts,
} from "../../features/product/productAction";
import { searchValueInArrObj } from "../../utils/helper";
import "./productList.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function ProductListChild({ product }) {
  // const [imgFile, setImgFile] = useState(null);
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(token, productId));
  };

  return (
    <div className="product-list-child">
      <div className="product-name-image">
        {/* <label htmlFor="img-input">
          <img
            src={imgFile ? URL.createObjectURL(imgFile) : mealsImage}
            alt={product.productName}
          />
        </label>
        <input
          type="file"
          onChange={(e) => setImgFile(e.target.files[0])}
          id="img-input"
          hidden
          disabled={!toggleEditMode}
        /> */}
        <img src={mealsImage} alt="" />
        <input
          type="text"
          value={product.productName}
          disabled={!toggleEditMode}
        />
      </div>

      <div className="product-description">
        <textarea
          type="text"
          value={product.description}
          disabled={!toggleEditMode}
          rows={2}
          cols={20}
        />
      </div>

      <div className="product-rating">
        {/* <span>Rating</span> */}
        <input
          type="number"
          value={product.rating}
          disabled={!toggleEditMode}
        />
      </div>

      <div className="product-vegetarian">
        <input
          type="text"
          value={product.vegetarian ? "veg" : "Non - veg"}
          disabled={!toggleEditMode}
        />
      </div>

      <div className="product-price">
      <span style={{fontWeight:"bold"}}>UGX</span>{" "}
        <input type="number" value={product.price} disabled={!toggleEditMode} />
      </div>

      <div className="user-update">
        {/* {toggleEditMode ? (
          <>
            <IoCheckmarkSharp className="icon" />
            <RxCross2
              className="icon"
              onClick={() => setToggleEditMode(!toggleEditMode)}
            />
          </>
        ) : (
          <>
            <AiOutlineEdit
              className="icon"
              onClick={() => setToggleEditMode(!toggleEditMode)}
            />
            <MdDeleteOutline className="icon" />
          </>
        )} */}
        <MdDeleteOutline
          onClick={() => handleDeleteProduct(product.productId)}
          className="icon"
        />
      </div>
    </div>
  );
}

export default function ProductList() {
  const { token } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product.products);
  const { success, message } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(token));
  }, [dispatch, token]);
  
  // Refresh products when a product is successfully added or deleted
  useEffect(() => {
    if (success || message === "deleted product") {
      // Small delay to ensure backend has processed
      const timer = setTimeout(() => {
        dispatch(getProducts(token));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success, message, dispatch, token]);

  // useEffect(() => {
  //   setProducts(productList);
  // }, [productList]);

  // const handleInputKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     const filteredUserList = searchValueInArrObj(
  //       productsList,
  //       event.target.value
  //     );

  //     setProducts(filteredUserList);
  //   }

  //   if (event.target.value.trim() === "") {
  //     setProducts(productList);
  //   }
  // };

  // const checkIfInputEmpty = (event) => {
  //   if (event.target.value.trim() === "") {
  //     setProducts(productList);
  //   }
  // };

  return (
    <div className="productlist">
      <div className="product-list-wrapper">
        <div className="head">
          <p>Product List</p>
          <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="search for product..."
              // onKeyDown={handleInputKeyDown}
              // onChange={checkIfInputEmpty}
            />
            <button 
              className="refresh-btn"
              onClick={() => dispatch(getProducts(token))}
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="product-list-scroll">
          <div className="product-list-header">
            <p>Item</p>
            <p>Description</p>
            <p>Ratings</p>
            <p>Veg</p>
            <p>Price</p>
            <p>Actions</p>
          </div>
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <ProductListChild key={product.productId || index} product={product} />
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2em', 
              color: 'rgba(255, 255, 255, 0.5)' 
            }}>
              No products found. Add a product to see it here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
