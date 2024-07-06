import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchApiDesignById } from "../../api/FetchApiDesign";
import { FetchApiRequirementByIdSecure } from "../../api/Requirements/FetchApiRequirement";
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PaymentSection from "../payment/PaymentSection";
import useAuth from "../../hooks/useAuth";
import PageError from "../pageerror/PageError";
import { getStatusCustomerByCode, getStatusClass } from "./OrderCustomer";
import { PutApiRequirement } from "../../api/Requirements/PutApiRequirement";

const OrderDetail = () => {
  const [show3DDesign, setShow3DDesign] = useState(false);
  const [masterGemStone, setMasterGemStone] = useState(null);
  const [stone, setStone] = useState(null);
  const [data, setData] = useState({});
  const [dataDesign, setDataDesign] = useState({});
  const { id } = useParams();
  const { UserId } = useAuth();
  const [toggle, setToggle] = useState(false);
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState(0);
  const [statusLabel, setStatusLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [isChange,setIsChange] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseUpdate = ()=>{
    setOpen(false);
    CancelOrder(data);
    setIsChange(!isChange);

  }
  const CancelOrder=async(data)=>{
    const actionUpdate = await PutApiRequirement({...data,status:"-1"},"Cancel order completed", "Failed to cancel the order");
    setStatus("-1");
  }
  useEffect(()=>{
    getRequirementById(id,UserId);
  },[isChange])
  const getRequirementById = async (requirementId, UserId) => {
    try {
      const response = await FetchApiRequirementByIdSecure(
        requirementId,
        UserId
      );
      if (response != null) {
        setValid(true);
        setData(response);
        setStatus(response.status);
        setStatusLabel(getStatusCustomerByCode(response.status));
      } else {
        setValid(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch requirement:", error);
    }
  };
  const statusClass = getStatusClass(statusLabel);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/my-order/">
      My Order
    </Link>,
    <Typography key="3" color="text.primary">
      Requirement #{id}
    </Typography>,
  ];
  useEffect(() => {
    if (id) getRequirementById(id, UserId);
  }, [id]);

  const handleToggle3DDesign = () => {
    setShow3DDesign(!show3DDesign);
  };

  const getDesign = async (designId) => {
    try {
      const response = await fetchApiDesignById(designId);
      console.log("Fetched design response:", response);
      setDataDesign(response);
      if (response.masterGemstone) {
        setMasterGemStone(response.masterGemstone);
      }
      if (response.stone) {
        setStone(response.stone);
      }
    } catch (error) {
      console.error("Failed to fetch design:", error);
    }
  };

  useEffect(() => {
    if (data.designId) {
      console.log("Fetching design for designId:", data.designId);
      getDesign(data.designId);
    }
  }, [data.designId]);

  console.log("dataDesign:", dataDesign);
  console.log("masterGemStone:", masterGemStone);
  console.log("stone:", stone);

  // Calculate total money

  function ChangeToggle() {
    setToggle(!toggle);
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }
  if (valid) {
    return (
      <div>
        <div className="w-3/5 mx-auto mt-6 mb-4">
          <Stack spacing={2}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </div>
        {!toggle ? (
          <div className="flex justify-center mt-4">
            <div className="w-3/5" style={{ position: "relative" }}>
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="justify-between mb-6 items-center content-center"
              >
                <div className="flex flex-col">
                  <Typography variant="h5" gutterBottom>
                    Requirement Details
                  </Typography>

                  <span
                    className={
                      `py-0.5 shadow-lg text-sm text-center rounded-full ` +
                      statusClass
                    }
                  >
                    {statusLabel}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="flex gap-3">
                  <Button
                      variant="outlined"
                      color="error"
                      onClick={handleClickOpen}
                      disabled={!(data.status>=0&&data.status<=4)}
                    >
                      Cancel order
                    </Button>
                    <Button
                      variant="contained"
                      disabled={data.status >= 0 && data.status < 3}
                      sx={{ width: "fit-content" }}
                      onClick={ChangeToggle}
                    >
                      Track order
                    </Button>

                    
                  </div>
                  {!(data.status >= 0 && data.status < 3) ? (
                    <span className="pb-3">
                      Tracking order will allow after sale staff contact with
                      you
                    </span>
                  ) : null}
                </div>
              </div>
              <Grid container spacing={3} className="mb-4">
                {Object.entries(data)
                  .filter(
                    ([key]) =>
                      key !== "design3D" &&
                      key !== "materialPriceAtMoment" &&
                      key !== "stonePriceAtMoment" &&
                      key !== "machiningFee" &&
                      key !== "status" &&
                      key !== "masterGemStonePriceAtMoment" &&
                      key !== "designId"
                  ) // Remove design3D and price details from display
                  .map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={key}>
                      <Typography variant="body1">
                        <strong>
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          :
                        </strong>{" "}
                        {value}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>

              <div className="flex flex-row flex-wrap mt-6 mb-4">
                <div className="flex-1 flex flex-col items-center bg-blue-100 rounded-lg p-2 mb-2">
                  <Typography variant="h6" gutterBottom>
                    Master Gemstone
                  </Typography>
                  {masterGemStone?.image && (
                    <img
                      src={masterGemStone.image}
                      alt={masterGemStone.kind}
                      className="w-full max-w-md h-[300px] object-contain"
                      style={{ maxWidth: "250px" }}
                    />
                  )}
                  <TableContainer component={Paper} className="mt-2">
                    <Table>
                      <TableBody>
                        {masterGemStone &&
                          Object.entries(masterGemStone)
                            .filter(
                              ([key]) =>
                                key !== "image" && key !== "masterGemstoneId"
                            )
                            .map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell>
                                  <strong>
                                    {key
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (str) =>
                                        str.toUpperCase()
                                      )}
                                  </strong>
                                </TableCell>
                                <TableCell>{value}</TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>

                <div className="flex-1 flex flex-col items-center bg-yellow-100 rounded-lg p-2 mb-2 mx-2">
                  <Typography variant="h6" gutterBottom>
                    Material
                  </Typography>
                  {dataDesign?.material?.image && (
                    <img
                      src={dataDesign.material.image}
                      alt={dataDesign.material.name}
                      className="w-full max-w-md h-[300px] object-contain"
                      style={{ maxWidth: "250px" }}
                    />
                  )}
                  <TableContainer component={Paper} className="mt-2">
                    <Table>
                      <TableBody>
                        {dataDesign.material &&
                          Object.entries(dataDesign.material)
                            .filter(([key]) => key !== "image" && key !== 'materialId')
                            .map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell>
                                  <strong>
                                    {key
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (str) =>
                                        str.toUpperCase()
                                      )}
                                  </strong>
                                </TableCell>
                                <TableCell>{value}</TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>

                <div className="flex-1 flex flex-col items-center bg-green-100 rounded-lg p-2 mb-2">
                  <Typography variant="h6" gutterBottom>
                    Melee Stones
                  </Typography>
                  <TableContainer component={Paper} className="mt-2">
                    <Table>
                      <TableBody>
                        {stone &&
                          Object.entries(stone)
                            .filter(([key]) => key !== "stonesId")
                            .map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell>
                                  <strong>
                                    {key
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (str) =>
                                        str.toUpperCase()
                                      )}
                                  </strong>
                                </TableCell>
                                <TableCell>{value}</TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>

              {show3DDesign && (
                <div
                  className="mt-2"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "20%",
                    maxWidth: "250px",
                    cursor: "pointer",
                  }}
                  onClick={handleToggle3DDesign}
                >
                  <img
                    src={data.design3D}
                    alt="3D Design"
                    className="w-full h-auto max-w-3xl"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <PaymentSection
              requirementDetail={data}
              ChangeToggle={ChangeToggle}
              status={status}
              setStatus={setStatus}
            />
          </div>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Cancel this order?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                After clicking the Agree button, the order will be cancel and you can't restore.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleCloseUpdate} color="error" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return <PageError />;
  }
};

export default OrderDetail;
