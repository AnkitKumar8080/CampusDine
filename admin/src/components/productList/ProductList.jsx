import { mealsImage, profilePic } from "../../assets";
import {
  AiOutlineEdit,
  BsCurrencyRupee,
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
          Z
          value={product.vegetarian ? "veg" : "Non - veg"}
          disabled={!toggleEditMode}
        />
      </div>

      <div className="product-price">
        <BsCurrencyRupee />{" "}
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
  // const [productsList, setProductsList] = useState(
  //   useSelector((state) => state.product.products)
  // );
  const [products, setProducts] = useState(
    useSelector((state) => state.product.products)
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(token));
  }, [dispatch, token]);

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
          <input
            type="text"
            placeholder="search for product..."
            // onKeyDown={handleInputKeyDown}
            // onChange={checkIfInputEmpty}
          />
        </div>

        <div className="product-list-scroll">
          <div className="product-list-header">
            <p>Item</p>
            <p>Description</p>
            <p>Ratings</p>
            <p>Veg</p>
            <p>Price</p>
          </div>
          {products?.map((product, index) => (
            <ProductListChild key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
