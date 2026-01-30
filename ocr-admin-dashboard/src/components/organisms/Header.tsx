import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../redux/features/auth/authSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">
        OCR Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user?.username}</span>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
