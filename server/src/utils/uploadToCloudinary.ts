import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { AppError } from "./AppError.js";

interface UploadOptions {
  folder?: string;
  type: "avatar" | "product" | "general";
}

const uploadToCloudinary = (
  buffer: Buffer,
  options: UploadOptions = { type: "general" }
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    if (!buffer || buffer.length === 0) {
      return reject(
        new AppError("No file buffer found on the request object.", 400)
      );
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: options.folder || "general" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(
            new AppError("Cloudinary upload failed with no result", 500)
          );
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export default uploadToCloudinary;
