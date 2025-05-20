import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import Login from "./Login";

const LogoutButton = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };


  return (
    <>
      <button
        onClick={handleLogout}
        className="Logout-buttom"
        title="Cerrar sesión"
      >
        <FiLogOut />
      </button>

      <Login
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default LogoutButton;
