import { Outlet } from "react-router-dom";
import DashboardNav from "../../Components/DashboardNav";


const PrivateLayout = () => {
    return (
        <div className='max-w-[1920px] min-h-[500px] xs:min-h-fit xxs:min-h-fit bg-primary mx-auto overflow-hidden'>
            <DashboardNav />
            <Outlet />
        </div>
    );
};

export default PrivateLayout;