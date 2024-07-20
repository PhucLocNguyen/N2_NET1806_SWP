import React, { useState } from "react";
import TodoPopup from "./TodoPopup";
import DonePopup from "./DonePopup";
import Popup from "./Popup";

export const statusOption = [
  { code: 5, label: "The sketch is being drafted" },
  { code: 6, label: "Design The Ring" },
  { code: 7, label: "The sketch is complete" },
  { code: 8, label: "The sketch is ready" },
  { code: 9, label: "Product is being processed" },
  { code: 10, label: "Product completed" },
];

export const getStatusClass = (status) => {
  switch (status) {
    case "The sketch is being drafted":
    case "Design The Ring":
    case "The sketch is complete":
    case "The sketch is ready":
    case "Product is being processed":
    case "Processing completed and ready for handover":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const getStatus = (code) => {
  const status = statusOption.find((item) => item.code == code);
  return status ? status.label : "Unknown status";
};

function Plan({ data, handleStatusChange, handlePopupOpen, isTodo, isDone }) {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setIsOpenPopup(true);
    handlePopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpenPopup(false);
    handlePopupOpen(false);
  };

  const handleStatusUpdate = (newStatus) => {
    handleStatusChange(data.requirementId, newStatus);
    handleClosePopup();
  };

  return (
    <div>
      <div
        onClick={handleOpenPopup}
        className="relative flex items-center mt-3 h-28 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 shadow-lg"
        draggable="true"
      >
        <div className="w-[80%] mx-auto">
          <p className="mt-3 ml-6 text-sm font-medium leading-5">{data.title}</p>
          <span className="flex items-center w-fit px-1 text-xs font-semibold text-green-500 bg-green-100 rounded-full h-fit py-1 ml-3">
            Requirement ID: R00{data.requirementId}
          </span>
          <p className="mt-4 text-sm font-medium bg-[#4338d3] text-white px-2 h-fit w-fit max-w-[80%] rounded ml-4 overflow-hidden text-ellipsis whitespace-nowrap">
            {getStatus(data.status)}
          </p>
          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400 ml-4">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 fill-current text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 000-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="leading-none text-red-500">{data.expectedDelivery}</span>
            </div>
          </div>
        </div>
      </div>
      {isOpenPopup && (
        <>
          {isTodo ? (
            <TodoPopup
              setIsOpenPopup={setIsOpenPopup}
              handleStatusChange={handleStatusUpdate}
              requirementId={data.requirementId}
            />
          ) : isDone ? (
            <DonePopup setIsOpenPopup={setIsOpenPopup} data={data} />
          ) : (
            <Popup
              setIsOpenPopup={setIsOpenPopup}
              data={data}
              handleStatusChange={handleStatusUpdate}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Plan;