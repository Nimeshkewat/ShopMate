export interface ShippingInfo {
  _id: string;
  fullname: string;
  state: string;
  city: string;
  country: string;
  address: string;
  pincode: string;
  phone: string;
}

export interface ShippingInfosResponse {
  success: boolean;
  shippingInfos: ShippingInfo[];
}

export interface ShippingInfoResponse {
  success: boolean;
  message?: string;
  shippingInfo: ShippingInfo;
}

export interface DeleteShippingResponse {
  success: boolean;
  message: string;
}

export interface RawShippingListResponse {
  success: boolean;
  shipping: ShippingInfo[];
}

export interface RawShippingItemResponse {
  success: boolean;
  message?: string;
  shipping: ShippingInfo;
}
