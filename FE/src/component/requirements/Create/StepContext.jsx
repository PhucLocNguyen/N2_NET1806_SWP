import { useState } from "react";
import { createContext } from "react";

export const multiStepContext = createContext();
export function StepContext({children}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [requirementData, setRequirementData] = useState({
        designParentId: 1,
        material: null,
        size: 0,
        MasterGemStone: {
            material: null,
            shape: null,
            size: null,
          },
          Stones: {
            quantity: null,
            size: null,
          },
        customerNote:null,
    });
    const [finalData, setFinalData] = useState([]);
    console.log(requirementData);
    return (  <>
    <multiStepContext.Provider value={{currentStep, setCurrentStep, requirementData, setRequirementData, finalData, setFinalData}}>
        {children}
    </multiStepContext.Provider>
    </>);
}