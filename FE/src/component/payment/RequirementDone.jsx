import formatVND from "../../utils/FormatCurrency";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FetchApiUserBasedRoleInRequirement } from "../../api/Requirements/FetchApiUser";
import CreateConversationJoin from "../../utils/CreateConversationJoin";
import { FetchPaymentApiByRequirementId } from "../../api/payment/PaymentApi";
import FormatDate from "../../utils/FormatDate";
import { ApiGetWarrantyByRequirementId } from "../../api/warranty/ApiChangeWarranty";
import useAuth from "../../hooks/useAuth";
function RequirementDone({
  title,
  designDetail,
  requirementDetail,
  total,
  status,
}) {
  const [deisgnStaff, setDesignStaff] = useState({});
  const [productionStaff, setProductionStaff] = useState({});
  const [saleStaff, setSaleStaff] = useState({});
  const [transaction, setTransaction] = useState([]);
  const [warrantyCard, setWarrantyCard] = useState([]);
  const {UserId} = useAuth();
  const navigate = useNavigate();
  async function ChatWithStaff(e,staffId){
    e.stopPropagation();
    const conversationIdTarget = await CreateConversationJoin(UserId, staffId); 
    navigate("/chat",{ state: { conversationIdTarget }}) 
  }
  async function loadDataStaff(requirementId) {
    const getDesignStaff = await FetchApiUserBasedRoleInRequirement(
      3,
      requirementId
    );
    setDesignStaff(getDesignStaff);
    const getProductionStaff = await FetchApiUserBasedRoleInRequirement(
      4,
      requirementId
    );
    setProductionStaff(getProductionStaff);
    const getSaleStaff = await FetchApiUserBasedRoleInRequirement(
      5,
      requirementId
    );
    setSaleStaff(getSaleStaff);

    const getTransaction = await FetchPaymentApiByRequirementId(requirementId);
    setTransaction(getTransaction);
    const getWarranty = await ApiGetWarrantyByRequirementId(requirementId);
    setWarrantyCard(getWarranty);
  }
  useEffect(() => {
    loadDataStaff(requirementDetail.requirementId);
  }, []);
  return (
    <div className="col-span-2 flex flex-col justify-center items-center">
      <div className="min-h-[350px] w-[500px]">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="flex justify-center mb-6">
          <img
            src={requirementDetail.design3D}
            alt={
              "image last product of requirement #" +
              requirementDetail.requirementId
            }
            className="w-full h-[300px] object-contain"
          />
        </div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="text-[24px]"
          >
            <Typography
              variant="h3"
              sx={{ width: "33%", flexShrink: 0, fontSize: "20px" }}
            >
              Summary
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                <p className="text-[20px]">
                  {formatVND(Math.ceil(requirementDetail.totalMoney))}
                </p>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="text-[24px]"
          >
            <Typography
              variant="h3"
              sx={{ width: "100%", flexShrink: 0, fontSize: "20px" }}
            >
              Transaction history
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="bg-gray-200 p-4 rounded-lg w-full px-3 ">
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p className="w-1/4">Payment Id</p>
                <p className="w-1/4">Transaction date</p>
                <p className="w-1/4">Amount</p>
                <p className="w-1/4">Status</p>
              </div>
              {transaction.map((current, index) => {
                return (
                  <div
                    key={current.paymentId + "transaction"}
                    className="flex justify-between py-2 border-b border-gray-300 "
                  >
                    <p className="w-1/4">#{current.paymentId}</p>
                    <p className="w-1/4">{FormatDate(current.completedAt)}</p>
                    <p className="w-1/4">{formatVND(current.amount)}</p>
                    <p className="w-1/4">{current.status}</p>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="text-[24px]"
          >
            <Typography
              variant="h3"
              sx={{ width: "100%", flexShrink: 0, fontSize: "20px" }}
            >
              Warranty card
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="bg-gray-200 p-4 rounded-lg w-full px-3 ">
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p className="w-1/3">Name</p>
                <p className="w-1/3">Effective date</p>
                <p className="w-1/3">Expired date</p>
              </div>
              {warrantyCard.map((current, index) => {
                return (
                  <div
                    key={current.warrantyCardId + " Warranty"}
                    className="flex justify-between py-2 border-b border-gray-300 "
                  >
                    <p className="w-1/3">{current.warrantyCard?.title}</p>
                    <p className="w-1/3">{FormatDate(current.dateCreated)}</p>
                    <p className="w-1/3">
                      {FormatDate(current.expirationDate)}
                    </p>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-6">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="text-[24px]"
          >
            <Typography
              variant="h3"
              sx={{ width: "100%", flexShrink: 0, fontSize: "20px" }}
            >
              Worked with staff
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {saleStaff !== null ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="text-[24px]"
                >
                  <Typography
                    variant="h3"
                    sx={{ width: "33%", flexShrink: 0, fontSize: "20px" }}
                  >
                    Sale staff
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    
                      <Button
                        variant="contained"
                        onClick={(e) => {ChatWithStaff(e, saleStaff.usersId)
                        }}
                      >
                        Chat with sale staff
                      </Button>
                    
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        saleStaff.image != null
                          ? saleStaff.image
                          : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719273600&semt=ais_user"
                      }
                      className="w-[150px] rounded-full"
                      alt="Sale staff image"
                    />
                    <div>
                      <h4 className="text-[20px]">
                        Sale staff name: {saleStaff.name}
                      </h4>
                      <h4>Email: {saleStaff.email}</h4>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ) : null}

            {deisgnStaff !== null ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="text-[24px]"
                >
                  <Typography
                    variant="h3"
                    sx={{ width: "33%", flexShrink: 0, fontSize: "20px" }}
                  >
                    Design staff
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                   
                      <Button
                        variant="contained"
                        onClick={(e) => {ChatWithStaff(e,deisgnStaff.usersId);
                          
                        }}
                      >
                        Chat with design staff
                      </Button>
                    
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        deisgnStaff.image != null
                          ? deisgnStaff.image
                          : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719273600&semt=ais_user"
                      }
                      className="w-[150px] rounded-full"
                      alt="Sale staff image"
                    />
                    <div>
                      <h4 className="text-[20px]">
                        Design staff name: {deisgnStaff.name}
                      </h4>
                      <h4>Email: {deisgnStaff.email}</h4>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ) : null}

            {deisgnStaff !== null ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="text-[24px]"
                >
                  <Typography
                    variant="h3"
                    sx={{ width: "33%", flexShrink: 0, fontSize: "20px" }}
                  >
                    Production staff
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                   
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          ChatWithStaff(e,productionStaff.usersId);
                        }}
                      >
                        Chat with Production staff
                      </Button>
                 
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        productionStaff.image != null
                          ? productionStaff.image
                          : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719273600&semt=ais_user"
                      }
                      className="w-[150px] rounded-full"
                      alt="production staff image"
                    />
                    <div>
                      <h4 className="text-[20px]">
                        Sale staff name: {productionStaff.name}
                      </h4>
                      <h4>Email: {productionStaff.email}</h4>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default RequirementDone;
