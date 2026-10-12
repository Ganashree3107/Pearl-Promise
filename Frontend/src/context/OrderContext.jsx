import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { orderApi } from "../services/api";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

function mapOrder(order) {
  return {
    ...order,
    orderId: order.order_id,
    orderDate: order.created_at,
    checkoutItems: order.items.map((item) => ({
      id: item.product_id,
      slug: item.slug,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    })),
    shippingAddress: order.shipping_address,
    deliveryMethod: { id: order.delivery_method, name: order.delivery_method },
    paymentMethod: order.payment_method,
    deliveryFee: order.shipping_fee,
    grandTotal: order.total_amount,
    tax: 0,
    paymentStatus: order.payment_status,
    returnStatus: order.return_status,
    returnReason: order.return_reason,
    returnComments: order.return_comments,
  };
}

export function OrderProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);

  const refreshOrders = useCallback(async () => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }
    try {
      setOrders((await orderApi.list()).map(mapOrder));
    } catch {
      // Keep the last known orders if the API is temporarily unavailable.
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const hasOrdersInTransit = orders.some(
    (order) => !["Delivered", "Cancelled"].includes(order.status)
  );

  useEffect(() => {
    if (!isAuthenticated || !hasOrdersInTransit) return undefined;

    const interval = setInterval(refreshOrders, 1000);
    return () => clearInterval(interval);
  }, [hasOrdersInTransit, isAuthenticated, refreshOrders]);

  const addOrder = async (payload) => {
    const created = mapOrder(await orderApi.create(payload));
    setOrders((previous) => [
      created,
      ...previous.filter((order) => order.id !== created.id),
    ]);
    return created;
  };

  const cancelOrder = async (orderId) => {
    const order = orders.find((item) => item.orderId === orderId);
    if (!order?.id) return;
    const updated = mapOrder(await orderApi.cancel(order.id));
    setOrders((previous) => previous.map((item) => item.id === updated.id ? updated : item));
  };

  const updateOrderStatus = () => refreshOrders();
  const returnOrder = async (orderId, returnData) => {
    const order = orders.find((item) => item.orderId === orderId);
    if (!order?.id) throw new Error("Order not found");
    const updated = mapOrder(await orderApi.requestReturn(order.id, returnData));
    setOrders((previous) => previous.map((item) => item.id === updated.id ? updated : item));
    return updated;
  };
  const buyAgain = (order) => order.checkoutItems || [];
  const clearOrders = () => setOrders([]);
  const orderCount = orders.length;
  const processingOrders = orders.filter((order) => !["Delivered", "Cancelled"].includes(order.status));
  const shippedOrders = orders.filter((order) => order.status === "Shipped");
  const deliveredOrders = orders.filter((order) => order.status === "Delivered");
  const cancelledOrders = orders.filter((order) => order.status === "Cancelled");
  const returnedOrders = orders.filter((order) => order.returnStatus === "Return Requested" || order.returnStatus === "Returned");

  const value = useMemo(() => ({
    orders,
    orderCount,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    returnedOrders,
    addOrder,
    updateOrderStatus,
    cancelOrder,
    returnOrder,
    buyAgain,
    clearOrders,
    refreshOrders,
  }), [orders, isAuthenticated]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used inside OrderProvider.");
  return context;
}
