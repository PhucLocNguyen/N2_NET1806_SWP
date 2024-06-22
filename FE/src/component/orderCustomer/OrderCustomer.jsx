import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCust from "./OrderCust";

function OrderCustomer() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataDesign, setDataDesign] = useState({});
  const [masterGemStone, setMasterGemStone] = useState(null);
  const [stone, setStone] = useState(null);
  const [note, setNote] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const url = "https://localhost:7103/api/Requirement";

  const headers = {
    Authorization: "Bearer <your-access-token>",
  };

  const fetchApiRequirement = async () => {
    try {
      const response = await axios.get(url, { headers });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApiDesign = async (designId) => {
    try {
      const response = await axios.get(
        `https://localhost:7103/api/Design/${designId}`
      );
      const designData = response.data;
      setDataDesign(designData);
      if (designData.masterGemstone) {
        setMasterGemStone(designData.masterGemstone);
      }
      if (designData.stone) {
        setStone(designData.stone);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateRequirement = async () => {
    if (!selectedItem) return;

    const urlUpdateRequirement = `https://localhost:7103/api/Requirement?id=${selectedItem.requirementId}`;

    const updatedItem = {
      ...selectedItem,
      customerNote: note.trim(), // Chỉ cần cập nhật lại customerNote với giá trị mới của note
    };

    try {
      const response = await axios.put(urlUpdateRequirement, updatedItem, {
        headers,
      });
      console.log("Data updated successfully:", response.data);
      fetchApiRequirement(); // Refresh the data
      setShowAlert(true); // Show alert notification
      setTimeout(() => setShowAlert(false), 2000); // Hide alert after 3 seconds
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    fetchApiRequirement();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      fetchApiDesign(selectedItem.designId);
      setNote(selectedItem.customerNote); // Set the initial note
    }
  }, [selectedItem]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setNote(item.customerNote); // Set the note when an item is clicked
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div className="relative bg-indigo-600 w-full h-fit py-3 grid grid-cols-12 gap-x-3 px-10 justify-center">
      {showAlert && (
        <div className="absolute top-0 col-span-12 w-full bg-green-500 text-white text-center py-2 mb-4 rounded-md">
          Note has been successfully updated!
        </div>
      )}
      <div className="col-start-3 col-span-4 mt-[22px]">
        <div className="p-4 h-[770px] overflow-y-auto rounded-md shadow-md">
          {data.map((item, index) => (
            <div key={index} onClick={() => handleItemClick(item)}>
              <OrderCust data={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="col-start-7 col-span-4 mt-4">
        <div className="p-4 rounded-md shadow-md">
          {selectedItem ? (
            <div className="flex flex-col justify-start items-start mt-3 p-4 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 drop-shadow-lg">
              <div className="w-full h-[700px] overflow-y-auto">
                <p className="flex justify-center text-xl font-semibold font-sans text-slate-700">
                  ORDERID: {selectedItem.requirementId}
                </p>
                <p className="mt-2 w-fit p-1 bg-[#c7f1d5] rounded-xl text-[#28c763] font-medium">
                  {selectedItem.status}
                </p>
                <p className="mt-2 w-fit p-1 bg-[#fbb6b7] rounded-xl text-[#ee585a] font-medium">
                  Expected Date Completed: {selectedItem.expectedDelivery}
                </p>
                <div>
                  <p className="text-xl font-semibold">Detail</p>
                  <div className="ml-2">
                    <p className="text-[#70757a] font-medium">
                      Size: {selectedItem.size}
                    </p>
                    <p className="text-[#70757a] font-medium">
                      design3D:
                      <img
                        className="w-[530px] h-[350px] object-cover"
                        src="https://i.pinimg.com/originals/e1/96/8e/e1968e2d84b7542cc80529cea7579f28.jpg"
                        alt={dataDesign.designName} // Added alt attribute for accessibility
                      />
                    </p>
                    <p className="text-[#70757a] font-medium">
                      goldPriceAtMoment: {selectedItem.goldPriceAtMoment}
                    </p>
                    <p className="text-[#70757a] font-medium">
                      stonePriceAtMoment: {selectedItem.stonePriceAtMoment}
                    </p>
                    <p className="text-[#70757a] font-medium">
                      machiningFee: {selectedItem.machiningFee}
                    </p>
                    <p className="text-[#70757a] font-medium">
                      totalMoney: {selectedItem.totalMoney}
                    </p>
                    <div>
                      {selectedItem.customerNote ? (
                        <p className="text-[#70757a] font-medium">
                          Notes: {selectedItem.customerNote}
                        </p>
                      ) : (
                        <p className="text-[#70757a] font-medium">
                          No notes yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {dataDesign.designId && (
                  <>
                    {masterGemStone && (
                      <div className="flex justify-between mt-4 border-t pt-4">
                        <div>
                          <p className="text-xl font-semibold">
                            Master Gemstone
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Kind: {masterGemStone.kind}
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Size: {masterGemStone.size}
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Price: ${masterGemStone.price}
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Clarity: {masterGemStone.clarity}
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Cut: {masterGemStone.cut}
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Weight: {masterGemStone.weight} carats
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Shape: {masterGemStone.shape}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <img
                            className="w-[200px] h-[200px] object-cover mt-2"
                            src={masterGemStone.image}
                            alt={masterGemStone.kind}
                          />
                        </div>
                      </div>
                    )}
                    {stone && (
                      <div className="flex justify-between mt-4 border-t pt-4">
                        <div>
                          <p className="text-xl font-semibold">Stone</p>
                          <p className="text-[#70757a] font-medium">
                            Kind: {stone.kind}
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Size: {stone.size}
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Quantity: {stone.quantity}
                          </p>
                          <p className="text-[#70757a] font-medium">
                            Price per unit: ${stone.price}
                          </p>
                        </div>
                        <div className="flex align-top justify-end">
                          <img
                            className="w-[200px] h-[200px] object-cover mt-2"
                            src={stone.image}
                            alt={stone.kind}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
                <textarea
                  className="w-full mt-4 text-sm text-gray-900 border-[2px] p-4 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  value={note}
                  onChange={handleNoteChange}
                  placeholder="Note Your Idea...."
                ></textarea>
                <button
                  className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  onClick={updateRequirement}
                >
                  Save Note
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-3 h-28 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 drop-shadow-lg">
              Select an item to see details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCustomer;
