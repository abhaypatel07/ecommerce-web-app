import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

//creating router object
const router = express.Router();

//routes
//create product
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);

//get all product
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo using id
router.get("/product-photo/:pid", productPhotoController);

//update product
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  updateProductController
);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

// serach product
router.get("/search/:keyword", searchProductController);

// similar product routes
router.get("/related-product/:pid/:cid", relatedProductController);

//products using category
router.get("/product-category/:slug", productCategoryController);

//payment routes
//token (this is diffrent token which get from braintree)
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignin, braintreePaymentController);

export default router;
