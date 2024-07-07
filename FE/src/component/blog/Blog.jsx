import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchApiBlogById } from "../../api/blog/FetchApiBlog";

function Blog() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const getBlogById = async (BlogId) => {
    try {
      const response = await FetchApiBlogById(BlogId);

      if (response) {
        setData(response);
      } else {
        console.error("Failed to fetch blog:", response);
      }
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getBlogById(id);
    }
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Container */}
      <div className="w-full h-3/4 bg-[#fbfbfb] my-10">
        <div className="flex items-center justify-center border-b-[1px] border-[#e1e1e1] w-full h-[130px]">
          <h1 className="text-3xl font-light">{data.title}</h1>
        </div>
        {/* content */}
        <div className="place-items-center px-[400px] mt-12">
          {/* content Blog */}
          <div>
            {/* Description blog */}
            <div className="relative shadow-xl pb-14">
              <img
                className="w-full max-h-[600px] object-cover"
                src={data.image}
                alt={data.title}
              />
              
              <p className="px-6 text-[#9d9d9d] mt-6">{data.description}</p>
              
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
