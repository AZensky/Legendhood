import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp, login } from "../../store/session";
import { ReactComponent as SignupLogo } from "../../assets/Legendhood_logo_grey.svg";
import "./SignUpPage.css";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Your password and confirmation password do not match."]);
    }
  };

  const loginDemoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="signup-page-container">
      {/* Signup Left Side */}
      <div className="left-signup-container">
        {/* Signup Logo */}
        <Link to="/" className="signup-logo-container">
          <SignupLogo className="signup-logo" />
        </Link>
        <h1 className="signup-title">Invest with zero commission fees</h1>

        <p>Plus, request 24/7 live support right from the app.</p>

        {/* Signup Chart */}
        <img
          src="https://cdn.robinhood.com/app_assets/odyssey/experiment/invest.png"
          alt="Chart"
        />
      </div>

      {/* Signup Right Side */}
      <div className="right-signup-container">
        <div className="signup-form-container">
          <form onSubmit={handleSubmit} className="signup-form">
            <h1 className="signup-form__title">Sign up</h1>
            <p className="signup-free-stock">
              Sign up for 1 (fake) Robinhood Stock!
            </p>
            {errors.length > 0 && (
              <ul className="signup-form__validation-errors">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            )}
            <div className="signup-name-inputs">
              <label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="First name"
                />
              </label>
              <label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Last name"
                />
              </label>
            </div>
            <label className="signup-form__email__label">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </label>

            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </label>
            <label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
                placeholder="Repeat Password"
              />
            </label>
            <div className="signup-form-buttons">
              <button onClick={loginDemoUser}>Demo User</button>
              <button type="submit">Sign Up</button>
            </div>
            <div className="signup-page-login">
              <span>Already have an account on Legendhood?</span>
              <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
