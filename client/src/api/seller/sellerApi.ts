import { api } from "@/api/apiClient";
import type { BecomeSellerPayload, BecomeSellerResponse } from "@/types/seller";

const BECOME_SELLER_URL = "/users/become-seller";

export const becomeSeller = async ({
  shopImage,
  ...values
}: BecomeSellerPayload) => {
  if (!shopImage) {
    return api
      .patch<BecomeSellerResponse>(BECOME_SELLER_URL, values)
      .then((res) => res.data);
  }

  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  if (shopImage instanceof File) {
    formData.append("shopImage", shopImage);
  } else if (typeof shopImage === "string" && shopImage.trim()) {
    formData.append("shopImage", shopImage);
  }

  return api
    .patch<BecomeSellerResponse>(BECOME_SELLER_URL, formData)
    .then((res) => res.data);
};
