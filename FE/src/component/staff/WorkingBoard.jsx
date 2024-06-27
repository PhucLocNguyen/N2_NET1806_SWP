import useAuth from "../../hooks/useAuth";
import PlanningList from "../designProductPlan/PlanningList";
import SaleBoard from "../saleStaff/SaleBoard";
function WorkingBoard() {
    const { role } = useAuth();

    let Content = null;

    if (role === "Sale") {
        Content = SaleBoard;
    } else {
        Content = PlanningList;
    }
    
    return (
        <Content/>
    );
}

export default WorkingBoard;