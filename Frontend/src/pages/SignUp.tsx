import { Link } from "react-router-dom";
import "../styles/Login.css";

function SignUp() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>

        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button type="submit">
            Create Account
          </button>

          <div className="auth-links">
            <p>
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;