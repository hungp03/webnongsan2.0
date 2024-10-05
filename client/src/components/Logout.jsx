import { useDispatch } from "react-redux";
import { logout } from "../store/user/userSlice";
import { apiLogout } from "../apis";
import icons from '../utils/icons'
const { IoLogOutOutline } = icons

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await apiLogout();
      dispatch(logout());
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <span
      onClick={handleLogout}
      className="hover: rounded-full hover:bg-slate-200 hover:text-main cursor-pointer p-2"
    >
      <IoLogOutOutline size={18} />
    </span>
  );
};

export default Logout;