import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import useAuth from "../../hooks/useAuth.jsx";
import { fetchApiRequirementByStatus } from "../../api/Requirements/FetchApiRequirement.jsx";

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

function PlanningList() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [dataUpdated, setDataUpdated] = useState(false);

  const { role } = useAuth();

  useEffect(() => {
    // This sets the type to "product" after the first render
    if (role === "DesignStaff") {
      setType("design");
    }
    if (role === "ProductStaff") {
      setType("product");
    }
  }, [role]);

  useEffect(() => {
    // Fetch data based on the current type whenever type or dataUpdated changes
    if (type) {
      fetchDataByStatus(type);
    }
  }, [dataUpdated, type]);

  const fetchDataByStatus = async (currentType) => {
    const statusOptions = currentType === "design" ? statusDesignOptions : statusProductOptions;
    const statusLabels = statusOptions.map((option) => option.label);

    const dataPromises = statusLabels.map((label) => fetchApiRequirementByStatus(label));
    const dataResponses = await Promise.all(dataPromises);

    const combinedData = dataResponses.flat();
    setData(combinedData);
  };

  const filterItems = (statusCodes) => {
    const statusOptions = type === "design" ? statusDesignOptions : statusProductOptions;
    const statusLabels = statusCodes.map(
      (statusCode) => statusOptions.find((option) => option.code === statusCode)?.label
    );
    return data.filter((item) => statusLabels.includes(item.status));
  };

  const handleDataUpdate = () => {
    setDataUpdated(!dataUpdated);
  };

  const handleStatusChange = (itemId, newStatus) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item))
    );
    handleDataUpdate();
  };

  return (
    <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      {/* Header */}
      <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
        <svg
          className="w-8 h-8 text-indigo-600 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        <div className="ml-10">
          <a className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700" href="#">
            Activity
          </a>
        </div>
        <div className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
          <img
            src="https://assets.codepen.io/5041378/internal/avatars/users/zdefault.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
            alt="User avatar"
          />
        </div>
      </div>

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
                {filterItems([1]).length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {filterItems([1]).map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  handleStatusChange={handleStatusChange}
                  handleDataUpdate={handleDataUpdate}
                />
              ))}
            </div>
          </div>

          {/* In-Progress Column */}
          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">In-Progress</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {filterItems([2]).length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {filterItems([2]).map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  handleStatusChange={handleStatusChange}
                  handleDataUpdate={handleDataUpdate}
                />
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">Done</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {filterItems([3]).length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {filterItems([3]).map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  handleStatusChange={handleStatusChange}
                  handleDataUpdate={handleDataUpdate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanningList;
