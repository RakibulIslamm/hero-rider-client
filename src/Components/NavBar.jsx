import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useFirebase from "../Hooks/useFirebase";

const NavBar = () => {

    const { user, setUser } = useAuth();
    const { logOut } = useFirebase();

    const handleLogOut = () => {
        logOut();
        setUser({})
    }

    return (
        <div className="px-20 h-[70px] flex items-center justify-between w-full max-w-[1440px] mx-auto">
            <Link to={'/'}>
                <h1 className="text-4xl font-semibold text-gray-700"><span className="text-orange-500 font-extralight">Hero</span> Rider</h1>
            </Link>
            <div className="flex items-center gap-4">
                {user?.user_type === 'learner' && <Link to={'/packages'}>Packages</Link>}
                {user.email && <Link className="" to={'/profile'}>Profile</Link>}
                {(user.email && user?.user_type === 'admin') && <Link className="px-4 py-1 bg-orange-500 rounded-full text-white" to={'/dashboard'}>Dashboard</Link>}
                {user.email && <button className="px-4 py-1 bg-red-500 rounded-full text-white" onClick={handleLogOut}>Log Out</button>}
                {!user?.email && <Link className="px-4 py-1 bg-orange-500 rounded-full text-white" to={'/login'}>Log In</Link>}
            </div>
        </div>
    );
};

export default NavBar;