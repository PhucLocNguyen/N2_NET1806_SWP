import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import formatVND from "../../utils/FormatCurrency";
import { FetchApiUserBasedRoleInRequirement } from "../../api/Requirements/FetchApiUser";
import useAuth from "../../hooks/useAuth";
function CustomerWaiting({
  title,
  designDetail,
  requirementDetail,
  total,
  status,
}) {
  const { UserId } = useAuth();

  function ShowElementBasedStatus({ status, designDetail, requirementDetail }) {
    switch (status) {
      case "-3":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Summary:
            </h3>
            <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
              {designDetail.masterGemstone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Master Gemstone</p>
                  <p>{formatVND(designDetail.masterGemstone?.price)}</p>
                </div>
              ) : null}
              {designDetail.stone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Melee Stones</p>
                  <p>{formatVND(designDetail.stone?.price)}</p>
                </div>
              ) : null}
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Material</p>
                <p>
                  {formatVND(
                    designDetail.material?.price *
                      requirementDetail.weightOfMaterial
                  )}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Machining Fee</p>
                <p>{formatVND(requirementDetail.machiningFee)}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <p className="text-[20px]">Total</p>
                <p className="text-[20px]">{formatVND(Math.ceil(total))}</p>
              </div>
            </div>
          </div>
        );
      case "-2": {
        const [getSaleStaff, setSaleStaff] = useState({});

        async function loadSaleStaffDetail(requirementDetail) {
          const roleIdDesign = 5;
          const getSaleDetail = await FetchApiUserBasedRoleInRequirement(
            roleIdDesign,
            requirementDetail.requirementId
          );
          if (getSaleDetail != null) {
            setSaleStaff(getSaleDetail);
          }
        }
        useEffect(() => {
          loadSaleStaffDetail(requirementDetail);
        }, []);
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Summary:
            </h3>
            <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
              {designDetail.masterGemstone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Master Gemstone</p>
                  <p>{formatVND(designDetail.masterGemstone?.price)}</p>
                </div>
              ) : null}
              {designDetail.stone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Melee Stones</p>
                  <p>{formatVND(designDetail.stone?.price)}</p>
                </div>
              ) : null}
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Material</p>
                <p>
                  {formatVND(
                    designDetail.material?.price *
                      requirementDetail.weightOfMaterial
                  )}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Machining Fee</p>
                <p>{formatVND(requirementDetail.machiningFee)}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <p className="text-[20px]">Total</p>
                <p className="text-[20px]">{formatVND(Math.ceil(total))}</p>
              </div>
            </div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-[24px]"
              >
                <h3 className="text-2xl font-semibold text-gray-700 mb-3 mr-6">
                  Sale staff information
                </h3>
                <Typography sx={{ color: "text.secondary" }}>
                  <Link to="/chat">
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation();
                        CreateConversationJoin(UserId, getSaleStaff.usersId);
                        navigate("/chat", { replace: false });
                      }}
                    >
                      Chat
                    </Button>
                  </Link>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      getSaleStaff.image != null
                        ? getSaleStaff.image
                        : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719273600&semt=ais_user"
                    }
                    className="w-[150px] rounded-full"
                    alt=""
                  />
                  <div>
                    <h4 className="text-[20px]">
                      Sale staff name: {getSaleStaff.name}
                    </h4>
                    <h4>Email: {getSaleStaff.email}</h4>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      }
    }
  }
  return (
    <div className="col-span-2 flex flex-col justify-center items-center">
      <div className="min-h-[350px] w-[500px]">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <ShowElementBasedStatus
          requirementDetail={requirementDetail}
          designDetail={designDetail}
          status={status}
        />
        <div className="border px-6 py-6">
          <div className="text-center mb-2">
            <WatchLaterIcon color="warning" sx={{ fontSize: "36px" }} />
          </div>
          <h3 className="text-center text-lg">
            {status != -7 && status != -2
              ? "Please wait for manager to quote the price again"
              : status == -2
              ? "Please discuss to sale staff"
              : "Please wait for design staff to redraw the sketch again"}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CustomerWaiting;
