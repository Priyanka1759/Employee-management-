import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import Swal from "sweetalert2";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    console.log("Logout API success");
    localStorage.removeItem("token");
     Swal.fire({
            toast: true,
            position: "top-end",
            title: "Logged out successful",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });

    navigate("/");
  };
  return (
    <aside className="sidebar">
      <div className="sidebar">
        <h4>Employees</h4>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
