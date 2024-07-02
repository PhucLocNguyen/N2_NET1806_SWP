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
} from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import PaymentSection from "../payment/PaymentSection";
import useAuth from "../../hooks/useAuth";
import PageError from "../pageerror/PageError";

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const OrderDetail = () => {
  const [show3DDesign, setShow3DDesign] = useState(false);
  const [masterGemStone, setMasterGemStone] = useState(null);
  const [stone, setStone] = useState(null);
  const [data, setData] = useState({});
  const [dataDesign, setDataDesign] = useState({});
  const { id } = useParams();
  const {UserId} = useAuth();
    const [toggle,setToggle] = useState(false);
    const [valid, setValid] = useState(false);
  const getRequirementById = async (requirementId, UserId) => {
    try {
      const response = await FetchApiRequirementByIdSecure(requirementId, UserId);
      if(response!=null){
        setValid(true);
        setData(response);
      }else{
        setValid(false);
      }
    } catch (error) {
      console.error("Failed to fetch requirement:", error);
    }
  };
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/my-order/"
    >
      My Order
    </Link>,
    <Typography key="3" color="text.primary">
      Requirement #{id}
    </Typography>,
  ];
  useEffect(() => {
    if(id)
      getRequirementById(id, UserId);
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
  const totalMoney =
    (data.materialPriceAtMoment || 0) +
    (data.stonePriceAtMoment || 0) +
    (data.machiningFee || 0);
  function ChangeToggle(){
    setToggle(!toggle);
  }
  if(valid){

    return (
      <div>
        <div className="w-3/5 mx-auto mt-3">
        <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
        </div>
  {!toggle?<div className="flex justify-center mt-4">
        <div className="w-3/5" style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" gutterBottom>
              Requirement Details
            </Typography> 
            <Button variant="contained" disabled={data.status>=0&&data.status<3} sx={{marginLeft:"10px"}} onClick={ChangeToggle}>Track order</Button>
            
          </div>
          <span className="pb-3">Tracking order will allow after sale staff contact with you</span>
          <Grid container spacing={3} className="mb-4">
            {Object.entries(data)
              .filter(
                ([key]) =>
                  key !== "design3D" &&
                  key !== "materialPriceAtMoment" &&
                  key !== "stonePriceAtMoment" &&
                  key !== "machiningFee"
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
  
          <Typography variant="h6" gutterBottom>
            Pricing Details
          </Typography>
          <TableContainer component={Paper} className="mb-4">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Material Price at Moment</strong>
                  </TableCell>
                  <TableCell>{data.materialPriceAtMoment}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Stone Price at Moment</strong>
                  </TableCell>
                  <TableCell>{data.stonePriceAtMoment}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Machining Fee</strong>
                  </TableCell>
                  <TableCell>{data.machiningFee}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Total Money</strong>
                  </TableCell>
                  <TableCell>{totalMoney}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
  
          <div className="flex flex-row flex-wrap mb-4">
            <div className="flex-1 flex flex-col items-center bg-blue-100 rounded-lg p-2 mb-2">
              <Typography variant="h6" gutterBottom>
                Master Gemstone
              </Typography>
              {masterGemStone?.image && (
                <img
                  src={masterGemStone.image}
                  alt={masterGemStone.kind}
                  className="w-full h-auto max-w-md"
                  style={{ maxWidth: "250px" }}
                />
              )}
              <TableContainer component={Paper} className="mt-2">
                <Table>
                  <TableBody>
                    {masterGemStone &&
                      Object.entries(masterGemStone)
                        .filter(([key]) => key !== "image")
                        .map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell>
                              <strong>
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
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
                  className="w-full h-auto max-w-md"
                  style={{ maxWidth: "250px" }}
                />
              )}
              <TableContainer component={Paper} className="mt-2">
                <Table>
                  <TableBody>
                    {dataDesign.material &&
                      Object.entries(dataDesign.material)
                        .filter(([key]) => key !== "image")
                        .map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell>
                              <strong>
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
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
                Stone
              </Typography>
              <TableContainer component={Paper} className="mt-2">
                <Table>
                  <TableBody>
                    {stone &&
                      Object.entries(stone).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell>
                            <strong>
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
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
      </div>:<div>
          <PaymentSection requirementDetail={data} ChangeToggle={ChangeToggle}/>
         </div>}
      
   
      </div>
    );
  } else{
    return <PageError/>
  }
};

export default OrderDetail;