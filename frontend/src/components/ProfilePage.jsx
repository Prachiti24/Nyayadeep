import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    telegramId: "",
  });
  const [showResetModal, setShowResetModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async () => {
    if (passwordData.password !== passwordData.passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://prachiti24-nyayadeep.onrender.com/api/auth/resetPassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();
      if (data.status === "success") {
        alert("Password updated successfully!");
        setShowResetModal(false);
        localStorage.setItem("token", data.token); // update JWT
      } else {
        alert(data.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };



  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("https://prachiti24-nyayadeep.onrender.com/api/auth/getUser", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.status === "success") {
          setUser(data.data.user); // save user data
          setFormData({
            name: data.data.user.name || "",
            username: data.data.user.username || "",
            email: data.data.user.email || "",
            telegramId: data.data.user.telegramId || "",
          });
        } else {
          console.error("Failed to fetch user data", data);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/")
  };


  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("https://prachiti24-nyayadeep.onrender.com/api/auth/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === "success") {
        setUser(data.data.user);
        setShowModal(false);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="main-body">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/home">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User Profile
            </li>
          </ol>
        </nav>
        {/* /Breadcrumb */}

        <div className="row gutters-sm">
          {/* Sidebar Card */}
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://t3.ftcdn.net/jpg/15/62/50/30/360_F_1562503097_O73UeZy5LK1iAoOZFlf6Ac9FpAGnoi61.jpg"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{user ? user.name : "NA"}</h4>
                    <p className="text-secondary mb-1">{user ? user.username : "NA"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement */}
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <i className="feather feather-globe mr-2 icon-inline"></i>
                    Longest Streak
                  </h6>
                  <span className="text-secondary">{user ? user.longestStreakDays : "NA"}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <i className="feather feather-github mr-2 icon-inline"></i>
                    Current Streak
                  </h6>
                  <span className="text-secondary">{user ? user.currentStreakDays : "NA"}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <i className="feather feather-twitter mr-2 icon-inline text-info"></i>
                    Total Xp Earned
                  </h6>
                  <span className="text-secondary">{user ? user.xpTotal : "NA"}</span>
                </li>
              </ul>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6">
                <button className="btn btn-danger w-100" onClick={handleLogout}>
                  Logout
                </button>
              </div>
              <div className="col-sm-6">
                <button className="btn btn-warning w-100" onClick={() => setShowResetModal(true)}>
                  Reset Password
                </button>
              </div>
            </div>

          </div>


          {/* Main Profile Info */}
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user ? user.name : "NA"}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user ? user.email : "NA"}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">UserName</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user ? user.username : "NA"}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      className="btn btn-info"
                      onClick={() => setShowModal(true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      {/* Modal for Editing */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Telegram ID</label>
                  <input
                    className="form-control"
                    name="telegramId"
                    value={formData.telegramId}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showResetModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reset Password</h5>
                <button className="btn-close" onClick={() => setShowResetModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={passwordData.password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="passwordConfirm"
                    value={passwordData.passwordConfirm}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowResetModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleResetPassword}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
