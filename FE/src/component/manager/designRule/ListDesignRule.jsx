import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";

import DesignRuleRow from "./DesignRuleRow";
import UpdateDesignRule from "./UpdateDesignRule";
import { FetchDesignRule } from "../../../api/designRule/FetchDesignRule";

function ListDesignRule() {
  const pageSize = 6;

  const [designRule, setDesignRule] = useState([]);
  const [search, setSearch] = useState("");

  // Update
  const [isOpenUpdatePopup, setIsOpenUpdatePopup] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();

  // Search
  const [searchPage, setSearchPage] = useState(1);

  // Pagination
  const [dataSize, setDataSize] = useState(0);
  const [page, setPage] = useState(1);

  const getDesignRule = async (page, search = "") => {
    const response = await FetchDesignRule({ pageSize, page });
    if (search) {
      const filteredData = response.filter((item) => {
        return (
          String(item.designRuleId).toLowerCase().includes(search.toLowerCase()) ||
          String(item.minSizeMasterGemstone).toLowerCase().includes(search.toLowerCase()) ||
          String(item.maxSizeMasterGemstone).toLowerCase().includes(search.toLowerCase()) ||
          String(item.minSizeJewellery).toLowerCase().includes(search.toLowerCase()) ||
          String(item.maxSizeJewellery).toLowerCase().includes(search.toLowerCase()) ||
          String(item?.typeOfJewellery?.name).toLowerCase().includes(search.toLowerCase())
        );
      });
      const paginatedData = filteredData.slice(
        (searchPage - 1) * pageSize,
        searchPage * pageSize
      );
      setDesignRule(paginatedData);
      setDataSize(filteredData.length);
    } else {
      setDesignRule(response);
      setDataSize(response.length);
    }
  };

  useEffect(() => {
    if (search) {
      setSearchPage(1);
      getDesignRule(1, search);
    } else {
      getDesignRule(page);
    }
  }, [search, searchPage, page, isOpenUpdatePopup]);

  useEffect(() => {
    if (search) {
      getDesignRule(searchPage, search);
    } else {
      getDesignRule(page);
    }
  }, [search, searchPage, isOpenUpdatePopup]);

  const handleChange = (event, value) => {
    if (search === "") {
      setPage(value);
    } else {
      setSearchPage(value);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchPage(1);
  };

  return (
    <>
      <div className="min-h-[100vh] py-[3rem] px-[3rem] bg-[#f7f9fc]">
        <div className="w-[100%] min-h-[600px]">
          <div className="rounded-[30px] border-[1px] border-solid border-[#e9eaf3] bg-[white]">
            <div className="py-[1.75rem] px-[2.25rem] flex items-center justify-between">
              <div className="flex items-center ">
                <h2 className="mr-5 font-bold text-[1.5rem] leading-[1.125em]">
                  All Design Rule
                </h2>
                <TextField
                  onChange={handleSearchChange}
                  value={search}
                  id="outlined-basic"
                  placeholder="Search..."
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "30px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            {/* Header row */}
            <div className="bg-[#f7f9fc] grid grid-cols-8 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3]">
              <div className="flex items-center">
                <h2 className="mx-6 text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  DesignRuleId
                </h2>
              </div>
              <div className="flex items-center">
                <h2 className="mx-6 text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  Type Of Jewelry
                </h2>
              </div>
              <div className="flex items-center">
                <h2 className="mx-6 text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  Min Size MasterGemstone
                </h2>
              </div>
              <div className="flex items-center">
                <h2 className="mx-6 text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  Max Size MasterGemstone
                </h2>
              </div>
              <div className="flex items-center">
                <h2 className="mx-6 text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  Min Size Jewellery
                </h2>
              </div>
              <div className="flex items-center">
                <h2 className="mx-6 text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  Max Size Jewellery
                </h2>
              </div>
            </div>

            {designRule?.map((item, index) => (
              <DesignRuleRow
                key={index}
                data={item}
                setIsOpenUpdatePopup={setIsOpenUpdatePopup}
                setItemUpdate={setItemUpdate}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Stack>
            <Pagination
              count={Math.ceil(dataSize / pageSize) || 0}
              page={search === "" ? page : searchPage}
              onChange={handleChange}
            />
          </Stack>
        </div>
      </div>

      {isOpenUpdatePopup && (
        <UpdateDesignRule
          setIsOpenUpdatePopup={setIsOpenUpdatePopup}
          data={itemUpdate}
        />
      )}
    </>
  );
}

export default ListDesignRule;
