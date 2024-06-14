import { useEffect, useState } from "react";
import { createContext } from "react";
import { fetchApiDesignById } from "../../../api/FetchApiDesign";
import { FetchApiDesignRuleById } from "../../../api/Requirements/FetchApiDesignRule";
import { PostApiDesign } from "../../../api/Requirements/PostApiDesign";
import { PostApiRequirement } from "../../../api/Requirements/PostRequirement";

export const multiStepContext = createContext();
export function StepContext({children, designId}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [designRuleState, setDesignRule] = useState({});
    const [requirementData, setRequirementData] = useState({
        designParentId: designId,
        material: 0,
        size: 0,
        masterGemstoneId:0,
        stonesId: 0,
        customerNote:"",
    });
    useEffect(()=>{
        // dang bi loi khong thay doi duoc type ò jewellryid truoc khi chay ham thu 2
        const reachingData = async ()=>{
        var typeOfJewellryId = 0;
        
          let dataDesignId = await fetchApiDesignById(designId);
          var {masterGemstone,material,stone,typeOfJewellery,...root}= dataDesignId;
          var typeOfJewelleryGet = typeOfJewellery.typeOfJewelleryId;
          var objectData = {designParentId: root.designId,
            material: material!=null? material.materialId : null,
            size: 0,
            masterGemstoneId:masterGemstone!=null? masterGemstone.masterGemstoneId : null,
            stonesId: stone!=null? stone.stonesId : null,
            customerNote: requirementData.customerNote,};

            setRequirementData(objectData);
                
                let designRuleById = await FetchApiDesignRuleById(typeOfJewelleryGet );
                
            setDesignRule({MinSizeMasterGemstone:designRuleById.minSizeMasterGemstone,	MaxSizeMasterGemstone:designRuleById.maxSizeMasterGemstone,	MinSizeJewellery:designRuleById.minSizeJewellery,	MaxSizeJewellery:designRuleById.maxSizeJewellery,});
    
}
    reachingData();
      },[])
      console.log(designRuleState);
    async function SubmitDesignFromCustomer(){
        const dataToSubmit = {
            parentId:requirementData.designParentId,
            stonesId: requirementData.stonesId,
            masterGemstoneId: requirementData.masterGemstoneId,
            materialId: requirementData.material};

            const postDesignChild = await PostApiDesign(dataToSubmit);
            console.log(postDesignChild);
            // {
            //     "designId": 20,
            //     "parentId": 1,
            //     "designName": "Ban thiet ke nhan van",
            //     "image": "https://miro.medium.com/v2/resize:fit:1400/0*ClQ5m7NiTxNPatgf.jpg",
            //     "description": "Day la mo ta cho ban thiet ke nhan van",
            //     "weightOfMaterial": 150,
            //     "stonesId": 7,
            //     "masterGemstoneId": 17,
            //     "managerId": null,
            //     "materialId": 7,
            //     "typeOfJewelleryId": 1,
            //     "manager": null,
            //     "masterGemstone": null,
            //     "material": null,
            //     "requirements": [],
            //     "stone": null,
            //     "typeOfJewellery": null
            // }
            
            //Data post requirement
            // {
            //     "status": "open",
            //     "size": "20",
            //     "designId":20,
            //     "customerNote": "abc",
            //   }
        const dataToSendRequirement = {
            status: "1",
            size:requirementData.size,
            designId:postDesignChild.designId,
            customerNote:requirementData.customerNote
        }
        const PostRequirementCustomer = await PostApiRequirement(dataToSendRequirement);
        console.log(PostRequirementCustomer);
    }
   
    console.log(requirementData);
    return (  <>
    <multiStepContext.Provider value={{currentStep, setCurrentStep, requirementData, setRequirementData, SubmitDesignFromCustomer, designRuleState}}>
        {children}
    </multiStepContext.Provider>
    </>);
}