// import { getAllProductsService } from "../../services/productServices/getAllProducts.service.js";
import {getAllProducts} from "../../services/catogoryServices/getAllProducts.service.js"

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};