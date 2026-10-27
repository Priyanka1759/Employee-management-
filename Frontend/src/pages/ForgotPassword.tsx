import { Link } from "react-router-dom";
import "../styles/Login.css";

function ForgotPassword() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Forgot Password</h2>

        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              required
            />
          </div>

          <button type="submit">
            Send Reset Link
          </button>

          <div className="auth-links">
            <p>
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;