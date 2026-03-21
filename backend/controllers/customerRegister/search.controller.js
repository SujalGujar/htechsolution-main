import Customer from "../../models/customerRegisterModel/customerDetails.model.js";

// 🔍 Search by customerProductId
export const getByCustomerProductId = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findOne({
      "products.customerProductId": id,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};