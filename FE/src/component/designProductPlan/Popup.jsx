import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { React, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import axios from "axios";

function Popup({ setIsOpenPopup, data, handleDataUpdate }) {
  const [selection, setSelection] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataDesign, setDataDesign] = useState({});
  const [masterGemStone, setMasterGemStone] = useState(null);
  const [stone, setStone] = useState(null);
  const [type, setType] = useState("");

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

  useEffect(() => {
    setType("design");
  }, []);

  const getStatusOptions = (type) => {
    return type === "design" ? statusDesignOptions : statusProductOptions;
  };

  const urlUpdateRequirement = `https://localhost:7103/api/Requirement?id=${data.requirementId}`;
  const urlForDesign = `https://localhost:7103/api/Design/${data.designId}`;

  const dataUpdate = {
    status: selection,
    expectedDelivery: `${data.expectedDelivery}`,
    size: `${data.size}`,
    designId: data.designId,
    design3D: `${data.design3D}`,
    materialPriceAtMoment: data.materialPriceAtMoment,
    stonePriceAtMoment: data.stonePriceAtMoment,
    machiningFee: data.machiningFee,
    totalMoney: data.totalMoney,
    customerNote: `${data.customerNote}`,
    staffNote: `${data.staffNote}`,
  };

  const UpdateRequirement = () => {
    axios
      .put(urlUpdateRequirement, dataUpdate)
      .then((response) => {
        console.log("Dữ liệu đã được cập nhật thành công:", response.data);
        handleDataUpdate();
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi cập nhật dữ liệu:", error);
      });
  };

  const FetchApiDesign = async () => {
    try {
      const response = await axios.get(urlForDesign);
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
      return [];
    }
  };

  useEffect(() => {
    FetchApiDesign();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      UpdateRequirement();
      console.log("Confirmed");
    }
  };

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  const filterItems = (statusCodes, type) => {
    const statusOptions =
      type === "design" ? statusDesignOptions : statusProductOptions;
    const statusLabels = statusCodes.map(
      (statusCode) =>
        statusOptions.find((option) => option.code === statusCode)?.label
    );
    return data.filter((item) => statusLabels.includes(item.status));
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

          {/* Design detail */}
          <h2 className="text-2xl my-2 font-medium">Design Information</h2>
          <div className="ml-5">
            <img
              src={dataDesign.image}
              className="size-32"
              alt="Design Image"
            />
            <p>Weight predict: {dataDesign.weightOfMaterial}</p>
            <p>Name Of Design: {dataDesign.designName}</p>
          </div>

          {/* chi tiết về các loại đá */}
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
                    <p className="text-red-500">
                      Price: {masterGemStone.price}
                    </p>
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
                    <p className="text-red-500">Price: {stone.price}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-52 mt-10 mb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {data.status}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selection}
                label={data.status}
                onChange={handleChange}
              >
                {getStatusOptions(type).map((option) => (
                  <MenuItem key={option.code} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Input Hình */}
          <div className="w-full">
            <div className="font-[sans-serif] max-w-md">
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
              onClick={() => {
                setIsOpenPopup(false);
                handleSubmit();
                UpdateRequirement();
              }}
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