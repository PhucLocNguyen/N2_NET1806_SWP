import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchApiDesignById } from "../../api/FetchApiDesign";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuth from "../../hooks/useAuth.jsx";

const { role } = useAuth();

function DonePopup({ setIsOpenPopup, data }) {
  const [dataDesign, setDataDesign] = useState({});
  const [masterGemStone, setMasterGemStone] = useState(null);
  const [stone, setStone] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    if (role === "DesignStaff") {
      setType("design");
    } else if (role === "ProductStaff") {
      setType("product");
    }
  }, [role]);

  useEffect(() => {
    getDesign(data.designId);
  }, []);

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

  return (
    <div
      onClick={() => setIsOpenPopup(false)}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[45rem] rounded-lg h-[600px] overflow-y-auto p-5 shadow-lg"
      >
        <div className="text-slate-500 mb-5">
          <p className="text-xl font-medium mb-3">
            Requirement ID: R00{data.requirementId}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Status: {data.status}</p>
              <p>Expected Delivery: {data.expectedDelivery}</p>
              <p>Size: {data.size}</p>
              <p>Weight of Material: {data.weightOfMaterial}g</p>
            </div>
          </div>
          <div>
            <p className="mt-2">
              <strong>Customer Note:</strong> <p>{data.customerNote}</p>
            </p>
          </div>
        </div>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" className="text-gray-800">
              Design Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex items-start space-x-4">
              <img
                src={dataDesign.image}
                className="w-32 h-32 object-cover"
                alt="Design"
              />
              <div>
                <p className="mt-2">
                  <strong>Name Of Design:</strong> {dataDesign.designName}
                </p>
                <p>
                  <strong>Staff Note:</strong> {data.staffNote}
                </p>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        {(masterGemStone || stone) && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" className="text-gray-800">
                Stones Detail
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="space-y-4">
                {masterGemStone && (
                  <div className="flex space-x-4">
                    <img
                      src={masterGemStone.image}
                      className="w-24 h-24 rounded-lg object-cover"
                      alt={`${masterGemStone.kind} - ${masterGemStone.shape}`}
                    />
                    <div>
                      <p>
                        <strong>Kind:</strong> {masterGemStone.kind}
                      </p>
                      <p>
                        <strong>Clarity:</strong> {masterGemStone.clarity}
                      </p>
                      <p>
                        <strong>Cut:</strong> {masterGemStone.cut}
                      </p>
                      <p>
                        <strong>Weight:</strong> {masterGemStone.weight}ct
                      </p>
                      <p>
                        <strong>Shape:</strong> {masterGemStone.shape}
                      </p>
                      <p className="text-red-500">
                        <strong>Price:</strong> ${masterGemStone.price}
                      </p>
                    </div>
                  </div>
                )}
                {stone && (
                  <div>
                    <p>
                      <strong>Kind:</strong> {stone.kind}
                    </p>
                    <p>
                      <strong>Size:</strong> {stone.size}mm
                    </p>
                    <p>
                      <strong>Quantity:</strong> {stone.quantity}
                    </p>
                    <p className="text-red-500">
                      <strong>Price:</strong> ${stone.price}
                    </p>
                  </div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        )}

        <div className="text-center mt-5">
          <p className="text-xl font-medium mb-3">
            {type === "design"
              ? "Design3D"
              : type === "product"
              ? "Product Completed"
              : ""}
          </p>
          <img
            src={data.design3D}
            className="w-[600px] object-cover h-[300px] mx-auto"
            alt={
              type === "design"
                ? "Design3D"
                : type === "product"
                ? "Product Completed"
                : ""
            }
          />
        </div>
      </motion.div>
    </div>
  );
}

export default DonePopup;