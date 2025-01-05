const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

exports.addCartHandler = async (req, res) => {
  try {
    const { courseName, courseID, token } = req.body;

    // Validate input fields
    if (!courseID || !token) {
      return res.status(400).json({
        success: false,
        message: "Course Name, Course ID, and Token are required.",
      });
    }

    // Verify the token and decode userID
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
    const userID = decodedToken.id;

    const userResponse=await userModel.findById(userID)

    if(userResponse.cart.includes(courseID)){
      return res.status(500).json({
        success: false,
        message: "Already in Cart",
      })
    }

    // Add the cart item to the user's cart
    const response = await userModel.findByIdAndUpdate(
      userID,
      { $push: { cart: courseID } },
      { new: true }
    ).populate("cart");


    return res.status(200).json({
      success: true,
      message: "Cart item added successfully.",
      data:response
    });
  } catch (error) {
    console.error("Error in addCartHandler:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while adding to cart.",
      error: error.message,
    });
  }
};


exports.removeFromTheCart = async (req, res) => {
  try {
    const { courseID, token } = req.body;

    // Validate input fields
    if (!courseID || !token) {
      return res.status(400).json({
        success: false,
        message: "course ID and Token are required.",
      });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
    const userID = decodedToken.id;


    const response=await userModel.findByIdAndUpdate(
      userID,
      { $pull: { cart: courseID } },
      { new: true }
    ).populate("cart");

    return res.status(200).json({
      success: true,
      message: "Cart item removed successfully.",
      data:response
    });
  } catch (error) {
    console.error("Error in removeFromTheCart:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while removing the cart item.",
      error: error.message,
    });
  }
};
