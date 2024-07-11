// function to filter order by status of order
export const filterOrdersByStatus = (orders, status) =>
  orders.filter((order) => {
    console.log("order: ", order);
    return order.orderStatus === status.toLowerCase();
  });

export const searchValueInArrObj = (array, value) => {
  const res = [];

  array.forEach((item) => {
    Object.values(item).forEach((prop) => {
      if (
        typeof prop === "string" &&
        // prop.toLowerCase() === value.toLowerCase() without regex matching
        new RegExp(value, "i").test(prop) // with regexp
      ) {
        res.push(item);
      }
    });
  });

  return res;
};
