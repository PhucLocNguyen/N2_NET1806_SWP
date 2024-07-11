import { useEffect, useState } from "react";
import { createContext } from "react";
import { fetchApiDesignById } from "../../../api/FetchApiDesign";
import { FetchApiDesignRuleById } from "../../../api/Requirements/FetchApiDesignRule";
import { PostApiDesign } from "../../../api/Requirements/PostApiDesign";
import { PostApiRequirement } from "../../../api/Requirements/PostRequirement";
import { PostUsersRequirement } from "../../../api/Requirements/PostUsersRequirement";
import useAuth from "../../../hooks/useAuth";

export const multiStepContext = createContext();
export function StepContext({children, designId, animate, scope}) {

    const { UserId, role } = useAuth();

    const [currentStep, setCurrentStep] = useState(1);
    const [designRuleState, setDesignRule] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [requirementData, setRequirementData] = useState({
        designParentId: designId,
        material: 0,
        size: 0,
        masterGemstoneId:0,
        stonesId: 0,
        selectedIndexMastergemstone:0,
        customerNote:"",
    });
    useEffect(()=>{
var target = scope.current.querySelector("#MasterGemstoneContainerFloat");
        if(requirementData.masterGemstoneId==0 || requirementData.masterGemstoneId==null){
            target.style.display="none";
        }else{
            target.style.display="block";
        }
    },[requirementData])
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
            selectedIndexMastergemstone:requirementData.selectedIndexMastergemstone,
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
        const dataToSendRequirement = {
            status: "0",
            size:requirementData.size,
            designId:postDesignChild.designId,
            customerNote:requirementData.customerNote
        }
        const PostRequirementCustomer = await PostApiRequirement(dataToSendRequirement);
        const requirementId = PostRequirementCustomer.requirementId;
        const UserJoinTheRequirement = await PostUsersRequirement(requirementId,UserId);
        console.log(UserJoinTheRequirement);
    }
   useEffect(()=>{
    if(isSubmit){
        SubmitDesignFromCustomer();
    }

   })
    console.log(requirementData);
    return (  <>
    <multiStepContext.Provider value={{currentStep, setCurrentStep, requirementData, setRequirementData, designRuleState, setIsSubmit, animate, scope}}>
        {children}
    </multiStepContext.Provider>
    </>);
}