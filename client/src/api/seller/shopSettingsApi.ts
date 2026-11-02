import type {
  GetShopResponse,
  UpdateShopPayload,
  UpdateShopResponse,
} from "@/types/shop";
import { api } from "../apiClient";

const BASE = "/shop-settings";
export const getShop = async (): Promise<GetShopResponse> => {
  const response = await api.get<GetShopResponse>(BASE);
  return response.data;
};

export const updateShop = async ({
  shopImage,
  removeShopImage,
  ...fields
}: UpdateShopPayload): Promise<UpdateShopResponse> => {
  if (!shopImage && !removeShopImage) {
    return api
      .patch<UpdateShopResponse>(`${BASE}`, fields)
      .then((res) => res.data);
  }

  const formData = new FormData();
  formData.append("shopName", fields.shopName);
  formData.append("shopDescription", fields.shopDescription);
  if (shopImage) formData.append("shopImage", shopImage);
  if (removeShopImage) formData.append("removeShopImage", "true");

  const response = await api.patch<UpdateShopResponse>(`${BASE}`, formData);
  return response.data;
};
