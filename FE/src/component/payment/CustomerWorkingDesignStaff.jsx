import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CreateConversationJoin from "../../utils/CreateConversationJoin";
import { useEffect } from "react";
import { useState } from "react";
import { FetchApiUserBasedRoleInRequirement } from "../../api/Requirements/FetchApiUser";
import useAuth from "../../hooks/useAuth";
function CustomerWorkingDesignStaff({ title, requirementDetail, status }) {
  const { UserId } = useAuth();
  if (status == "5") {
    return (
      <div className="col-span-2 flex flex-col justify-center items-center">
        <div className="min-h-[350px] w-[500px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="border px-6 py-6">
            <div className="text-center mb-2">
              <WatchLaterIcon color="warning" sx={{ fontSize: "36px" }} />
            </div>
            <h3 className="text-center text-lg">
              Please wait for design staff take your order to working
            </h3>
          </div>
        </div>
      </div>
    );
  } else {
    const [designer, setDesigner] = useState({});
    async function loadDesignerDetail(requirementDetail) {
      const roleIdDesign = 3;
      const getCustomerByRequirement = await FetchApiUserBasedRoleInRequirement(
        roleIdDesign,
        requirementDetail.requirementId
      );
      if (getCustomerByRequirement != null) {
        setDesigner(getCustomerByRequirement);
      }
    }
    useEffect(() => {
      loadDesignerDetail(requirementDetail);
    }, []);
    return (
      <div className="col-span-2 flex flex-col justify-center items-center">
        <div className="min-h-[350px] w-[500px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="border px-6 py-6">
            <div className="text-center mb-2">
              <WatchLaterIcon color="warning" sx={{ fontSize: "36px" }} />
            </div>
            <h3 className="text-center text-lg">
              Please wait for design staff to draw the design based on your
              requirement
            </h3>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Designer information:
          </h3>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="text-[24px]"
            >
              <Typography
                variant="h3"
                sx={{ width: "33%", flexShrink: 0, fontSize: "24px" }}
              >
                Designer details
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                <Link to="/chat">
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      CreateConversationJoin(UserId, designer.usersId);
                    }}
                  >
                    Chat with design staff
                  </Button>
                </Link>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex items-center gap-4">
                <img
                  src={
                    designer.image != null
                      ? designer.image
                      : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719273600&semt=ais_user"
                  }
                  className="w-[150px] rounded-full"
                  alt=""
                />
                <div>
                  <h4 className="text-[20px]">
                    Designer name: {designer.name}
                  </h4>
                  <h4>Email: {designer.email}</h4>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default CustomerWorkingDesignStaff;
