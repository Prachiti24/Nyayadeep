import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const host =
    import.meta.env.VITE_API_URL ||
    "https://prachiti24-nyayadeep.onrender.com";

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const parseResponse = async (response) => {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      console.error("Server returned:", text);
      throw new Error("Backend returned invalid response");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const json = await parseResponse(response);

      console.log(json);

      if (!response.ok) {
        return alert(json.message);
      }

      localStorage.setItem("token", json.token);

      if (json?.data?.user) {
        localStorage.setItem("userId", json.data.user._id);
        localStorage.setItem("userName", json.data.user.name);
      }

      navigate("/", {
        replace: true,
      });
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${host}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const json = await parseResponse(response);

      console.log(json);

      if (!response.ok) {
        return alert(json.message);
      }

      localStorage.setItem("token", json.token);

      navigate("/verify-otp");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Check backend logs.");
    }
  };

  return (
    <div id="first-login">
      <h2>Nyayadeep</h2>

      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        <div className="form-container sign-up-container">

          <form onSubmit={handleSignupSubmit}>

            <h1>Create Account</h1>

            <input
              name="name"
              placeholder="Name"
              value={signupData.name}
              onChange={handleSignupChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />

            <input
              name="username"
              placeholder="Username"
              value={signupData.username}
              onChange={handleSignupChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />

            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              value={signupData.passwordConfirm}
              onChange={handleSignupChange}
              required
            />

            <button>Sign Up</button>

          </form>
        </div>

        <div className="form-container sign-in-container">

          <form onSubmit={handleLoginSubmit}>

            <h1>Sign In</h1>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <button>Sign In</button>

          </form>

        </div>

        <div className="overlay-container">

          <div className="overlay">

            <div className="overlay-panel overlay-left">
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;