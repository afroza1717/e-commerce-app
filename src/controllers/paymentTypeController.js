import PaymentType from "../models/paymentType.js";

/**
 * Getting PaymentType List
 * @param {*} req 
 * @param {*} res 
 */
export const getPaymentTypeList = async (req, res) => {
  try {

    //DOCS: https://mongoosejs.com/docs/api/query.html#Query.prototype.find()
    const paymentTypeList = await PaymentType.find();
    console.log("PaymentType List::", paymentTypeList);
    res.status(200).json(paymentTypeList);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * Getting PaymentType by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getPaymentTypeById = async (req, res) => {
  try {
    // Find the paymentType using the `product_category_id` field
    const paymentType = await PaymentType.findOne({ product_category_id: req.params.id });

    console.log("Get PaymentType =>", paymentType);

    if (!paymentType) {
      return res.status(404).json({ message: "PaymentType not found" });
    }

    res.status(200).json(paymentType);
  } catch (error) {
    console.error("Error fetching paymentType:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


/**
 * Creating New PaymentType
 * @param {*} req 
 * @param {*} res 
 */

export const createPaymentType = async (req, res) => {
  var savedPaymentType;
  try {
    const newPaymentType = new PaymentType(req.body);
    console.log("newPaymentType paymentType =>", newPaymentType);
    if (!newPaymentType.payment_type_name) {
      return res.status(400).json({
        message: 'PaymentType Name is Required'
      })
    }

    //DOCS: https://mongoosejs.com/docs/api/document.html#Document.prototype.save()
    savedPaymentType = await newPaymentType.save();
    console.log("Created paymentType =>", savedPaymentType);

    res.status(201).json({
      message: 'PaymentType Created Successfully.',
      data: savedPaymentType
    })

  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating PaymentType", error: error.message });
  }

}


/**
 * Updating the PaymentType Accordingly with the request
 * @param {*} req 
 * @param {*} res 
 */

export const updatePaymentType = async (req, res) => {
  console.log("req.params", req.params);

  try {
    //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
    const updatedPaymentType = await PaymentType.findOneAndUpdate(
      { product_category_id: req.params.id },
      req.body,
      {
        new: true, //return the modified document rather than the original
      }
    );
    if (!updatedPaymentType) {
      return res.status(404).json({ message: "PaymentType not found" });
    }
    res.status(200).json(updatedPaymentType);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating PaymentType", error: error.message });
  }

}

/**
 * Delete PaymentType
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const deleteSpecificPaymentType = async (req, res) => {
  console.log("req.params", req.params);
  try {
    //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
    const deletedPaymentType = await PaymentType.findOneAndDelete({
      product_category_id: req.params.id,
    });

    if (!deletedPaymentType) {
      return res.status(404).json({ message: "PaymentType not found" });
    }

    res.status(200).json({ message: "PaymentType deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting PaymentType", error: error.message });
  }
}
