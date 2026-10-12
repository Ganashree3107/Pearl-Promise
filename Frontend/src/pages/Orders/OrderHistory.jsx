import { useMemo, useState } from "react";

import OrderHeader from "../../components/orders/OrderHeader";
import OrderTabs from "../../components/orders/OrderTabs";
import OrderCard from "../../components/orders/OrderCard";
import EmptyOrders from "../../components/orders/EmptyOrders";
import { useOrder } from "../../context/OrderContext";

export default function OrderHistory() {
  const { orders } = useOrder();
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderId
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.checkoutItems?.some((item) =>
          item.name
            .toLowerCase()
            .includes(search.toLowerCase())
        );

      const matchesStatus =
        selectedTab === "All"
          ? true
          : order.status === selectedTab;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, selectedTab]);

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">

      <div className="mx-auto max-w-7xl">

        <OrderHeader
          search={search}
          setSearch={setSearch}
        />

        <OrderTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="mt-8">

          {filteredOrders.length === 0 ? (

            <EmptyOrders />

          ) : (

            <div className="grid gap-6">

              {filteredOrders.map((order, index) => (

                <OrderCard
                  key={order.orderId}
                  order={order}
                  index={index}
                />

              ))}

            </div>

          )}

        </div>
      </div>

    </div>
  );
}