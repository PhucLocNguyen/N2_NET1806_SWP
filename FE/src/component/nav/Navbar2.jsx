import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";

function Navbar() {
  const { role, UserId } = useAuth();

  return (
    <div className="z-10">
      <div className="w-full py-[4px] bg-[#C6AD8A]">
        <p className="text-center text-black text-xs">
          YOUR HAPPINESS, OUR RESPONSIBILITY
        </p>
      </div>
      <section className="fixed h-[85px] mx-auto w-full">
        <nav className="flex justify-between bg-black text-white w-full">
          <div className="px-5 pt-3 pb-4 flex w-full items-center justify-center">
            <div className="relative">
              <div className="w-full text-3xl font-bold text-white mb-4">
                <p className="w-full text-center">Jewelry FPT</p>
              </div>

              <ul className="hidden md:flex px-4 font-semibold font-heading space-x-20">
                <li>
                  <Link
                    to="/"
                    className="font-normal text-xl hover:text-[#C6AD8A] hover:duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <div className="relative group">
                    <Link
                      to="/design"
                      className="font-normal text-xl hover:text-[#C6AD8A] hover:duration-200 flex items-center"
                    >
                      Category
                    </Link>
                  </div>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="font-normal text-xl hover:text-[#C6AD8A] hover:duration-200"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="font-normal text-xl hover:text-[#C6AD8A] hover:duration-200"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>

              <div className="absolute top-2 right-[-700px] flex items-center space-x-4">
                {UserId ? (
                  <div className="relative group inline-block">
                    <PermIdentityIcon
                      style={{ marginLeft: "1rem", fontSize: "1.4rem" }}
                      className="hover:text-[#f0cd8c]"
                    />
                    <div className="absolute rounded-sm top-8 left-[-1rem] group-hover:block hidden w-fit h-fit bg-white border-[1px] border-[#f0f0f0]">
                      <div className="absolute top-[-10px] left-8 h-5 w-7"></div>
                      <ul className="flex flex-col">
                        <li className="w-36">
                          <p className="block box-border text-black hover:text-[#f0cd8c] hover:bg-[#706f6e] p-2 duration-100">
                            My Account
                          </p>
                          <p className="block box-border text-black hover:text-[#f0cd8c] hover:bg-[#706f6e] p-2 duration-100">
                            Log Out
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link to="/signin">
                    <div className="relative group inline-block">
                      <PermIdentityIcon
                        className="hover:text-[#f0cd8c] ml-4 scale-150"
                      />
                      <div className="absolute rounded-sm top-8 left-[-1rem] group-hover:block hidden w-fit h-fit bg-white border-[1px] border-[#f0f0f0]">
                        <div className="absolute top-[-10px] left-8 h-5 w-7"></div>
                        <ul className="flex flex-col">
                          <li className="w-36">
                            <p className="block box-border text-black hover:text-[#f0cd8c] hover:bg-[#706f6e] p-2 duration-100">
                              Log In
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                )}
                <Link to="/my-order">
                  <ShoppingCartIcon className="scale-125 h-6 w-6 hover:text-[#fab52c] transition duration-100" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
}

export default Navbar;
