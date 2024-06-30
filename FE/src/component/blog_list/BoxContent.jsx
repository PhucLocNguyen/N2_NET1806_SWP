import React from "react";
import { Link } from "react-router-dom";

const BoxContent = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-between mt-10">
      <div className="mb-4">
        <div className="h-[175px] overflow-hidden">
          <img
            src={data.image}
            alt={data.title}
            style={{
              transition: "transform 8s cubic-bezier(.25,.46,.45,.94)",
            }}
            className="object-cover min-w-full h-full hover:origin-center hover:scale-125 delay-[7000ms]"
          />
        </div>
        <p className="my-3 min-h-12">{data.title}</p>
        <p className="my-3 text-sm line-clamp-4 text-justify mr-3">
          {data.description}
        </p>
        <Link
          to={`/Blog/${data.blogId}`}
          state={{ data }}
          className="underline text-sm mt-4 cursor-pointer"
        >
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default BoxContent;
