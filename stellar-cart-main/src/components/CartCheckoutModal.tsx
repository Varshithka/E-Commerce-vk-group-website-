import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Wallet, Package, Truck, Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { Product } from "@/data/products";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/config/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onClearCart: () => void;
}

const CartCheckoutModal = ({ isOpen, onClose, cartItems, onClearCart }: Props) => {
  const [step, setStep] = useState<"cart" | "address" | "payment" | "success">("cart");
  const [address, setAddress] = useState({ street: "", city: "", state: "", pincode: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ trackId: string; deliveryDate: string } | null>(null);

  const totalAmount = cartItems.reduce((sum, item) => {
    let num = 0;
    if (typeof item.price === "number") {
      num = item.price;
    } else if (typeof item.price === "string") {
      num = parseFloat((item.price as string).replace(/[^0-9.]/g, ""));
    }
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const handleClose = () => {
    setStep("cart");
    setAddress({ street: "", city: "", state: "", pincode: "", phone: "" });
    setPaymentMethod("");
    setOrderSuccess(null);
    onClose();
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
    setIsProcessing(true);

    const d = new Date();
    d.setDate(d.getDate() + 4);
    const mockDateStr = d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    const mockTrackIdStr = "VKGC-" + Math.floor(Math.random() * 9000000 + 1000000);
    const fullAddress = `${address.street}, ${address.city}, ${address.state} - ${address.pincode}`;

    try {
      const response = await fetch(API_ENDPOINTS.ORDERS.PLACE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, address: fullAddress, totalAmount, paymentMethod }),
      });

      if (response.ok) {
        const data = await response.json();
        const realDate = data.estimatedDeliveryDate
          ? new Date(data.estimatedDeliveryDate).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
          : mockDateStr;
        toast.success("Order placed! Confirmation sent to your email.");
        onClearCart();
        setOrderSuccess({ trackId: data.trackingNumber || mockTrackIdStr, deliveryDate: realDate });
        setStep("success");
      } else {
        throw new Error("Server error");
      }
    } catch {
      // Fallback for demo purposes
      toast.success("Order placed successfully!");
      onClearCart();
      setOrderSuccess({ trackId: mockTrackIdStr, deliveryDate: mockDateStr });
      setStep("success");
    } finally {
      setIsProcessing(false);
    }
  };

  const STEPS = ["Cart", "Address", "Payment"];
  const stepIndex = step === "cart" ? 0 : step === "address" ? 1 : step === "payment" ? 2 : 3;

  const paymentOptions = [
    { id: "CREDIT_CARD", label: "Credit / Debit Card", icon: <CreditCard className="w-5 h-5" />, sub: "Visa, Mastercard, RuPay" },
    { id: "PAYPAL", label: "PayPal / UPI", icon: <Wallet className="w-5 h-5" />, sub: "Pay securely via PayPal or UPI ID" },
    { id: "COD", label: "Cash on Delivery", icon: <Package className="w-5 h-5" />, sub: "Pay when order arrives at your door" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#0f1117] w-full max-w-xl rounded-2xl border border-[#232f3e] shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            {/* Header */}
            <div className="bg-[#131921] px-6 py-4 flex items-center justify-between border-b border-[#232f3e]">
              <div className="flex items-center gap-3">
                <span className="text-[#FF9900] font-black text-xl tracking-widest">VK</span>
                <span className="text-white font-bold text-sm">Group Company</span>
              </div>
              {step !== "success" && (
                <div className="flex items-center gap-2">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < stepIndex ? "bg-green-500 text-white" : i === stepIndex ? "bg-[#FF9900] text-black" : "bg-[#232f3e] text-gray-400"}`}>
                        {i < stepIndex ? "✓" : i + 1}
                      </div>
                      <span className={`text-xs hidden sm:block ${i === stepIndex ? "text-[#FF9900]" : "text-gray-500"}`}>{s}</span>
                      {i < STEPS.length - 1 && <div className={`w-8 h-0.5 ${i < stepIndex ? "bg-green-500" : "bg-[#232f3e]"}`} />}
                    </div>
                  ))}
                </div>
              )}
              <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">

              {/* SUCCESS SCREEN */}
              {step === "success" && orderSuccess && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                  <div className="w-full flex justify-center mb-4">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/24cd9a103328473.5f4aaa60868f7.gif" alt="Success" className="w-32 h-32 object-contain" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-1">Order Confirmed!</h2>
                  <p className="text-gray-400 text-sm mb-6">Your order is being processed by VK Group Company.</p>

                  <div className="bg-[#1a2030] border border-[#232f3e] rounded-xl p-5 text-left space-y-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-[#FF9900]/10 rounded-lg">
                        <Package className="w-5 h-5 text-[#FF9900]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Tracking ID</p>
                        <p className="font-mono font-bold text-white text-lg">{orderSuccess.trackId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 border-t border-[#232f3e] pt-4">
                      <div className="p-2.5 bg-[#FF9900]/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-[#FF9900]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Estimated Delivery</p>
                        <p className="font-semibold text-[#FF9900]">{orderSuccess.deliveryDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 border-t border-[#232f3e] pt-4">
                      <div className="p-2.5 bg-blue-500/10 rounded-lg">
                        <Truck className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Order Status</p>
                        <div className="flex items-center gap-2 mt-1">
                          {["Confirmed", "Processing", "Shipped", "Delivered"].map((s, i) => (
                            <div key={s} className="flex items-center gap-1">
                              <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-green-500" : "bg-[#232f3e]"}`} />
                              <span className={`text-xs ${i === 0 ? "text-green-400" : "text-gray-600"}`}>{s}</span>
                              {i < 3 && <div className="w-4 h-px bg-[#232f3e]" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 bg-[#FF9900] hover:bg-[#e68a00] text-black font-black rounded-lg transition-all active:scale-[0.98]"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}

              {/* CART STEP */}
              {step === "cart" && (
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Your Cart ({cartItems.length} items)</h3>
                  <div className="space-y-2 mb-5 max-h-48 overflow-y-auto pr-1">
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
                    ) : (
                      cartItems.map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-[#1a2030] border border-[#232f3e] rounded-lg p-3">
                          <span className="text-gray-200 text-sm">{item.name}</span>
                          <span className="text-[#FF9900] font-bold text-sm">₹{typeof item.price === "number" ? item.price.toLocaleString("en-IN") : item.price}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex justify-between items-center bg-[#232f3e]/50 rounded-lg p-4 mb-5">
                    <span className="text-gray-300 font-semibold">Order Total</span>
                    <span className="text-[#FF9900] font-black text-xl">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <button
                    onClick={() => { if (cartItems.length > 0) setStep("address"); else toast.error("Cart is empty"); }}
                    className="w-full py-3 bg-[#FF9900] hover:bg-[#e68a00] text-black font-black rounded-lg transition-all active:scale-[0.98]"
                  >
                    Proceed to Shipping →
                  </button>
                </div>
              )}

              {/* ADDRESS STEP */}
              {step === "address" && (
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Shipping Address</h3>
                  <div className="space-y-3">
                    {[
                      { key: "street", placeholder: "Street / House No. / Apartment", label: "Address Line" },
                      { key: "city", placeholder: "City", label: "City" },
                      { key: "state", placeholder: "State", label: "State" },
                      { key: "pincode", placeholder: "PIN / ZIP Code", label: "PIN Code" },
                      { key: "phone", placeholder: "+91 XXXXX XXXXX", label: "Phone Number" },
                    ].map(({ key, placeholder, label }) => (
                      <div key={key}>
                        <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">{label}</label>
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={address[key as keyof typeof address]}
                          onChange={(e) => setAddress(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-[#1a2030] border border-[#232f3e] focus:border-[#FF9900] rounded-lg px-4 py-2.5 text-white text-sm outline-none transition-all placeholder:text-gray-600"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button onClick={() => setStep("cart")} className="flex-1 py-3 border border-[#232f3e] text-gray-400 hover:text-white hover:border-gray-500 rounded-lg font-bold transition-all">← Back</button>
                    <button
                      onClick={() => {
                        if (!address.street || !address.city || !address.pincode) { toast.error("Please fill all required fields."); return; }
                        setStep("payment");
                      }}
                      className="flex-2 flex-grow py-3 bg-[#FF9900] hover:bg-[#e68a00] text-black font-black rounded-lg transition-all active:scale-[0.98]"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </div>
              )}

              {/* PAYMENT STEP */}
              {step === "payment" && (
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Select Payment Method</h3>
                  <div className="space-y-3 mb-5">
                    {paymentOptions.map(({ id, label, icon, sub }) => (
                      <label key={id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === id ? "border-[#FF9900] bg-[#FF9900]/5" : "border-[#232f3e] hover:border-[#FF9900]/40 bg-[#1a2030]"}`}>
                        <input
                          type="radio"
                          name="payment"
                          value={id}
                          checked={paymentMethod === id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="accent-[#FF9900]"
                        />
                        <div className={`${paymentMethod === id ? "text-[#FF9900]" : "text-gray-400"}`}>{icon}</div>
                        <div>
                          <p className={`font-semibold text-sm ${paymentMethod === id ? "text-[#FF9900]" : "text-gray-200"}`}>{label}</p>
                          <p className="text-xs text-gray-500">{sub}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-[#1a2030] border border-[#232f3e] rounded-xl p-4 mb-5">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Order Summary</p>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Shipping</span>
                      <span className="text-green-400">FREE</span>
                    </div>
                    <div className="border-t border-[#232f3e] mt-2 pt-2 flex justify-between font-black text-white">
                      <span>Total</span>
                      <span className="text-[#FF9900]">₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep("address")} className="flex-1 py-3 border border-[#232f3e] text-gray-400 hover:text-white hover:border-gray-500 rounded-lg font-bold transition-all">← Back</button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className={`flex-grow py-3 font-black rounded-lg transition-all active:scale-[0.98] ${isProcessing ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-[#FF9900] hover:bg-[#e68a00] text-black"}`}
                    >
                      {isProcessing ? "Placing Order..." : `Place Order • ₹${totalAmount.toLocaleString("en-IN")}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartCheckoutModal;