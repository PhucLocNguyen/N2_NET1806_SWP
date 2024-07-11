import { Breadcrumbs, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchApiRequirementById } from "../../api/Requirements/FetchApiRequirement";
import { fetchApiUserRequirementByUserId } from "../../api/userRequirements/FetchApiUsersRequirement";
import useAuth from "../../hooks/useAuth";
import Order from "./Order";
import OrderDetail from "./OrderDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
export const statusOptionCustomer = [
  { code: -1, label: "Canceled order" },
  { code: 0, label: "Waiting for sale receive" },
  { code: 1, label: "Waiting for sale contact you in chat system" },
  { code: 2, label: "Sale has sent your requirement to manager to quote price" },
  { code: -2, label: "Please check the chat system to contact with sale staff" },
  { code: 3, label: "Confirm the price quote" },
  { code: -3, label: "Waiting for manager quote price again" },
  { code: 4, label: "Deposit the order" },
  { code: 5, label: "Waiting for design staff" },
  { code: 6, label: "Working with design staff" },
  { code: 7, label: "Confirm the design" },
  { code: -7, label: "Waiting for design staff to contact you in chat system" },
  { code: 8, label: "Waiting for production staff receive" },
  { code: 9, label: "working with production staff" },
  { code: 10, label: "Product completed. Please pay the rest." },
  { code: 11, label: "Your order are waiting for adding warranty card" },
  { code: 12, label: "Successfully Completed" },
];
export const getStatusClass = (status) => {
  switch (status) {
    case "Canceled order":
      return "bg-red-600 text-red-100"
    case "Waiting for sale receive":
      return "bg-yellow-100 text-yellow-600";
    case "Waiting for sale contact you in chat system":
      return "bg-yellow-100 text-yellow-600";
    case "Please check the chat system to contact with sale staff":
      return "bg-yellow-200 text-yellow-800";
    case "Sale has sent your requirement to manager to quote price":
      return "bg-yellow-100 text-yellow-600";
    case "Confirm the price quote":
      return "bg-green-100 text-green-600";
    case "Waiting for manager quote price again":
      return "bg-yellow-100 text-yellow-600";
    case "Deposit the order":
      return "bg-green-100 text-green-600";
    case "Waiting for design staff":
      return "bg-yellow-100 text-yellow-600";
    case "Working with design staff":
      return "bg-yellow-100 text-yellow-600";
    case "Confirm the design":
      return "bg-green-100 text-green-600";
    case "Waiting for design staff redraw":
      return "bg-yellow-100 text-yellow-600";
    case "Waiting for production staff receive":
      return "bg-yellow-100 text-yellow-600";
    case "working with production staff":
      return "bg-yellow-100 text-yellow-600";
    case "Product completed. Please pay the rest.":
      return "bg-green-100 text-green-600";
    case "Your order are waiting for adding warranty card":
      return "bg-yellow-100 text-yellow-600";
    case "Successfully Completed":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
export const getStatusCustomerByCode = (code) => {
  const status = statusOptionCustomer.find(item => item.code == code);
  return status ? status.label : "Unknown status";
};
function OrderCustomer() {
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { UserId } = useAuth();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to="/">
      Home
    </Link>,
    <Typography key="2" color="text.primary">
      My Order
    </Typography>,
  ];
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
      <div className="mb-4 mt-6">
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>
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
                to={`/my-order/${item.requirementId}`}
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