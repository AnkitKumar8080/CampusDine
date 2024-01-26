import { ProductModel } from "../models/product.model.js";
import dotenv from "dotenv";

// confiugure the dotenv instance
dotenv.config();

export const filterObject = (obj, filterFields = []) => {
  const filteredObject = Object.keys(obj).reduce((acc, key) => {
    if (filterFields.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});

  return filteredObject;
};

export const calculateSubtotal = async (productId, quantity) => {
  try {
    const product = await ProductModel.getProductById(productId);

    return parseInt(product.price) * quantity; // return subtotal
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrderExpiryDate = () => {
  const EDate = new Date();
  EDate.setDate(EDate.getDate() + process.env.ORDER_EXPIRY_DAYS);
  return Date.parse(EDate); // parse the Date object into milliseconds
};

export const getYesterdaysDate = () => {
  const YDate = new Date();
  YDate.setDate(YDate.getDate() - 1);
  return Date.parse(YDate); // parse the Date object into milliseconds
};

// filters and rearranges the raw data of user placed orders
export const transformUserOrderData = (rawUserOrderData) => {
  return new Promise((resolve, reject) => {
    try {
      const filteredData = rawUserOrderData.reduce((result, order) => {
        // check if the orderId already exists if so push the order items to same orderId object
        const existingOrder = result?.find((o) => o.orderId === order.orderId);

        if (existingOrder) {
          existingOrder.items.push({
            productId: order.productId,
            productName: order.productName,
            image: order.image,
            rating: order.rating,
            description: order.description,
            vegetarian: order.vegetarian,
            price: order.price,
            quantity: order.quantity,
            categoryId: order.categoryId,
            createdAt: order.createdAt,
          });
        } else {
          result?.push({
            orderId: order.orderId,
            orderNumber: order.orderNumber,
            orderStatus: order.status,
            total: order.total,
            items: [
              {
                productId: order.productId,
                productName: order.productName,
                image: order.image,
                rating: order.rating,
                description: order.description,
                vegetarian: order.vegetarian,
                price: order.price,
                quantity: order.quantity,
                categoryId: order.categoryId,
                createdAt: order.createdAt,
              },
            ],
          });
        }

        return result;
      }, []);

      resolve(filteredData);
    } catch (error) {
      reject(error);
    }
  });
};
