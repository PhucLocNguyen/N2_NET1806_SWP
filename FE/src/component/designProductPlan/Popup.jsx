import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchApiDesignById } from "../../api/FetchApiDesign";
import { PutApiRequirementByStatus } from "../../api/Requirements/PutApiRequirement";
import UploadImage from "../../utils/UploadImage.jsx";
import DeleteImage from "../../utils/DeleteImage.jsx";
import useAuth from "../../hooks/useAuth.jsx";

function Popup({ setIsOpenPopup, data, handleStatusChange }) {
  const folder = "Design3D";
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataDesign, setDataDesign] = useState({});
  const [masterGemStone, setMasterGemStone] = useState(null);
  const [stone, setStone] = useState(null);
  const [status, setStatus] = useState("");
  const [dataUpdate, setDataUpdate] = useState({
    status: "",
    createdDate: data.createdDate,
    expectedDelivery: data.expectedDelivery,
    size: data.size,
    designId: data.designId,
    design3D: data.design3D,
    weightOfMaterial: data.weightOfMaterial,
    materialPriceAtMoment: data.materialPriceAtMoment,
    masterGemStonePriceAtMoment: data.masterGemStonePriceAtMoment,
    stonePriceAtMoment: data.stonePriceAtMoment,
    machiningFee: data.machiningFee,
    totalMoney: data.totalMoney,
    customerNote: data.customerNote,
    staffNote: data.staffNote,
  });

  const { role } = useAuth();

  useEffect(() => {
    if (role === "DesignStaff") {
      setStatus("7");
    } else if (role === "ProductStaff") {
      setStatus("10");
    }
    getDesign(data.designId);
  }, [role]);

  const UpdateRequirement = async (requirementId, updateData) => {
    const response = await PutApiRequirementByStatus(requirementId, updateData);
    return response;
  };

  const getDesign = async (designId) => {
    const response = await fetchApiDesignById(designId);
    setDataDesign(response);
    if (response.masterGemstone) {
      setMasterGemStone(response.masterGemstone);
    }
    if (response.stone) {
      setStone(response.stone);
    }
  };

  const handleFileChange = async (event) => {
    const selectFile = event.target.files[0];
    if (selectFile) {
        try {
            if (dataUpdate.design3D !== '' && dataUpdate.design3D != null) {
                await DeleteImage(dataUpdate.design3D);
            }

            let urlImage = await UploadImage(folder, selectFile);
            if (urlImage) {
              setDataUpdate({ ...dataUpdate, design3D: urlImage, status: status });
            } else {
                console.error("Upload returned undefined URL.");
            }
        } catch (error) {
            console.error("Error during file upload: ", error);
        }
        setSelectedFile(selectFile);
    }
};


  const handleSubmit = async () => {
    if (selectedFile) {
      const updateSuccess = await UpdateRequirement(
        data.requirementId,
        dataUpdate
      );
      if (updateSuccess) {
        handleStatusChange(data.requirementId, status);
      }
      setIsOpenPopup(false);
    }
  };

  return (
    <div
      onClick={() => setIsOpenPopup(false)}
      className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center rounded-[10px] z-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fff] w-[45rem] rounded-[10px] h-[600px] overflow-y-auto"
      >
        <div className="w-full p-5 rounded-[10px]">
          <h1 className="text-slate-500 font-medium">
            Requirement ID: R00{data.requirementId}
          </h1>

          <h2 className="text-2xl my-2 font-medium">Design Information</h2>
          <div className="ml-5">
            <img
              src={dataDesign.image}
              className="size-32"
              alt="Design Image"
            />
            <p>Name Of Design: {dataDesign.designName}</p>
          </div>

          {(masterGemStone || stone) && (
            <h2 className="text-2xl my-2 font-medium">Stones Detail</h2>
          )}
          <div className="flex ml-5">
            {masterGemStone && (
              <div className="min-w-[500px]">
                <h1 className="text-lg my-2 font-medium">Master Gemstones</h1>
                <div className="flex">
                  <div>
                    <img
                      src={masterGemStone.image}
                      className="size-60"
                      alt="Master Gemstone"
                    />
                  </div>
                  <div className="my-auto">
                    <p>Kind: {masterGemStone.kind}</p>
                    <p>Clarity: {masterGemStone.clarity}</p>
                    <p>Cut: {masterGemStone.cut}</p>
                    <p>Weight: {masterGemStone.weight}</p>
                  </div>
                </div>
              </div>
            )}
            {stone && (
              <div className="max-w-[500px]">
                <h1 className="text-lg my-2 font-medium">Stones</h1>
                <div className="flex mt-[68px]">
                  <div className="my-auto">
                    <p>Kind: {stone.kind}</p>
                    <p>Size: {stone.size}</p>
                    <p>Quantity: {stone.quantity}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="font-[sans-serif]">
              <label className="text-base text-gray-500 font-semibold mb-2 block">
                Upload file
              </label>
              <input
                type="file"
                className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className={`mt-4 px-2.5 py-1.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-green-700 hover:bg-green-800 active:bg-green-700 ${
                !selectedFile && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!selectedFile}
            >
              Confirmed
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Popup;
