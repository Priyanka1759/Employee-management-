import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-left">
        <h1>HRMS</h1>

        <h2>Employee Management System</h2>

        <p>
          Manage employees, attendance, departments and
          company records from a single platform.
        </p>

        <button
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>

    </div>
  );
}

export default Home;
