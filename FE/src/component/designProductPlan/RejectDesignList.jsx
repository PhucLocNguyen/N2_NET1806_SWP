import { useEffect, useState } from "react";
import ApiListRequirement from "../../api/manager/ListRequirement";
import RowRejectOrder from "./RowRejectOrder";

function RejectDesignList() {
  const status = -7;
  const pageSize = 6;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchApi = async () => {
    const respone = await ApiListRequirement({ pageSize, page, status });
    setData(respone);
  };

  useEffect(() => {
    try {
      fetchApi();
    } catch (error) {
      setData([]);
    }
  }, []);

  console.log(data);

  return (
    <>
      <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 min-h-[100vh]">
        <div className=" flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
          <h1 className="text-2xl font-bold">Order </h1>
        </div>

        <div className="py-[3rem] px-[3rem]">
          <div className="border-[1px] border-solid border-[#e9eaf3] bg-[white] rounded-lg">
            <div className="bg-[#f7f9fc] grid grid-cols-4 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3]">
              <div className="flex items-center">
                <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  Order ID
                </h2>
              </div>
              <div className="flex items-center">
                <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  Customer Name
                </h2>
              </div>
              <div className="flex items-center">
                <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  Order Date
                </h2>
              </div>
              <div className="flex items-center">
                <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">
                  Type
                </h2>
              </div>
            </div>

            {data?.map((item, index) => {
              return <RowRejectOrder key={index} data={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default RejectDesignList;
