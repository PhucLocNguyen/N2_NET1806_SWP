import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import Logout from "../../utils/Logout";
function Navbar() {
  const { role, UserId } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md h-fit min-h-[130px] max-h-[200px]">
        <div className="w-full py-[4px] bg-[#C6AD8A]">
          <p className="text-center text-black text-xs">
            YOUR HAPPINESS, OUR RESPONSIBILITY
          </p>
        </div>
        <section className="h-[85px] mx-auto w-full">
          <p className="block bg-white text-black w-full text-3xl text-center py-2">
            Jewelry Production FPT
          </p>
          <nav className="flex justify-between bg-white text-black w-full">
            <div className="px-10 py-2 flex w-full items-center justify-center">
              <div className="flex justify-center w-full text-3xl font-bold text-black">
                <ul className="flex px-4 font-semibold font-heading gap-20">
                  <li>
                    <Link
                      to="/"
                      className="font-normal text-2xl hover:text-[#C6AD8A] hover:duration-200"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="relative group">
                      <Link
                        to="/design"
                        className="font-normal text-2xl hover:text-[#C6AD8A] hover:duration-200"
                      >
                        Category
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="font-normal text-2xl hover:text-[#C6AD8A] hover:duration-200"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/warranty"
                      className="font-normal text-2xl hover:text-[#C6AD8A] hover:duration-200"
                    >
                      Warranty
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="absolute right-24 flex items-center space-x-4">
                {UserId ? (
                  <div className="group inline-block">
                    <PermIdentityIcon className="hover:text-[#f0cd8c] ml-4 scale-125" />
                    <div className="relative border-[1px] border-black rounded-sm group-hover:block hidden w-fit h-fit bg-white">
                      <ul className="absolute left-[-40px] border-[1px] border-black rounded-sm group-hover:block hidden w-fit h-fit bg-white hover:flex hover:flex-col">
                        <li className="w-28">

                          <Link to='/customer-profile' className="block box-border text-black hover:text-[#f0cd8c] hover:bg-[#706f6e] hover:cursor-pointer p-2 duration-100">
                            My Account
                          </Link>

                          <p
                            className="block box-border text-black hover:text-[#f0cd8c] hover:bg-[#706f6e] hover:cursor-pointer p-2 duration-100"
                            onClick={() => {
                              navigate(Logout(role), { replace: true });
                            }}
                          >
                            Log Out
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link to="/login">
                    <div className=" group inline-block">
                      <PermIdentityIcon className="hover:text-[#f0cd8c] ml-4 scale-125" />
                      <div className="relative border-[1px] border-black rounded-sm group-hover:block hidden w-fit h-fit bg-white">
                        <ul className="absolute left-[-40px] border-[1px] border-black rounded-sm group-hover:block hidden w-fit h-fit bg-white hover:flex hover:flex-col">
                          <li className="w-28">
                            <p className="block box-border text-black hover:text-[#f0cd8c] hover:bg-[#706f6e] hover:cursor-pointer p-2 duration-100">
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
          </nav>
        </section>
      </div>
      <div className="pt-[8rem]"></div>
    </div>
  );
}

export default Navbar;