import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOredersController,
  getAllOredersController,
  orderStatusController,
} from "../controllers/authConroller.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIM || METHOD POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignin, isAdmin, testController);

//protected user route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//forgot password || post
router.post("/forgot-password", forgotPasswordController);

//update profile
router.put("/profile", requireSignin, updateProfileController);

//orders
router.get("/orders", requireSignin, getOredersController);

//all orders
router.get("/all-orders", requireSignin, isAdmin, getAllOredersController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignin,
  isAdmin,
  orderStatusController
);

export default router;
