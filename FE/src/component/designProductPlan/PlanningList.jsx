import React, { useEffect, useState } from "react";
import axios from "axios";
import Plan from "./Plan";
import useAuth from "../../hooks/useAuth.jsx";

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
    setType("design")
  }, []);
  

  const filterItems = (statusCodes, type) => {
    const statusOptions =
      type === "design" ? statusDesignOptions : statusProductOptions;
    const statusLabels = statusCodes.map(
      (statusCode) =>
        statusOptions.find((option) => option.code === statusCode)?.label
    );
    return data.filter((item) => statusLabels.includes(item.status));
  };

  const url = "https://localhost:7103/api/Requirement";
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0aGllbkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVHlkeSIsIlJvbGUiOiJBZG1pbiIsImV4cCI6MTcxODc4OTk0MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3MTY5LyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzE2OS8ifQ.W66oliElGHELa2jC9ixxt2FD0tC8sDu7CQ4itv6Jw7Ds0cVPswIyWzSuZeM01ghTjsVOgbxKpj2oe2AQiPHD-Q",
  };

  const fetchApiRequirement = async () => {
    try {
      const response = await axios.get(url, { headers });
      setData(response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchApiRequirement();
  }, [dataUpdated]);

  const handleDataUpdate = () => {
    setDataUpdated(!dataUpdated);
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
          <a
            className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
            href="#"
          >
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
                {filterItems([1], type).length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {filterItems([1], type).map((item, index) => (
                <Plan
                  key={index}
                  data={item}
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
                {filterItems([2], type).length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {filterItems([2], type).map((item, index) => (
                <Plan
                  key={index}
                  data={item}
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
                {filterItems([3], type).length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {filterItems([3], type).map((item, index) => (
                <Plan
                  key={index}
                  data={item}
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
