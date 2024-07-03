import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FetchApiRequirementById } from "../../api/Requirements/FetchApiRequirement";
import { fetchApiDesignById } from "../../api/FetchApiDesign";
import { PutApiRequirementByStatus } from "../../api/Requirements/PutApiRequirement";
import { PostUsersRequirement } from "../../api/Requirements/PostUsersRequirement.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuth from "../../hooks/useAuth.jsx";

function TodoPopup({ setIsOpenPopup, handleStatusChange, requirementId }) {
  const [data, setData] = useState(null);
  const [dataDesign, setDataDesign] = useState(null);
  const [masterGemStone, setMasterGemStone] = useState(null);
  const [stone, setStone] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [type, setType] = useState("");
  const { role, UserId } = useAuth();

  useEffect(() => {
    if (role === "DesignStaff") {
      setType("design");
      setStatusUpdate("6");
    } else if (role === "ProductStaff") {
      setType("product");
      setStatusUpdate("9");
    }
  }, [role]);

  const getDesign = async (designId) => {
    try {
      const response = await fetchApiDesignById(designId);
      setDataDesign(response);
      if (response.masterGemstone) {
        setMasterGemStone(response.masterGemstone);
      }
      if (response.stone) {
        setStone(response.stone);
      }
    } catch (error) {
      console.error("Error fetching design:", error);
    }
  };

  const getRequirement = async () => {
    try {
      const response = await FetchApiRequirementById(requirementId);
      setData(response);
      if (response.designId) {
        await getDesign(response.designId);
      }
    } catch (error) {
      console.error("Error fetching requirement:", error);
    }
  };

  useEffect(() => {
    getRequirement();
  }, [requirementId]);

  const UpdateRequirement = async (requirementId, updateData) => {
    try {
      const response = await PutApiRequirementByStatus(
        requirementId,
        updateData
      );

      return response;
    } catch (error) {
      console.error("Error updating requirement:", error);
      return false;
    }
  };

  const postUserRequirement = async (requirementId, userId) => {
    try {
      const response = await PostUsersRequirement(requirementId, userId);
      return response;
    } catch (error) {
      console.error("Error updating requirement:", error);
      return false;
    }
  };

  const handleAccept = async () => {
    try {
      const updateSuccess = await UpdateRequirement(requirementId, {
        ...data,
        status: statusUpdate,
      });

      const postSuccess = await postUserRequirement(requirementId,UserId);

      if (updateSuccess && postSuccess) {
        handleStatusChange(requirementId, statusUpdate);
        setIsOpenPopup(false);
      } else {
      }
    } catch (error) {
      console.error("Error during handleAccept:", error);
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
        className="bg-white w-[45rem] rounded-[10px] h-[600px] overflow-y-auto p-5 shadow-lg"
      >
        {data ? (
          <div>
            <h2 className="text-2xl font-medium mb-4 text-gray-800">
              Requirement Details
            </h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700">
                General Information
              </h3>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Requirement ID:</strong>{" "}
                  <span className="text-blue-500">R00{data.requirementId}</span>
                </p>
                <p>
                  <strong>Expected Delivery:</strong>{" "}
                  <span className="text-green-500">
                    {data.expectedDelivery}
                  </span>
                </p>
                <p>
                  <strong>Size:</strong>{" "}
                  <span className="text-purple-500">{data.size}</span>
                </p>
              </div>
            </div>
            {dataDesign && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">
                  Design Details
                </h3>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 lg:pl-8">
                    <img
                      src={dataDesign.image}
                      alt={dataDesign.designName}
                      className="w-full h-auto mb-4 rounded-lg lg:mb-0"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "300px",
                      }}
                    />
                  </div>
                  <div className="lg:w-2/3">
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Design Name:</strong>{" "}
                        <span className="text-blue-500">
                          {dataDesign.designName}
                        </span>
                      </p>
                      <p>{dataDesign.description}</p>
                    </div>
                  </div>
                </div>
                {masterGemStone && (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="masterGemstone-content"
                      id="masterGemstone-header"
                    >
                      <Typography variant="subtitle1" className="text-gray-800">
                        Master Gemstone
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ flex: "1 1 auto" }}>
                          <Typography>
                            <strong>Kind:</strong>{" "}
                            <span className="text-pink-500">
                              {masterGemStone.kind}
                            </span>
                            <br />
                            <strong>Size:</strong>{" "}
                            <span className="text-pink-500">
                              {masterGemStone.size}
                            </span>
                            <br />
                            <strong>Price:</strong>{" "}
                            <span className="text-pink-500">
                              ${masterGemStone.price}
                            </span>
                            <br />
                            <strong>Clarity:</strong>{" "}
                            <span className="text-pink-500">
                              {masterGemStone.clarity}
                            </span>
                            <br />
                            <strong>Cut:</strong>{" "}
                            <span className="text-pink-500">
                              {masterGemStone.cut}
                            </span>
                            <br />
                            <strong>Weight:</strong>{" "}
                            <span className="text-pink-500">
                              {masterGemStone.weight}g
                            </span>
                          </Typography>
                        </div>
                        <div style={{ flex: "0 0 auto", marginLeft: "20px" }}>
                          <img
                            src={masterGemStone.image}
                            alt={`${masterGemStone.kind} - ${masterGemStone.shape}`}
                            className="w-auto h-auto rounded-lg object-cover"
                            style={{
                              maxWidth: "200px",
                              maxHeight: "300px",
                            }}
                          />
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )}
                {stone && (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="stone-content"
                      id="stone-header"
                    >
                      <Typography variant="subtitle1" className="text-gray-800">
                        Stones
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-sm text-gray-600">
                        <strong>Kind:</strong>{" "}
                        <span className="text-pink-500">{stone.kind}</span>
                        <br />
                        <strong>Size:</strong>{" "}
                        <span className="text-pink-500">{stone.size}</span>
                        <br />
                        <strong>Quantity:</strong>{" "}
                        <span className="text-pink-500">{stone.quantity}</span>
                        <br />
                        <strong>Price:</strong>{" "}
                        <span className="text-pink-500">${stone.price}</span>
                        <br />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                )}
                {type === "product" && (
                  <div className="mt-6">
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>3D Design </strong>{" "}
                        <img
                          src={data.design3D}
                          className="w-[600px] object-cover h-[300px] mx-auto"
                          alt="3D Design"
                        />
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Accept
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default TodoPopup;
