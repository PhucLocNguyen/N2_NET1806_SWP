import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import CreateConversationJoin from "../../utils/CreateConversationJoin.jsx";
import AdminLayout from "./layout/AdminLayout";

// Status options
const statusDesignOptions = [
  { code: 1, label: "The sketch is being drafted" },
  { code: 2, label: "Design The Ring" },
  { code: 3, label: "The sketch is complete" },
];

const statusProductOptions = [
  { code: 1, label: "The sketch is ready" },
  { code: 2, label: "Product is being processed" },
  { code: 3, label: "Processing completed and ready for handover" },
];

function OrderBoard() {
  const {UserId} = useAuth();
  return (
    <AdminLayout>

    <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      
      {/* Main Content */}
      <div className="flex-grow pb-10">
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Team Project Board</h1>
        </div>
        <div className="flex justify-between px-10 mt-4 space-x-4">
          {/* To-do Column */}
          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">To-do</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {/* {filterItems([1], type).length} */}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {/* {filterItems([1], type).map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  handleDataUpdate={handleDataUpdate}
                />
              ))} */}
              <Button  onClick={()=>{CreateConversationJoin(UserId,1) }}>Test</Button>
            </div>
          </div>

          {/* In-Progress Column */}
          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">In-Progress</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {/* {filterItems([2], type).length} */}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {/* {filterItems([2], type).map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  handleDataUpdate={handleDataUpdate}
                />
              ))} */}
            </div>
          </div>

          {/* Done Column */}
          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">Done</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {/* {filterItems([3], type).length} */}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {/* {filterItems([3], type).map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  handleDataUpdate={handleDataUpdate}
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}

export default OrderBoard;
