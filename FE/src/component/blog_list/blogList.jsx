import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import bannerPic from "../../assets/blogList/bannerPic-2022.jpg";
import { FetchApiBlog } from "../../api/blog/FetchApiBlog";
import BoxContent from "./BoxContent";
import "./BlogList.css";

export default function BlogList() {
  const pageSize = 6;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [dataSize, setDataSize] = useState(0);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await FetchApiBlog({ pageSize, page });
        setData(response);
        setDataSize(response.totalCount);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };

    fetchApi();
  }, [page]);

  return (
    <>
      <div className="pt-[132px]">
        {/* Banner Picture */}
        <div className="relative w-full h-60 overflow-hidden min-h-fit">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0000004f] z-10 opacity-0 animate-fade-in-up">
            <div className="flex flex-col justify-center items-center h-full text-center">
              <h1 className="text-xl text-white">JEWELLERY BLOG</h1>
              <p className="text-white">
                Articles by Australian designer Simone Walsh
              </p>
            </div>
          </div>
          <img
            src={bannerPic}
            className="absolute top-0 left-0 w-full h-full object-cover object-center scale-110 opacity-0 animate-zoom-in"
            style={{
              objectPosition: "51.6277% 55.0512%",
            }}
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-10 mx-96">
          {data.map((item, index) => (
            <BoxContent key={index} data={item} />
          ))}
        </div>

        <div className="flex justify-center items-center">
          <Stack>
            <Pagination
              count={dataSize ? Math.ceil(dataSize / pageSize) : 0}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
