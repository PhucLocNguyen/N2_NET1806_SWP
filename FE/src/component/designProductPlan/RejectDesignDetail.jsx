import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import ApiRequirementById from "../../api/manager/FetchApiRequirementById";
import { fetchApiDesignById } from "../../api/FetchApiDesign";
import ApiUpdateRequirement from "../../api/manager/ApiUpdateRequirement";
import DeleteImage from "../../utils/DeleteImage.jsx";
import UploadImage from "../../utils/UploadImage.jsx";

function RejectDesignDetail() {
  const folder = "Design3D";
  const navigate = useNavigate();
  const { id } = useParams(); // requirement id
  const [requirement, setRequirement] = useState();
  const [design, setDesign] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  // Thong tin form de dang len
  const fetchData = async () => {
    const requirementRespone = await ApiRequirementById(id);
    setRequirement(requirementRespone);

    const dataDesignId = requirementRespone?.designId;

    const designRespone = await fetchApiDesignById(dataDesignId);
    setDesign(designRespone);
  };
 
  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = async (event) => {
    const selectFile = event.target.files[0];
    if (selectFile) {
      const fileType = selectFile.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!validImageTypes.includes(fileType)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF).');
        return;
    }
      try {
        if (requirement.design3D !== "" && requirement.design3D != null) {
          await DeleteImage(requirement.design3D);
        }

        let urlImage = await UploadImage(folder, selectFile);
        if (urlImage) {
          setSelectedFile(urlImage);
        } else {
          console.error("Upload returned undefined URL.");
        }
      } catch (error) {
        console.error("Error during file upload: ", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (handleFileChange) {
      const data = {
        ...requirement,
        status: "7",
        design3D: selectedFile,
      };
      const CallApi = async () => {
        const response = await ApiUpdateRequirement({ data, id });
      };
      await CallApi();
      navigate("/staff/reject-design", { replace: true });
    }
  };

  return (
    <>
      {requirement?.status == -7 ? (
        <div className="py-[3rem] px-[3rem] min-h-[100vh] bg-[#f7f9fc]">
          <div className="grid grid-cols-3 gap-x-[1.5rem]">
            {/* Ben trai */}
            <div className="col-span-2 ">
              <div className="py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]">
                <div>
                  <h2 className="text-[32px] font-bold ">Order #{id}</h2>

                  <Chip
                    label="Remake Design3D"
                    color="warning"
                    variant="outlined"
                    sx={{ fontWeight: 700 }}
                  />
                </div>

                <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

                <div>
                  <h2 className="text-[22px] mb-[1rem] font-bold leading-[1.273em]">
                    {design?.designName}
                  </h2>
                  <div className="flex ">
                    <img className="w-[15rem] h-[15rem]" src={design?.image} />
                    <p className="ml-[1rem] text-[#6f7182]">
                      {design?.description}
                    </p>
                  </div>
                </div>

                <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

                <div>
                  <h2 className="text-[32px] mb-[1rem] font-bold leading-[1.273em]">
                    Customer Requirement
                  </h2>

                  {/* Bang thong tin tong the */}
                  <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">
                    General Information
                  </h2>
                  <table className="table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]">
                    <thead className="bg-[#eccc68] border-[1px] border-solid border-[#000]">
                      <tr>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Jewelry Type
                        </th>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Jewelry Size
                        </th>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Jewelry Material
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {design?.typeOfJewellery?.name}
                        </td>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {requirement?.size}
                        </td>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {design?.material?.name}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="my-[1rem]"></div>

                  {/* Bang thong tin cho hat chu */}
                  <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">
                    Master Gemstone
                  </h2>
                  <table className="table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]">
                    <thead className="bg-[#eccc68] border-[1px] border-solid border-[#000]">
                      <tr>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Kind
                        </th>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Size
                        </th>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Weight
                        </th>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Shape
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {design?.masterGemstone?.kind}
                        </td>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {design?.masterGemstone?.size}
                        </td>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {design?.masterGemstone?.weight}
                        </td>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {design?.masterGemstone?.shape}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="my-[1rem]"></div>

                  {/* Bang thong tin cho hat tam */}
                  <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">
                    Stones
                  </h2>
                  <table className="table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]">
                    <thead className="bg-[#eccc68] border-[1px] border-solid border-[#000]">
                      <tr>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Kind
                        </th>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Size
                        </th>
                        <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {design?.stone?.kind}
                        </td>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {design?.stone?.size}
                        </td>
                        <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                          {design?.stone?.quantity}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Note cua customer */}
              <div className=" my-[1.5rem] py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]">
                <h2 className="text-[22px] mb-[1rem] font-bold leading-[1.273em]">
                  Customer Note
                </h2>
                <p className="text-[#6f7182]">{requirement?.customerNote}</p>
              </div>

              {/* Note cua sell staff */}
              <div className="py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]">
                <h2 className="text-[22px] mb-[1rem] font-bold leading-[1.273em]">
                  Sell Staff Note
                </h2>
                <p className="text-[#6f7182]">{requirement?.staffNote}</p>
              </div>
            </div>

            {/* Ben phai */}
            <div className="sticky top-[24px]  py-[2.5rem] px-[2rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]">

              <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography sx={{ fontWeight: "bold" }}>Design3D</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex justify-center">
                    <img
                      className="object-cover h-60 w-60"
                      src={requirement?.design3D}
                      alt="Design3D"
                    />
                  </div>
                  <div className="w-full">
                    <div className="font-[sans-serif]">
                      <label className="text-base text-gray-500 font-semibold mb-2 block">
                        Upload New file
                      </label>
                      <input
                        type="file"
                        className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

              {/* Form dien khoi luong va tien cong */}

              <div className="mt-[1rem]">
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedFile}
                  variant="contained"
                  sx={{ minWidth: "6rem" }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default RejectDesignDetail;
