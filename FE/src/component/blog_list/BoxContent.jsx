import { px } from "framer-motion";
import picBlog from "../../assets/blogList/bannerPicBlog1-2022.jpg";

const BoxContent = ({data}) => {

  console.log(data)
  return (
    <>
      <div className="flex flex-wrap justify-between mt-10 ">
        {/* blog */}
        <div className="mb-4">
          <div className="h-[175px]  overflow-hidden">
            <img
              src={new URL(data.image, window.location.origin).href}
              style={{
                transition: "transform 8s cubic-bezier(.25,.46,.45,.94)",
              }}
              className="object-cover min-w-full h-full hover:origin-center hover:scale-125 delay-[7000ms]"
            />
          </div>

          <p className="my-3 min-h-12">
            {data.title}
          </p>

          <p className="my-3 text-sm line-clamp-4 text-justify mr-3">
            {data.description}
          </p>

          <a className="underline text-sm mt-4 cursor-pointer" href={data.title}>READ MORE</a>
        </div>
      </div>
    </>
  );
};

export default BoxContent;
