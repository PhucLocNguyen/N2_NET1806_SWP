import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchApiRequirementById } from "../../api/Requirements/FetchApiRequirement";
import useAuth from "../../hooks/useAuth";
import Order from "./Order";
import OrderDetail from "./OrderDetail";

function OrderCustomer() {
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { UserId } = useAuth();

  useEffect(() => {
    if (UserId) {
      fetchUserRequirements(UserId);
    }
  }, [UserId]);

  const fetchUserRequirements = async (userId) => {
    try {
      const userRequirements = await fetchApiUserRequirementByUserId(userId);
      const requirementsData = await Promise.all(
        userRequirements.map(async (userRequirement) => {
          const requirement = await FetchApiRequirementById(
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

  console.log(selectedOrder);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Orders List</h1>
      {selectedOrder ? (
        <OrderDetail />
      ) : (
        <>
          <div className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal p-4">
            <div className="flex flex-col md:flex-row">
              <p className="md:w-1/4 py-2 px-4">Number</p>
              <p className="md:w-1/4 py-2 px-4">Created Date</p>
              <p className="md:w-1/4 py-2 px-4">Status</p>
              <p className="md:w-1/4 py-2 px-4"></p>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {data.map((item, index) => (
              <Link
                key={item.requirementId}
                to={`/OrderCustomer/${item.requirementId}`}
              >
                <Order
                  data={item}
                  index={index + 1} // Passing the index + 1 as a prop to Order
                  onViewDetail={() => setSelectedOrder(item)}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderCustomer;
