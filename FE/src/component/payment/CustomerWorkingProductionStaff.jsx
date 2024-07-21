import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { useState } from "react";
import { FetchApiUserBasedRoleInRequirement } from "../../api/Requirements/FetchApiUser";
import useAuth from "../../hooks/useAuth";
import iconStaff from "../../assets/icon/staffIcon.jpg";
function CustomerWorkingProductionStaff({ title, requirementDetail, status }) {
  const { UserId } = useAuth();

  if (status == "8") {
    return (
      <div className="col-span-2 flex flex-col justify-center items-center">
        <div className="min-h-[350px] w-[500px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="border px-6 py-6">
            <div className="text-center mb-2">
              <WatchLaterIcon color="warning" sx={{ fontSize: "36px" }} />
            </div>
            <h3 className="text-center text-lg">
              Please wait for Production staff will take your order to work.
            </h3>
          </div>
        </div>
      </div>
    );
  } else {
    const [productionStaff, setProductionStaff] = useState({});
    async function loadProductionStaffDetail(requirementDetail) {
      const roleIdDesign = 4;
      const getProductionStaff = await FetchApiUserBasedRoleInRequirement(
        roleIdDesign,
        requirementDetail.requirementId
      );
      if (getProductionStaff != null) {
        setProductionStaff(getProductionStaff);
      }
    }
    useEffect(() => {
      loadProductionStaffDetail(requirementDetail);
    }, []);
    return (
      <div className="col-span-2 flex flex-col justify-center items-center">
        <div className="min-h-[350px] w-[500px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="border px-6 py-6 mb-6">
            <div className="text-center mb-2">
              <WatchLaterIcon color="warning" sx={{ fontSize: "36px" }} />
            </div>
            <h3 className="text-center text-lg">
              Please wait for Production staff will make the product based on
              your requirement
            </h3>
          </div>
         
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="text-[24px]"
            >
             <h3 className="text-2xl font-semibold text-gray-700 mb-3 mr-6">
            Production staff information
          </h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex items-center gap-4">
                <img
                  src={
                    productionStaff.image != null
                      ? productionStaff.image
                      : iconStaff
                  }
                  className="w-[150px] rounded-full"
                  alt="Image of production staff"
                />
                <div>
                  <h4 className="text-[20px]">
                    Production staff name: {productionStaff.name}
                  </h4>
                  <h4>Email: {productionStaff.email}</h4>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default CustomerWorkingProductionStaff;
