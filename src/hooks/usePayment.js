import { useState } from "react";
import { toast } from "react-toastify";

const usePayment = () => {
  const [paymentError, setPaymentError] = useState(null);
  
  const handleCheckout = async (cartItems, totalAmount, username, navigate) => {
    if (!cartItems?.length || !totalAmount) {
      setPaymentError("Invalid cart data");
      return;
    }

    try {
      const requestBody = {
        totalAmount: totalAmount,
        cartItems: cartItems.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price_per_unit,
        })),
      };

      const response = await fetch("http://localhost:8080/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const razorpayOrderId = await response.text();
      const options = {
        key: "rzp_test_pDmeThQ43TOY1D",
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        name: "Sales Savvy",
        description: "Purchase Payment",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(
              "http://localhost:8080/api/payment/verify",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              }
            );

            if (!verifyResponse.ok) {
              throw new Error(await verifyResponse.text());
            }

            // Show success toast and navigate after a delay
            const toastId = toast.success("Payment successful!", {
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: false,
            });

            // Navigate after toast shows
            setTimeout(() => {
              toast.dismiss(toastId);
              navigate("/home");
            }, 2000);

          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error(`Payment verification failed: ${error.message}`, {
              autoClose: 3000,
              closeOnClick: true,
              pauseOnHover: false,
            });
          }
        },
        prefill: {
          name: username,
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#6b46c1",
        },
        modal: {
          ondismiss: function () {
            setPaymentError("Payment cancelled");
            toast.warn("Payment cancelled", {
              autoClose: 3000,
              closeOnClick: true,
              pauseOnHover: false,
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      setPaymentError(error.message || "Payment failed. Please try again.");
      toast.error(error.message || "Payment failed. Please try again.", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return { handleCheckout, paymentError };
};

export default usePayment;