import React from "react";
import { getStatusCustomerByCode, getStatusClass } from "./OrderCustomer";

const Order = ({ data, onViewDetail, index }) => {
  

  const statusLabel = getStatusCustomerByCode(data.status);
  const statusClass = getStatusClass(statusLabel);

  return (
    <div className="flex flex-col md:flex-row md:items-center p-4 border-b border-gray-200 hover:bg-gray-100">
      <p className="md:w-1/4 py-2 px-4">{index}</p>
      <p className="md:w-1/4 py-2 px-4">{data.createdDate}</p>
      <div className="md:w-1/4 py-2 px-4">
        <span className={`py-1 px-3 rounded-full text-xs ${statusClass}`}>
          {statusLabel}
        </span>
      </div>
      <span
        onClick={() => onViewDetail(data)}
        className="md:w-1/4 py-2 px-4 hover:text-slate-950 duration-200 cursor-pointer text-blue-500"
      >
        View Detail
      </span>
    </div>
  );
};

export default Order;
