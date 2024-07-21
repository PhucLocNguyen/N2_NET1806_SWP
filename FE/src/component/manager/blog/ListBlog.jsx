import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";

import BlogRow from "./BlogRow";
import BlogPopup from "./BlogPopup";
import UpdateBlog from "./UpdateBlog";
import { FetchApiBlog } from "../../../api/blog/FetchApiBlog";

function ListBlog() {
  const pageSize = 6;

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [blog, setBlog] = useState([]);
  const [search, setSearch] = useState("");

  //Update
  const [isOpenUpdatePopup, setIsOpenUpdatePopup] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();

  //Delete
  const [isDelete, setIsDelete] = useState(false);

  // Search
  const [searchPage, setSearchPage] = useState(1);

  // Pagination
  const [dataSize, setDataSize] = useState(0);
  const [page, setPage] = useState(1);

  const fetchApiBlog = async () => {
    const respone = await FetchApiBlog({ pageSize, page });
    setBlog(respone);
  };

  const fetchApiTotal = async () => {
    const respone = await FetchApiBlog({});
    setDataSize(respone?.length);
    return respone;
  };

  useEffect(() => {
    if (search === "") {
      fetchApiBlog();
    }
    fetchApiTotal();
    // console.log('Call again')
  }, [isOpenPopup, page, isOpenUpdatePopup, isDelete]);

  // Dung cho pagination
  useEffect(() => {
    let data = [];
    if (search === "") {
      setPage(1);
      fetchApiBlog();
    }
    let gemPagination = async () => {
      data = await fetchApiTotal();
      console.log(data);

      const filteredData = data.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.image.toString().toLowerCase().includes(search.toLowerCase()) ||
          item?.manager?.username.toLowerCase().includes(search.toLowerCase())
      );
      const paginatedData = filteredData.slice(
        (searchPage - 1) * pageSize,
        searchPage * pageSize
      );

      setBlog(paginatedData);
      setDataSize(filteredData?.length);
    };

    gemPagination();
  }, [search, searchPage, isOpenUpdatePopup, isDelete]);

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

  // console.log('>>> Log item update : ', itemUpdate)

  return (
    <>
      <div className="min-h-[100vh] py-[3rem] px-[3rem] bg-[#f7f9fc]">
        <div className="w-[100%] min-h-[600px]">
          <div className="rounded-[30px] border-[1px] border-solid border-[#e9eaf3] bg-[white]">
            <div className="py-[1.75rem] px-[2.25rem] flex items-center justify-between">
              <div className="flex items-center ">
                <h2 className="mr-5 font-bold text-[1.5rem] leading-[1.125em]">
                  All Blog
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
              <Button
                onClick={() => setIsOpenPopup(true)}
                startIcon={<AddIcon />}
                variant="contained"
              >
                New Blog
              </Button>
            </div>

            {/* Header row */}
            <div className="bg-gray-100 grid grid-cols-8 gap-x-20 py-4 px-16 border-t border-solid border-gray-300">
              <div className="flex items-center col-span-2">
                <h2 className="text-base font-medium tracking-wide leading-snug">
                  Title
                </h2>
              </div>
              <div className="flex items-center col-span-3">
                <h2 className="text-base font-medium tracking-wide leading-snug">
                  Description
                </h2>
              </div>
              <div className="flex items-center col-span-1">
                <h2 className="text-base font-medium tracking-wide leading-snug">
                  Image
                </h2>
              </div>
              <div className="flex items-center col-span-1">
                <h2 className="text-base font-medium tracking-wide leading-snug">
                  Manager
                </h2>
              </div>
            </div>

            {blog?.map((item, index) => (
              <BlogRow
                key={index}
                data={item}
                setIsOpenUpdatePopup={setIsOpenUpdatePopup}
                setItemUpdate={setItemUpdate}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Stack>
            <Pagination
              count={Math.ceil(dataSize / 6) || 0}
              page={search === "" ? page : searchPage}
              onChange={handleChange}
            />
          </Stack>
        </div>
      </div>

      {isOpenPopup && <BlogPopup setIsOpenPopup={setIsOpenPopup} />}
      {isOpenUpdatePopup && (
        <UpdateBlog
          setIsOpenUpdatePopup={setIsOpenUpdatePopup}
          data={itemUpdate}
        />
      )}
    </>
  );
}

export default ListBlog;
