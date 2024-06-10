import EditLocationIcon from "@mui/icons-material/EditLocation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { SvgIcon } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="h-[111px]">
        <header className="fixed top-0 w-full z-50">
          <nav className="flex h-20 border-b-[1px] border-black bg-white px-12 pt-[30px] pb-[5rem] justify-between">
            {/* Left header */}
            <div className="w-1/4">
              <div>
                <span className="font-normal text-sm">
                  <EditLocationIcon
                    style={{ fontSize: "1.1rem", marginRight: "0.4rem" }}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M69.7641 0.25V13.7115H74.8294C76.2019 13.7115 77.4077 13.4359 78.4468 12.8846C79.4858 12.3205 80.2939 11.5385 80.8712 10.5385C81.4612 9.52564 81.7563 8.33974 81.7563 6.98077C81.7563 5.62179 81.4612 4.44231 80.8712 3.44231C80.2939 2.42949 79.4858 1.64744 78.4468 1.09615C77.4077 0.532051 76.2019 0.25 74.8294 0.25H69.7641ZM74.7717 11.5769H72.0923V2.38461H74.7717C75.4387 2.38461 76.0544 2.48077 76.6188 2.67308C77.1833 2.86539 77.6707 3.15385 78.0812 3.53846C78.5045 3.92308 78.8316 4.40385 79.0625 4.98077C79.3062 5.55769 79.4281 6.22436 79.4281 6.98077C79.4281 7.73718 79.3062 8.40384 79.0625 8.98077C78.8316 9.55769 78.5045 10.0385 78.0812 10.4231C77.6707 10.7949 77.1833 11.0833 76.6188 11.2885C76.0544 11.4808 75.4387 11.5769 74.7717 11.5769Z"
                    fill="#181818"
                  />
                  <path
                    d="M93.5805 13.7115V0.25H95.8895V13.7115H93.5805Z"
                    fill="#181818"
                  />
                  <path
                    d="M109.097 9.36538L107.403 10.5577C107.698 11.1731 108.096 11.7436 108.596 12.2692C109.109 12.7949 109.699 13.2179 110.366 13.5385C111.046 13.8462 111.777 14 112.56 14C113.137 14 113.689 13.9038 114.215 13.7115C114.753 13.5321 115.235 13.2756 115.658 12.9423C116.081 12.5962 116.415 12.1731 116.658 11.6731C116.915 11.1731 117.043 10.609 117.043 9.98077C117.043 9.39102 116.941 8.8782 116.735 8.44231C116.53 7.99359 116.261 7.60897 115.927 7.28846C115.607 6.96795 115.241 6.69872 114.83 6.48077C114.433 6.26282 114.029 6.08333 113.618 5.94231C112.9 5.6859 112.316 5.4359 111.867 5.19231C111.418 4.94872 111.085 4.69231 110.867 4.42308C110.661 4.14103 110.559 3.82692 110.559 3.48077C110.559 3.09615 110.706 2.76282 111.001 2.48077C111.296 2.1859 111.758 2.03846 112.387 2.03846C112.836 2.03846 113.227 2.12821 113.561 2.30769C113.907 2.47436 114.208 2.70513 114.465 3C114.721 3.28205 114.939 3.58974 115.119 3.92308L116.947 2.88462C116.729 2.41026 116.415 1.95513 116.004 1.51923C115.594 1.08333 115.093 0.724359 114.503 0.442308C113.913 0.147436 113.221 0 112.425 0C111.617 0 110.892 0.153846 110.251 0.461539C109.622 0.769231 109.122 1.19872 108.75 1.75C108.378 2.28846 108.192 2.91667 108.192 3.63461C108.192 4.26282 108.314 4.80128 108.558 5.25C108.801 5.6859 109.109 6.05769 109.481 6.36538C109.853 6.66026 110.245 6.91026 110.655 7.11538C111.066 7.30769 111.438 7.46154 111.771 7.57692C112.335 7.78205 112.836 7.99359 113.272 8.21154C113.708 8.41667 114.042 8.67307 114.272 8.98077C114.516 9.27564 114.638 9.66667 114.638 10.1538C114.638 10.6923 114.446 11.1282 114.061 11.4615C113.676 11.7949 113.176 11.9615 112.56 11.9615C112.06 11.9615 111.598 11.8526 111.175 11.6346C110.764 11.4167 110.386 11.1154 110.039 10.7308C109.706 10.3462 109.392 9.89102 109.097 9.36538Z"
                    fill="#181818"
                  />
                  <path
                    d="M130.957 5.44231V0.25H128.686V13.7115H130.957V7.53846H137.73V13.7115H140V0.25H137.73V5.44231H130.957Z"
                    fill="#181818"
                  />
                </svg>
              </SvgIcon>
            </div>
            {/* Navbar */}
            <div className="flex justify-between px-36 mt-4">
              <div className="relative group">
                <NavLink to='/' className="font-normal text-sm hover:text-[#C6AD8A] hover:duration-200">
                  Home
                  <KeyboardArrowUpIcon
                    style={{
                      transition: "transform 0.4s ease",
                    }}
                    className="group-hover:transform group-hover:rotate-180"
                  />
                </NavLink>
                <div className="absolute top-4 left-4 h-6 w-10"></div>
                <div className="absolute top-10 group-hover:block hidden w-[200px] h-[200px] bg-white border-[1px] border-black"></div>
              </div>
              <div className="group">
                <NavLink to='/design' className="font-normal text-sm hover:text-[#C6AD8A] hover:duration-200">
                  Shop
                  <KeyboardArrowUpIcon
                    style={{
                      transition: "transform 0.4s ease",
                    }}
                    className="group-hover:transform group-hover:rotate-180"
                  />
                  0908935565{" "}
                </span>
              </div>
              <div className="group">
                <NavLink to='/blog' className="font-normal text-sm hover:text-[#C6AD8A] hover:duration-200">
                  Blog
                  <KeyboardArrowUpIcon
                    style={{
                      transition: "transform 0.4s ease",
                    }}
                    className="group-hover:transform group-hover:rotate-180"
                  />
                </NavLink>
              </div>
              <div className="group">
                <NavLink to='/about' className="font-normal text-sm hover:text-[#C6AD8A] hover:duration-200">
                  About Us
                  <KeyboardArrowUpIcon
                    style={{
                      transition: "transform 0.4s ease",
                    }}
                    className="group-hover:transform group-hover:rotate-180"
                  />
                </NavLink>
              </div>
            </div>
            {/* right header */}
            <div className="w-1/4 h-full">
              {/* Icon navbar */}
              <div className="flex text-right items-center align-middle">
                {/* <SearchIcon style={{ marginLeft: "1rem", fontSize: "1.4rem" }} /> */}
                <form className="flex w-full">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-3/4 px-2 py-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-[#f0cd8c] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#f0cd8c] dark:focus:border-[#f0cd8c]"
                      placeholder="Search..."
                      required
                    />
                    <button
                      type="submit"
                      className="absolute top-[1px] right-[-4px] text-white bg-[#494949] hover:bg-slate-900  focus:ring-4 focus:outline-none focus:ring-[#f0cd8c] font-medium rounded-lg text-sm px-[10px] py-1 dark:bg-[#f0cd8c] dark:hover:bg-[#f0cd8c] dark:focus:ring-[#f0cd8c]"
                    >
                      Search
                    </button>
                  </div>
                </form>
                <div className="relative group inline-block">
                  <div className="absolute rounded-sm top-8 left-[-1rem] group-hover:block hidden w-fit h-fit bg-white border-[1px] border-[#f0f0f0]">
                    <div className="absolute top-[-10px] left-8 h-5 w-7"></div>
                    <ul className="flex flex-col">
                      <li className="w-36">
                        <a
                          href=""
                          className="block box-border text-left  hover:text-[#f0cd8c] hover:bg-[#706f6e] p-2 duration-100"
                        >
                          Tài khoản của tôi
                        </a>
                      </li>
                      <li className="w-36">
                        <a
                          href=""
                          className="block box-border text-left  hover:text-[#f0cd8c] hover:bg-[#706f6e] p-2 duration-100"
                        >
                          Đơn mua
                        </a>
                      </li>
                      <li className="w-36">
                        <a
                          href=""
                          className="block box-border text-left  hover:text-[#f0cd8c] hover:bg-[#706f6e] p-2 duration-100"
                        >
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </div>
                  <PermIdentityIcon
                    style={{ marginLeft: "1rem", fontSize: "1.4rem" }}
                    className="hover:text-[#f0cd8c]"
                  />
                </div>

                <FavoriteBorderIcon
                  style={{
                    marginLeft: "1rem",
                    marginTop: "3px",
                    fontSize: "1.4rem",
                  }}
                  className="hover:text-[#f0cd8c]"
                />
                <ShoppingBagIcon
                  style={{
                    marginLeft: "1rem",
                    marginTop: "3px",
                    fontSize: "1.4rem",
                  }}
                  className="hover:text-[#f0cd8c]"
                />
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}

export default Navbar;
