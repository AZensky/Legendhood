import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as SignupLogo } from "../../assets/RBSignupLogo.svg";
import "./SignUpPage.css";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    // setErrors([]);
    // return dispatch(
    //   sessionActions.signup({ firstName, lastName, email, password })
    // ).catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(Object.values(data.errors));
    // });

    history.push("/dashboard");
  };

  return (
    <div className="signup-page-container">
      {/* Signup Left Side */}
      <div className="left-signup-container">
        {/* Signup Logo */}
        <div className="signup-logo-container">
          <SignupLogo className="signup-logo" />
        </div>
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
            <ul className="signup-form__validation-errors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <h1 className="signup-form__title">Sign up</h1>
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
