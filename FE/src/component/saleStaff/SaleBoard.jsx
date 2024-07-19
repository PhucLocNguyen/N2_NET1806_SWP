import { useEffect } from "react";
import { useState } from "react";
import { FetchApiRequirementById, FetchApiRequirementByStatus, FetchApiRequirementOpeningOrder } from "../../api/Requirements/FetchApiRequirement";
import useAuth from "../../hooks/useAuth";
import * as signalR from '@microsoft/signalr';
import Plan from "./Plan";
const statusSaleStaff = [
   { code: 0, label: "Waiting for sale support" },
   { code: 1, label: "Working with sale" },
   { code: 2, label: "Sent to manager" },
 ];
function SaleBoard() {
   const [requirementOpen, setRequirementOpen] = useState([]); // status 0
   const [requirementWorking, setRequirementWorking] = useState([]); // status 1
   const [requirementHasBeenSent,setRequirementHasBeenSent] = useState([]); // status 2
   const [dataUpdated, setDataUpdated] = useState(false);
   const {UserId} = useAuth();
   const [connection, setConnection] = useState(null); 
   useEffect(() => {
      loadDataToBoard();
    }, [dataUpdated]);
  
    const handleDataUpdate = () => {
      setDataUpdated(!dataUpdated);
    };
  
   async function loadDataToBoard(){
      const dataRequirementOpen = await FetchApiRequirementOpeningOrder(0);
      setRequirementOpen(dataRequirementOpen);
    const dataRequirementWorking = await FetchApiRequirementByStatus(UserId,1);
    setRequirementWorking(dataRequirementWorking);
    const dataRequirementHasBeenSent = await FetchApiRequirementByStatus(UserId,2);
    setRequirementHasBeenSent(dataRequirementHasBeenSent);
   }
   useEffect(()=>{
loadDataToBoard();
const newConnection = new signalR.HubConnectionBuilder()
.withUrl('https://app-swp391-su24.azurewebsites.net/Working')
.withAutomaticReconnect()
.build();

setConnection(newConnection);
   },[])

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!');

          connection.on('ReceiveOrderUpdate', orderId => {
            console.log("Nhan tin hieu");
            updateOrder(orderId);
          });
          connection.on('ReceiveOrderCreate', orderId => {
            pushOrder(orderId);
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);

  const updateOrder = async (orderId) => {
    // Fetch the updated order and update the state
    const getRequirementUpdate =await FetchApiRequirementById(orderId);
    setRequirementOpen(prevOrders => {
      // Filter out the order with the same ID
      const updatedOrders = prevOrders.filter(order => order.requirementId !== orderId);
      
      // Add the updated order back to the list
      return updatedOrders;
    });
  };
  const pushOrder = async (orderId) => {
    // Fetch the updated order and update the state
    const getRequirementCreate =await FetchApiRequirementById(orderId);
    setRequirementOpen(prevOrders => [...prevOrders,getRequirementCreate]);
  };
   return (
    <>
    
      <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      {/* Header */}
      {/* Main Content */}  
      <div className=" flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <h1 className="text-2xl font-bold">Sale staff Board</h1>
        
      </div>
      <div className="flex-grow pb-10">
        <div className="px-10 mt-6">
        </div>
        <div className="flex justify-between px-10 mt-4 space-x-4">
          {/* To-do Column */}
          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">Order is waiting for pickup</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {requirementOpen.length}
              </span>
            </div>
            
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {requirementOpen.map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  statusOptions={statusSaleStaff}
                  handleDataUpdate={handleDataUpdate}
                />
              ))}
            </div>
          </div>

          {/* In-Progress Column */}
          <div className="flex flex-col w-[32%] bg-white bg-opacity-70 p-4 rounded-lg">
            <div className="flex items-center h-10 px-2">
              <span className="block text-sm font-semibold">Working on an order</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {requirementWorking.length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {requirementWorking.map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  statusOptions={statusSaleStaff}
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
                {requirementHasBeenSent.length}
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto h-[calc(100vh-140px)]">
              {requirementHasBeenSent.map((item, index) => (
                <Plan
                  key={index}
                  data={item}
                  statusOptions={statusSaleStaff}
                  handleDataUpdate={handleDataUpdate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   )
}

export default SaleBoard;