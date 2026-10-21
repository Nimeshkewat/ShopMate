import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/api/apiClient";
import { loadRazorpay, type RazorpayResponse } from "@/lib/razorpay";
import { useCreateOrder } from "@/hooks/order/useCreateOrde";
import { useCreateRazorpayOrder } from "@/hooks/payment/useCreateRazorpayOrder";
import { useVerifyPayment } from "@/hooks/payment/useVerifyPayment";
import type { PaymentType } from "@/types/order";

export function usePlaceOrder() {
  const navigate = useNavigate();
  const [isPlacing, setIsPlacing] = useState(false);
  const createOrder = useCreateOrder();
  const createRazorpayOrder = useCreateRazorpayOrder();
  const verifyPayment = useVerifyPayment();

  const placeOrder = async (
    shippingInfoId: string,
    paymentType: PaymentType,
  ) => {
    setIsPlacing(true);
    try {
      const { order } = await createOrder.mutateAsync({
        shippingInfoId,
        paymentType,
      });

      if (paymentType === "CashOnDelivery") {
        toast.success("Order placed successfully");
        navigate(`/order-success/${order._id}`, { state: { paymentType } });
        return;
      }

      if (!(await loadRazorpay()) || !window.Razorpay) {
        throw new Error(
          "Couldn't load the payment window. Please check your connection.",
        );
      }
      const rzp = await createRazorpayOrder.mutateAsync({ orderId: order._id });

      // wait until the payment window is finished or closed
      await new Promise<void>((resolve) => {
        const checkout = new window.Razorpay!({
          key: rzp.keyId,
          amount: rzp.amount,
          currency: rzp.currency,
          order_id: rzp.razorpayOrderId,
          name: "ShopMate",
          description: `Order #${order._id}`,
          handler: async (response: RazorpayResponse) => {
            try {
              await verifyPayment.mutateAsync(response);
              toast.success("Payment successful");
              navigate(`/order-success/${order._id}`, { state: { paymentType } });
            } catch (error) {
              toast.error(getErrorMessage(error));
            } finally {
              resolve();
            }
          },
          modal: {
            ondismiss: () => {
              toast.info(
                "Payment not completed. Your order is saved as pending.",
              );
              resolve();
            },
          },
        });
        checkout.open();
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPlacing(false);
    }
  };

  return { placeOrder, isPlacing };
}
