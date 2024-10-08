import { useDispatch } from "react-redux";
import { logout } from "@/store/user/userSlice";
import { apiLogout } from "@/apis";
import icons from '@/utils/icons'
import { useNavigate } from "react-router-dom";
import path from "@/utils/path";

const { IoLogOutOutline } = icons

const Logout = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const handleLogout = async () => {
    try {
      await apiLogout();
      dispatch(logout());
      nav(`/${path.HOME}`);
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