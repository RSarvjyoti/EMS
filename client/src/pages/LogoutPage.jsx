import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
    >
      <FiLogOut className="w-4 h-4 mr-2" />
      <span>Logout</span>
    </button>
  );
};

export default LogoutPage;