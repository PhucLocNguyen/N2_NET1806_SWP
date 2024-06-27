import React, { useEffect, useState } from "react";
import { fetchApiRequirementByRequirementId } from "../../api/Requirements/FetchApiRequirement";
<<<<<<< HEAD
import { fetchApiUserRequirementByUserId } from "../../api/userRequirements/FetchApiUsersRequirement";
=======
import { fetchApiUserRequirementByUserId } from "../../api/userReuirements/FetchApiUsersRequirement";
>>>>>>> c35d150864aa354bd8a3a247fc56f371b3884a8a
import useAuth from "../../hooks/useAuth";
import Order from "./Order";
import OrderDetail from "./OrderDetail";

function OrderCustomer() {
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { UserId } = useAuth();

  useEffect(() => {
    if (UserId) {
      fetchRequirementsForUser(UserId);
    }
  }, [UserId]);

  const fetchRequirementsForUser = async (userId) => {
    try {
      const userRequirements = await fetchApiUserRequirementByUserId(userId);
      const requirementsData = await Promise.all(
        userRequirements.map(async (userRequirement) => {
          const requirement = await fetchApiRequirementByRequirementId(
            userRequirement.requirementId
          );
          return requirement;
        })
      );
      setData(requirementsData);
    } catch (error) {
      console.error("Failed to fetch requirements:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Orders List</h1>
      {selectedOrder ? (
        <OrderDetail
          data={selectedOrder}
          onBack={() => setSelectedOrder(null)}
        />
      ) : (
        <>
          <div className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal p-4">
            <div className="flex flex-col md:flex-row">
              <p className="md:w-1/4 py-2 px-4">Order ID</p>
              <p className="md:w-1/4 py-2 px-4">Order Date</p>
              <p className="md:w-1/4 py-2 px-4">Status</p>
              <p className="md:w-1/4 py-2 px-4"></p>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {data.map((item) => (
              <Order
                key={item.requirementId}
                data={item}
                onViewDetail={setSelectedOrder}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderCustomer;
