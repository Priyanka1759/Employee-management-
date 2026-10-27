import { useState, SyntheticEvent } from "react";
import { useNavigate ,Link} from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../services/authService";
import "../styles/Login.css";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await login(email.trim(), password);
      localStorage.setItem("token", response.data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 2000,
      });
      setPassword("");

      navigate("/employees");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email or Password",
      });
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>HRMS Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
          <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>

          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
