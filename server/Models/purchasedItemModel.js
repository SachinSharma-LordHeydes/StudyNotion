const mongoose = require("mongoose");

const purchasedItemSchema = new mongoose.Schema({
  course :{ type: mongoose.Schema.Types.ObjectId, ref: "courseModel", required: true },
  user :{ type: mongoose.Schema.Types.ObjectId, ref: "userModel", required: true },
  totalPrice: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ["esewa", "khalti"], required: true },
  status: { type: String, enum: ["pending", "completed", "refunded"], default: "pending" },
}, { timestamps: true });

const PurchasedItem = mongoose.model("PurchasedItem", purchasedItemSchema);
module.exports = PurchasedItem;