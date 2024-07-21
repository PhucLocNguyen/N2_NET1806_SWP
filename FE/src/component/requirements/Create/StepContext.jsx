import { CircularProgress } from "@mui/material";
import { useEffect, useState, createContext } from "react";
import { fetchApiDesignById } from "../../../api/FetchApiDesign";
import { FetchApiDesignRuleById } from "../../../api/Requirements/FetchApiDesignRule";
import { PostApiDesign } from "../../../api/Requirements/PostApiDesign";
import { PostApiRequirement } from "../../../api/Requirements/PostRequirement";
import { PostUsersRequirement } from "../../../api/Requirements/PostUsersRequirement";
import useAuth from "../../../hooks/useAuth";

export const multiStepContext = createContext();

export function StepContext({ children, designId, animate, scope }) {
  const { UserId } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [designRuleState, setDesignRule] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [requirementData, setRequirementData] = useState({
    designParentId: designId,
    material: 0,
    size: 0,
    masterGemstoneId: 0,
    stonesId: 0,
    selectedIndexMastergemstone: 0,
    customerNote: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const reachingData = async () => {
      try {
        let dataDesignId = await fetchApiDesignById(designId);
        const { masterGemstone, material, stone, typeOfJewellery, ...root } = dataDesignId;
        const typeOfJewelleryId = typeOfJewellery.typeOfJewelleryId;
        console.log("Root design");
        const newRequirementData = {
          designParentId: root.designId,
          material: material ? material.materialId : null,
          size: 0,
          selectedIndexMastergemstone: requirementData.selectedIndexMastergemstone,
          masterGemstoneId: masterGemstone ? masterGemstone.masterGemstoneId : null,
          stonesId: stone ? stone.stonesId : null,
          customerNote: requirementData.customerNote,
        };
        console.log(newRequirementData);
        setRequirementData(newRequirementData);

        let designRuleById = await FetchApiDesignRuleById(typeOfJewelleryId);
        setDesignRule({
          MinSizeMasterGemstone: designRuleById.minSizeMasterGemstone,
          MaxSizeMasterGemstone: designRuleById.maxSizeMasterGemstone,
          MinSizeJewellery: designRuleById.minSizeJewellery,
          MaxSizeJewellery: designRuleById.maxSizeJewellery,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch design data or design rules", error);
      }
    };

    reachingData();
  }, [designId]);

  useEffect(() => {
    const target = scope.current.querySelector("#MasterGemstoneContainerFloat");
    if (requirementData.masterGemstoneId === 0 || requirementData.masterGemstoneId === null) {
      target.style.display = "none";
    } else {
      target.style.display = "block";
    }
  }, [requirementData, scope]);
console.log(requirementData);
  async function SubmitDesignFromCustomer() {
    try {
      const dataToSubmit = {
        parentId: requirementData.designParentId,
        stonesId: requirementData.stonesId,
        masterGemstoneId: requirementData.masterGemstoneId,
        materialId: requirementData.material,
      };  

      const postDesignChild = await PostApiDesign(dataToSubmit);
      const dataToSendRequirement = {
        status: "0",
        size: requirementData.size,
        designId: postDesignChild.designId,
        customerNote: requirementData.customerNote,
      };
      const PostRequirementCustomer = await PostApiRequirement(dataToSendRequirement);
      const requirementId = PostRequirementCustomer.requirementId;
      const UserJoinTheRequirement = await PostUsersRequirement(requirementId, UserId);
      console.log(UserJoinTheRequirement);
    } catch (error) {
      console.error("Failed to submit design from customer", error);
    }
  }

  useEffect(() => {
    if (isSubmit) {
      SubmitDesignFromCustomer();
    }
  }, [isSubmit]);

  if (isLoading) {
    return <div className="flex justify-center items-center w-full h-full" >
    <CircularProgress />
  </div>; // Or a spinner/loading component
  }

  return (
    <multiStepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        requirementData,
        setRequirementData,
        designRuleState,
        setIsSubmit,
        animate,
        scope,
      }}
    >
      {children}
    </multiStepContext.Provider>
  );
}
