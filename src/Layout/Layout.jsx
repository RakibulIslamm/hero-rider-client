import { Route, Routes } from "react-router-dom";
import AllUsers from "../Components/AllUsers/AllUsers";
import PaymentPage from "../Components/Payment/PaymentPage";
import Profile from "../Components/Profile/Profile";
import Home from "../Pages/Home";
import LogIn from "../Pages/LogIn";
import Packages from "../Pages/Packages";
import Signup from "../Pages/SignUp";
import PrivateRoute from "../utils/Routes/PrivateRoute";
import PublicRoute from "../utils/Routes/PublicRoute";
import PrivateLayout from "./Private/PrivateLayout";
import PublicLayout from "./Public/PublicLayout";


function Layout() {

    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<PublicRoute><PublicLayout /></PublicRoute>}>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<LogIn />} />
            </Route>

            {/* Private Layout */}
            <Route path="/packages" element={<PrivateRoute><Packages /></PrivateRoute>} />
            <Route path="/package/:id" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route index element={<AllUsers />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}>
            </Route>


            <Route path='*' element={<p>Not found</p>} />
        </Routes>
    );
}

export default Layout;