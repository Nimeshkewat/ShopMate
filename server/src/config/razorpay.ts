import Razorpay from "razorpay";
import { AppError } from "../utils/AppError.js";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  throw new AppError(
    ":RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing from environment variables.",
    500
  );
}

const rzpInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export default rzpInstance;
