import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import formatVND from "../../utils/FormatCurrency";
import { FetchApiUserBasedRoleInRequirement } from "../../api/Requirements/FetchApiUser";
import useAuth from "../../hooks/useAuth";
import CreateConversationJoin from "../../utils/CreateConversationJoin";
import { FetchSummaryPriceByRequirementId } from "../../api/Requirements/FetchApiRequirement";
import iconStaff from "../../assets/icon/staffIcon.jpg";
function CustomerWaiting({
  title,
  designDetail,
  requirementDetail,
  total,
  status,
}) {
  const { UserId } = useAuth();
  const navigate = useNavigate();
  async function ChatWithStaff(e,staffId){
    e.stopPropagation();
    const conversationIdTarget = await CreateConversationJoin (UserId, staffId); 
    navigate("/chat",{ state: { conversationIdTarget }}) 
  }
  function ShowSummary({requirementDetail}){
    const [getSummary, setSummary] = useState({});
        const [isLoading, setIsLoading] = useState(true);
        const callSummary = async (requirementId)=>{
          const response = await FetchSummaryPriceByRequirementId(requirementId);
          setSummary(response);
          setIsLoading(false);
        }
        useEffect(()=>{
          callSummary(requirementDetail.requirementId);
          
        },[]);
        console.log(getSummary);
        if(isLoading){
          return <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
        }
    return <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
    {designDetail.masterGemstone != null ? (
      <div className="flex justify-between py-2 border-b border-gray-300">
        <p>Master Gemstone</p>
        <p>{formatVND(getSummary.masterGemStonePriceAtMomentAnon)}</p>
      </div>
    ) : null}
    {designDetail.stone != null ? (
      <div className="flex justify-between py-2 border-b border-gray-300">
        <p>Melee Stones</p>
        <p>{formatVND(getSummary.stonePriceAtMomentAnon)}</p>
      </div>
    ) : null}
    <div className="flex justify-between py-2 border-b border-gray-300 ">
      <p>Material</p>
      <p>
        {formatVND(
         getSummary.materialPriceAtMomentAnon
        )}
      </p>
    </div>
    <div className="flex justify-between py-2 border-b border-gray-300 ">
      <p>Machining Fee</p>
      <p>{formatVND(getSummary.machiningFeeAnon)}</p>
    </div>
    <div className="flex justify-between py-2 border-b border-gray-300">
      <p className="text-[20px]">Total</p>
      <p className="text-[20px]">{formatVND(getSummary.totalMoneyAnon)}</p>
    </div>
  </div>;
  }
  function ShowElementBasedStatus({ status, designDetail, requirementDetail }) {
    switch (status) {
      case "-3":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Summary:
            </h3>
              <ShowSummary requirementDetail={requirementDetail}/>
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
            <ShowSummary requirementDetail={requirementDetail}/>
            
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
                      onClick={(e) => {ChatWithStaff(e, getSaleStaff.usersId)
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
                        : iconStaff
                    }
                    className="w-[150px] rounded-full"
                    alt="image of staff"
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
