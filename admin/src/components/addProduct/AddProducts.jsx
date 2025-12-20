import React, { useEffect, useRef, useState } from "react";
import "./addProduct.scss";
import { BiImageAdd, IoIosArrowDown, beveragesImage, MdDeleteOutline } from "../../constants";
import {
  getCategory,
  uploadCategory,
  deleteCategory,
} from "../../features/category/categoryAction";
import { resetCategoryUpload } from "../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProducts } from "../../features/product/productAction";
import { resetProductUpload } from "../../features/product/productSlice";

export default function AddProducts() {
  const [productFile, setProductFile] = useState(null);
  const [categoryFile, setCategoryFile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showProductNotification, setShowProductNotification] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [productError, setProductError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const { categories, uploadCategorySuccess, uploadCategoryError, message, error } = useSelector((state) => state.category);
  const { success: productSuccess, error: productUploadError } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getCategory(token));
  }, [dispatch, token]);
  
  // Refresh categories when message changes (after delete)
  useEffect(() => {
    if (message && message.includes("deleted")) {
      // Small delay to ensure backend has processed the deletion
      const timer = setTimeout(() => {
        dispatch(getCategory(token));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch, token]);

  // Show notification when category is successfully added
  useEffect(() => {
    if (uploadCategorySuccess) {
      setShowNotification(true);
      // Auto-hide notification after 3 seconds and reset state
      const timer = setTimeout(() => {
        setShowNotification(false);
        dispatch(resetCategoryUpload());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadCategorySuccess, dispatch]);

  // Show notification when category is successfully deleted
  useEffect(() => {
    if (message && (message.includes("deleted") || message.includes("Category deleted"))) {
      setShowDeleteNotification(true);
      const timer = setTimeout(() => {
        setShowDeleteNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Show error notification for delete
  useEffect(() => {
    if (error && (error.includes("delete") || error.includes("Failed"))) {
      setDeleteError(error);
      const timer = setTimeout(() => {
        setDeleteError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Show notification when product is successfully added
  useEffect(() => {
    if (productSuccess) {
      setShowProductNotification(true);
      const timer = setTimeout(() => {
        setShowProductNotification(false);
        dispatch(resetProductUpload());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [productSuccess, dispatch]);

  // Show error notification for product upload
  useEffect(() => {
    if (productUploadError) {
      setProductError(productUploadError);
      const timer = setTimeout(() => {
        setProductError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [productUploadError]);

  const productNameRef = useRef();
  const productRatingRef = useRef();
  const productDescRef = useRef();
  const productVegRef = useRef();
  const productPriceRef = useRef();
  const productCatRef = useRef();

  // category ref
  const categoryNameRef = useRef();
  const categoryDescRef = useRef();

  const handleAddProduct = async (e) => {
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

    try {
      await dispatch(addProduct(productFile, product, token));
      
      // Clear form fields after successful submission
      productNameRef.current.value = "";
      productRatingRef.current.value = "";
      productDescRef.current.value = "";
      productVegRef.current.value = "";
      productPriceRef.current.value = "";
      productCatRef.current.value = "";
      setProductFile(null);
      
      // Refresh product list to show the new product
      setTimeout(() => {
        dispatch(getProducts(token));
      }, 500);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // upload category item
  const handleUploadCategory = (e) => {
    e.preventDefault();

    const category = {
      categoryName: categoryNameRef.current.value,
      categoryDesc: categoryDescRef.current.value,
    };

    dispatch(uploadCategory(token, category));
    
    // Clear form fields after submission
    categoryNameRef.current.value = "";
    categoryDescRef.current.value = "";
    
    // Refresh categories list
    dispatch(getCategory(token));
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryId, categoryName) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"? This will also delete all products in this category.`)) {
      // Remove from selected if it was selected
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
      
      try {
        const result = await dispatch(deleteCategory(token, categoryId));
        
        // Wait a bit for the state to update, then refresh
        setTimeout(() => {
          dispatch(getCategory(token));
        }, 500);
        
        if (result?.success) {
          setShowDeleteNotification(true);
          setTimeout(() => {
            setShowDeleteNotification(false);
          }, 3000);
        } else {
          setDeleteError(result?.error || "Failed to delete category");
          setTimeout(() => {
            setDeleteError(null);
          }, 3000);
        }
      } catch (err) {
        console.error("Error deleting category:", err);
        setDeleteError("Failed to delete category");
        setTimeout(() => {
          setDeleteError(null);
        }, 3000);
        // Still refresh to get current state
        setTimeout(() => {
          dispatch(getCategory(token));
        }, 500);
      }
    }
  };

  // Handle checkbox change for individual category
  const handleCategoryCheck = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Handle check all / uncheck all
  const handleCheckAll = () => {
    if (selectedCategories.length === categories?.length) {
      // Uncheck all
      setSelectedCategories([]);
    } else {
      // Check all
      setSelectedCategories(categories?.map(cat => cat.categoryId) || []);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category to delete.");
      return;
    }

    const categoryNames = categories
      ?.filter(cat => selectedCategories.includes(cat.categoryId))
      .map(cat => cat.categoryName)
      .join(", ");

    if (window.confirm(`Are you sure you want to delete ${selectedCategories.length} categor${selectedCategories.length > 1 ? 'ies' : 'y'}?\n\n${categoryNames}\n\nThis will also delete all products in these categories.`)) {
      setIsDeleting(true);
      setDeleteError(null);
      
      try {
        // Delete all selected categories sequentially to avoid race conditions
        const results = [];
        for (const categoryId of selectedCategories) {
          const result = await dispatch(deleteCategory(token, categoryId));
          results.push(result);
          // Small delay between deletions
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // Check if all deletions were successful
        const successCount = results.filter(r => r?.success).length;
        const failedCount = results.filter(r => !r?.success).length;
        
        // Clear selection
        setSelectedCategories([]);
        
        // Refresh categories list one more time to ensure it's up to date
        await dispatch(getCategory(token));
        
        // Show appropriate notification
        if (failedCount === 0) {
          setShowDeleteNotification(true);
          setTimeout(() => {
            setShowDeleteNotification(false);
          }, 3000);
        } else if (successCount > 0) {
          setDeleteError(`${successCount} deleted, ${failedCount} failed`);
          setTimeout(() => {
            setDeleteError(null);
          }, 3000);
        } else {
          setDeleteError("Failed to delete categories");
          setTimeout(() => {
            setDeleteError(null);
          }, 3000);
        }
      } catch (error) {
        console.error("Error deleting categories:", error);
        setDeleteError("Failed to delete categories");
        setTimeout(() => {
          setDeleteError(null);
        }, 3000);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="addProdCat">
      <div className="add-product-wrapper">
        <h1>Add New Product Item</h1>
        
        {/* Product Success Notification */}
        {showProductNotification && (
          <div className="notification success-notification">
            <span className="notification-icon">✅</span>
            <span className="notification-message">Product added successfully!</span>
            <button 
              className="notification-close" 
              onClick={() => setShowProductNotification(false)}
            >
              ×
            </button>
          </div>
        )}
        
        {/* Product Error Notification */}
        {productError && (
          <div className="notification error-notification">
            <span className="notification-icon">❌</span>
            <span className="notification-message">{productError}</span>
          </div>
        )}
        
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
                <option key={category.categoryId} value={category.categoryId}>
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
        
        {/* Success Notification */}
        {showNotification && (
          <div className="notification success-notification">
            <span className="notification-icon">✅</span>
            <span className="notification-message">Category added successfully!</span>
            <button 
              className="notification-close" 
              onClick={() => {
                setShowNotification(false);
                dispatch(resetCategoryUpload());
              }}
            >
              ×
            </button>
          </div>
        )}
        
        {/* Error Notification */}
        {uploadCategoryError && (
          <div className="notification error-notification">
            <span className="notification-icon">❌</span>
            <span className="notification-message">{uploadCategoryError}</span>
          </div>
        )}
        
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

        {/* Category List with Delete Buttons */}
        <div className="category-list-section">
          <div className="category-list-header">
            <h2>Existing Categories</h2>
            {categories && categories.length > 0 && (
              <div className="bulk-actions">
                <label className="check-all-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.length === categories.length && categories.length > 0}
                    onChange={handleCheckAll}
                    className="check-all-checkbox"
                  />
                  <span>Check All ({selectedCategories.length}/{categories.length})</span>
                </label>
                {selectedCategories.length > 0 && (
                  <button
                    className="bulk-delete-btn"
                    onClick={handleBulkDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : `Delete Selected (${selectedCategories.length})`}
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Delete Success Notification */}
          {showDeleteNotification && (
            <div className="notification success-notification">
              <span className="notification-icon">✅</span>
              <span className="notification-message">
                {selectedCategories.length > 1 
                  ? `${selectedCategories.length} categories deleted successfully!`
                  : "Category deleted successfully!"}
              </span>
              <button 
                className="notification-close" 
                onClick={() => setShowDeleteNotification(false)}
              >
                ×
              </button>
            </div>
          )}
          
          {/* Delete Error Notification */}
          {deleteError && (
            <div className="notification error-notification">
              <span className="notification-icon">❌</span>
              <span className="notification-message">{deleteError}</span>
            </div>
          )}

          <div className="category-list">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.categoryId} className={`category-item ${selectedCategories.includes(category.categoryId) ? 'selected' : ''}`}>
                  <label className="category-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.categoryId)}
                      onChange={() => handleCategoryCheck(category.categoryId)}
                      className="category-checkbox"
                    />
                  </label>
                  <div className="category-info">
                    <h3>{category.categoryName}</h3>
                    {category.description && (
                      <p className="category-description">{category.description}</p>
                    )}
                  </div>
                  <button
                    className="delete-category-btn"
                    onClick={() => handleDeleteCategory(category.categoryId, category.categoryName)}
                    title="Delete category"
                  >
                    <MdDeleteOutline className="delete-icon" />
                  </button>
                </div>
              ))
            ) : (
              <p className="no-categories">No categories found. Add a category above.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
