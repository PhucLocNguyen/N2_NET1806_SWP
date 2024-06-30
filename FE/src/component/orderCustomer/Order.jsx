import React from "react";

const Order = ({ data, onViewDetail, index }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "The sketch is being drafted":
      case "Design The Ring":
      case "Product is being processed":
        return "bg-yellow-100 text-yellow-600";
      case "The sketch is complete":
      case "Processing completed and ready for handover":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center p-4 border-b border-gray-200 hover:bg-gray-100">
      <p className="md:w-1/4 py-2 px-4">{index}</p>
      <p className="md:w-1/4 py-2 px-4">{data.createdDate}</p>
      <div className="md:w-1/4 py-2 px-4">
        <span
          className={`py-1 px-3 rounded-full text-xs ${getStatusClass(
            data.status
          )}`}
        >
          {data.status}
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