import axios from "axios";

// const postProductData = async () => {
//   for (let product of productData) {
//     try {
//       const res = await axios.post(
//         "http://localhost:6005/api/v1/admin/create-product",
//         product // The data should be passed as the second argument, not as a separate object
//         // {
//         //   headers: {
//         //     Authorization:
//         //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NTkyOGQzYS0xYzU1LTQwYTktYjExNy0zMWIyZjgzMTRhMTciLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNlcjEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDY0NTMxOTYsImV4cCI6MTcwNjUzOTU5Nn0.X_55bSS34DUxKMiW4SAP3RZuyp6HKxZZXAu1MDrL9tM",
//         //     "Content-Type": "application/json",
//         //   },
//         // }
//       );

//       console.log(res.data.data);
//     } catch (error) {
//       console.error(error.response.data.message);
//     }
//   }
// };

// postProductData();

export const filterCartItemsForOrder = (cartItems) => {
  if (!cartItems.length) return [];
  // just take productId and quantity from each item in cart
  const filteredObj = cartItems?.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));
  return [...filteredObj]; // returning a shallow copy of the array
};
