import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import useAuth from "../../hooks/useAuth.jsx";
import {
  FetchApiRequirementByStatus,
  FetchApiRequirementOpeningOrder,
} from "../../api/Requirements/FetchApiRequirement.jsx";


function PlanningList() {
  const [dataTodo, setDataTodo] = useState([]);
  const [dataInProgress, setDataInProgress] = useState([]);
  const [dataDone, setDataDone] = useState([]);
  const [type, setType] = useState("");
  const { role, UserId } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    if (role === "DesignStaff") {
      setType("design");
    } else if (role === "ProductStaff") {
      setType("product");
    }
  }, [role]);

  const getRequirements = async () => {
    try {
      let statusTodo, statusInProgress, statusDone;
      if (type === "design") {
        statusTodo = "5";
        statusInProgress = "6";
        statusDone = "7";
      } else {
        statusTodo = "8";
        statusInProgress = "9";
        statusDone = "10";
      }

      const todoResponse = await FetchApiRequirementOpeningOrder(statusTodo);
      const inProgressResponse = await FetchApiRequirementByStatus(
        UserId,
        statusInProgress
      );
      const doneResponse = await FetchApiRequirementByStatus(
        UserId,
        statusDone
      );

      setDataTodo(todoResponse);
      setDataInProgress(inProgressResponse);
      setDataDone(doneResponse);
    } catch (error) {
      console.error("Error fetching requirements:", error);
    }
  };

  useEffect(() => {
    if (type) {
      getRequirements();
    }
  }, [type, dataUpdated]);

  const handleStatusChange = (itemId, newStatus) => {
    setDataTodo((prevDataTodo) =>
      prevDataTodo.map((item) =>
        item.requirementId === itemId ? { ...item, status: newStatus } : item
      )
    );
    setDataInProgress((prevDataInProgres) =>
      prevDataInProgres.map((item) =>
        item.requirementId === itemId ? { ...item, status: newStatus } : item
      )
    );
    setDataDone((prevDataDone) =>
      prevDataDone.map((item) =>
        item.requirementId === itemId ? { ...item, status: newStatus } : item
      )
    );
    setDataUpdated((prevState) => !prevState);
  };

  const handlePopupOpen = (isOpen) => {
    setIsPopupOpen(isOpen);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
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

      <div className="flex-grow pb-10">
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Team Project Board</h1>
        </div>
        <div className="flex justify-between px-10 mt-4 space-x-4">
          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">To-do</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {dataTodo.length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {dataTodo.map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  handleStatusChange={handleStatusChange}
                  handlePopupOpen={handlePopupOpen}
                  isTodo={true}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">In-Progress</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {dataInProgress.length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {dataInProgress.map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  handleStatusChange={handleStatusChange}
                  handlePopupOpen={handlePopupOpen}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">Done</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {dataDone.length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {dataDone.map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  handleStatusChange={handleStatusChange}
                  handlePopupOpen={handlePopupOpen}
                  isDone={true}
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
