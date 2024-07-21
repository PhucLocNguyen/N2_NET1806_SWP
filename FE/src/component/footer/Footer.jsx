import React from "react";
import Logocard from "../../assets/footer/Logocard.webp";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import CallIcon from "@mui/icons-material/Call";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ForumIcon from '@mui/icons-material/Forum';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';

function Footer() {
  return (
    <div className="flex flex-col">
      {/* Main content */}

      {/* Footer starts */}
      <div className="bg-[#fdf9f2] h-[100px] w-full flex justify-around items-center">
        <div className="w-fit flex items-center">
          <AssuredWorkloadIcon />
          <span className="font-light text-xl ml-2">No Incur Fee</span>
        </div>
        <div className="w-fit flex items-center">
          <MonetizationOnIcon />
          <span className="font-light text-xl ml-2">Money Back Guarantee</span>
        </div>
        <div className="w-fit flex items-center">
          <ForumIcon />
          <span className="font-light text-xl ml-2">24/7 Support</span>
        </div>
        <div className="w-fit flex items-center">
          <WorkspacePremiumIcon />
          <span className="font-light text-xl ml-2">High Quality</span>
        </div>
      </div>

      <footer className="bg-black w-full">
        <div className="flex justify-around pt-12 pb-9">
          {/* Elements */}
          <div>
            <h3 className="text-[#C6AD8A] mb-2">MY ACCOUNT</h3>
            <ul className="list-disc text-[#C6AD8A] mt-3">
              {['My account', 'Cart', 'Checkout', 'Maintenance Mode', 'Register Now'].map((item, index) => (
                <li key={index} className="ml-5 mt-6 w-fit text-sm text-[#a3a3a3] hover:text-white hover:underline duration-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#C6AD8A] mb-2">Information</h3>
            <ul className="list-disc text-[#C6AD8A] mt-2">
              {['About Us', 'Our Blog', 'Contact', 'Term & Condition', 'Refund and Returns Policy'].map((item, index) => (
                <li key={index} className="ml-5 mt-6 w-fit text-sm text-[#a3a3a3] hover:text-white hover:underline duration-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#C6AD8A] mb-2">Our Contacts</h3>
            <ul className="text-[#C6AD8A] mt-2">
              <li className="mt-4 w-fit text-sm text-[#d6cece] flex items-center">
                <EditLocationIcon fontSize="small" className="mr-2 text-[#C6AD8A]" />
                283 N. Glenwood Street, Levittown, NY 11756
              </li>
              <li className="mt-4 w-fit text-sm text-[#d6cece] flex items-center">
                <CallIcon fontSize="small" className="mr-2 text-[#C6AD8A]" />
                712-339-9294
              </li>
              <li className="mt-4 w-fit text-sm text-[#d6cece] flex items-center">
                <AlarmOnIcon fontSize="small" className="mr-2 text-[#C6AD8A]" />
                Mon - Fri: 10:00 - 18:00
              </li>
              <li className="mt-4 w-fit text-sm text-[#d6cece] flex items-center">
                <EmailIcon fontSize="small" className="mr-2 text-[#C6AD8A]" />
                info@goldish-jew.com
              </li>
            </ul>
            <div className="flex w-full mt-4">
              {[FacebookIcon, InstagramIcon, XIcon].map((IconComponent, index) => (
                <div key={index} className="relative mr-3 border-[#4f4e4e] border-[1px] w-12 h-12 rounded-full">
                  <IconComponent
                    fontSize="small"
                    className="absolute bottom-[13px] ml-[14px] text-white hover:text-[#C6AD8A] duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex px-9 justify-between items-center w-full border-t border-[#2b2b2b]">
          <div>
            <p className="text-[#5c5757] py-5">
              2021 Goldish Theme. All rights reserved.
            </p>
          </div>
          <div className="w-40 py-5">
            <img className="w-fit" src={Logocard} alt="Logo" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
  