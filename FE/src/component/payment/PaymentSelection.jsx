import { useContext, useState, useEffect } from "react";
import CustomerCanceled from "./CustomerCanceled";
import CustomerConfirmation from "./CustomerConfirmation";
import CustomerPay from "./CustomerPay";
import CustomerWaiting from "./CustomerWaiting";
import CustomerWorkingDesignStaff from "./CustomerWorkingDesignStaff";
import CustomerWorkingProductionStaff from "./CustomerWorkingProductionStaff";
import RequirementDone from "./RequirementDone";
import { summaryContext } from "./SummaryContext";

function PaymentSelection() {
  const {  requirementDetail, designDetail, status, setStatus } =
    useContext(summaryContext);
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (status) {
      case "-1":
        setTitle("Your order has been canceled")
        break;
      case "-2":
        setTitle("Please contact with sale in chat system");
        break;
      case "-3":
        setTitle("Waiting for the next price quote");
        break;
      case "3":
        setTitle("Confirm the price quote");
        break;
      case "4":
        setTitle("Deposit the order");
        break;
      case "5":
        setTitle("Waiting for design staff receive your order");
        break;
      case "6":
        setTitle("Working with design staff");
        break;
      case "7":
        setTitle("Confirm the sketch design");
        break;
      case "-7":
        setTitle("Waiting for the design staff to redraw");
        break;
      case "8":
        setTitle("Waiting for production staff receive your order");
        break;
      case "9":
        setTitle("Working with production staff");
        break;
      case "10":
        setTitle(
          "Your requirement has been fulfilled, please pay the rest to receive the product"
        );
        break;
      case "11":
        setTitle("Waiting for add the warranty to your requirement");
        break;
      case "12":
        setTitle("Your requirement has been successfully completed");
        break;
      default:
        break;
    }
  }, [status]);

  function SelectionRender({
    setStatus,
    status,
    designDetail,
    title,
    requirementDetail,
    total,
  }) {
    console.log(status);
    switch (status) {
      case "-1":
        return <CustomerCanceled  title={title}/>
      case "-2":
        return (
          <CustomerWaiting
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            
            status={status}
          />
        );
      case "-3":
        return (
          <CustomerWaiting
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            
            status={status}
          />
        );
      case "3":
        return (
          <CustomerConfirmation
            setStatus={setStatus}
            status={status}
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            
          />
        );
      case "4":
        return (
          <CustomerPay
            status={status}
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            
          />
        );
      case "5": {
        return (
          <CustomerWorkingDesignStaff
            status={status}
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            
          />
        );
        break;
      }
      case "6": {
        return (
          <CustomerWorkingDesignStaff
            status={status}
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            
          />
        );
        break;
      }
      case "7": {
        return (
          <CustomerConfirmation
            setStatus={setStatus}
            status={status}
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            
          />
        );
        break;
      }
      case "-7":
        return (
          <CustomerWaiting
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            status={status}
          />
        );
      case "8":
        return (
          <CustomerWorkingProductionStaff
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            status={status}
          />
        );
      case "9":
        return (
          <CustomerWorkingProductionStaff
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
            status={status}
          />
        );
      case "10":
        return (
          <CustomerPay
            status={status}
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
          />
        );
      case "11":
        return (
          <RequirementDone
            status={status}
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
          />
        );
      case "12":
        return (
          <RequirementDone
            status={status}
            designDetail={designDetail}
            title={title}
            requirementDetail={requirementDetail}
          />
        );
      default:
        return <div>{/* Add your default payment component here */}</div>;
    }
  }

  return (
    <SelectionRender
      setStatus={setStatus}
      status={status}
      designDetail={designDetail}
      title={title}
      requirementDetail={requirementDetail}
      
    />
  );
}

export default PaymentSelection;
