import { Button } from "@mui/material";
import {motion} from "framer-motion"
import { useEffect, useState } from "react";
import { FetchApiDesignById } from "../../api/Requirements/FetchApiDesign";
import { PostUsersRequirement } from "../../api/Requirements/PostUsersRequirement";
import { PutApiRequirement } from "../../api/Requirements/PutApiRequirement";
import useAuth from "../../hooks/useAuth";
function PopupOpenOrder({data, handleDataUpdate, statusOptions}) {
    console.log(data);
    const [designDetail, setDesignDetail]= useState({});
    const {UserId} = useAuth();
    async function loadDesignDetail(designId){
        const getDesignById = await FetchApiDesignById(designId);
        setDesignDetail(getDesignById);
    }
    useEffect(()=>{
        loadDesignDetail(data.designId);
    },[])
    async function acceptOrder(){
        const joinRequirement = await PostUsersRequirement(data.requirementId,UserId);
        if(joinRequirement==200 || joinRequirement==201){
            const dataToSubmit = {...data, status:"1"};
            const updateStatusRequirement = await PutApiRequirement(dataToSubmit,"Receive order success !","Failed to receive the order");
            handleDataUpdate();
        }
    }
    return (  

<motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#fff] w-[45rem] rounded-[10px] h-max py-3"
      >
        <h2 className="text-[36px] text-center border-b mb-3">Requirement detail</h2>

        <div className="h-[600px] overflow-y-auto">
        <h4 className="mt-4 mb-4 text-lg font-medium px-2 h-fit w-fit rounded ">
             <span className="text-lg bg-blue-600 text-white rounded-full ml-2 py-1 px-2">{statusOptions[Number(data.status)].label}</span> 
          </h4>
        <div className="px-2">
            <h3 className="text-[24px] text-[#000] mb-3">Design: {designDetail.designName}</h3>
        <div className="px-3 grid grid-cols-2 gap-2 mb-3 border">
            <div className="">
            <img src={designDetail.image} className="h-[250px] object-cover rounded-[5px]" alt="" />
            </div>
            <div className="">
                <h4 className="text-[24px]">Information:</h4>
                <ul className="list-disc px-6">
                    <li>Size: {data.size}</li>
                    <li>Type of jewelry: {designDetail.typeOfJewellery?.name}</li>
                    <li>Material: {designDetail.material?.name}</li>
                </ul>
            </div>
            {designDetail.masterGemstone!=null&& <>
                
            <div className="">
                <h4 className="text-[24px]">Master Gemstone:</h4>
                <ul className="list-disc px-6">
                <li>kind: {designDetail.masterGemstone?.kind}</li>
                    <li>Size: {designDetail.masterGemstone?.size}</li>
                    <li>Shape: {designDetail.masterGemstone?.shape}</li>
                </ul>
            </div>
            <div className="">
            <img src={designDetail.masterGemstone?.image} className="h-[250px] object-cover rounded-[5px]" alt="" />
            </div>
        </>}
        {designDetail.stone!=null&& <>
                
                <div className="col-span-2 py-3">
                    <h4 className="text-[24px]">Melee stones:</h4>
                    <ul className="list-disc px-6">
                     <li>Kind: {designDetail.stone?.kind}</li>
                        <li>Size: {designDetail.stone?.size}</li>
                        <li>Quantity: {designDetail.stone?.quantity}</li>
                    </ul>
                </div>
            </>}
            <div className="col-span-2 py-3">
                    <h4 className="text-[24px] mb-3">Customer note:</h4>
                    <p className="px-3 border py-1">{data.customerNote}</p>
                </div>
        </div>
        

        </div>
        </div>
        <div className="px-3 flex justify-center">
        <Button variant="outlined" className="w-full" onClick={(e)=>{e.stopPropagation();
        acceptOrder();
        }} >Accept this order</Button>
        </div>
      </motion.div>
   );
}

export default PopupOpenOrder;