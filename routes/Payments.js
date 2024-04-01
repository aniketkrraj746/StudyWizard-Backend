// Import the required modules
const express = require("express");
const router = express.Router();

const { capturePayment, verifyPayment } = require("../controllers/payments");
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", verifyPayment);

module.exports = router;
