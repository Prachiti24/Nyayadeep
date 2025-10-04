import React, { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); 
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/auth/getUser", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.status === "success") {
          setUser(data.data.user); // save user data
        } else {
          console.error("Failed to fetch user data", data);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="container">
      <div className="main-body">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="javascript:void(0)">User</a>
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

            {/* Social Links */}
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
                  <div className="col-sm-3">
                    <h6 className="mb-0">Telegram Id</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user ? user.telegramId : "NA"}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <a
                      className="btn btn-info"
                      target="_blank"
                      rel="noreferrer"
                      href=""
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">Games</i>
                      Progress Status
                    </h6>
                    <small>Snake And Ladder</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Leader Board</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>MCQ</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Match the Pair</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Spin the Wheel</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/*  Project Status */}
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">Lesson Progress</i>
                      Status
                    </h6>
                    <small>Article 1</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Article 2</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Article 3</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Article 4</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Article 5</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Status */}
          </div>
        </div>
      </div>
    </div>
  );
}
