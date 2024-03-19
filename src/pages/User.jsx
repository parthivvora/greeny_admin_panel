import "../styles/style.css";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Table } from "antd";
import { errorHandler } from "../global/responseHandler";
import { getAllUser } from "../global/apiCall";

function User() {
  const [userData, setUserData] = useState([]);

  // Get all users data
  async function getUserData() {
    await getAllUser()
      .then((response) => {
        setUserData(response.data.userData);
      })
      .catch((error) => {
        errorHandler(error.response.data.message);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  // Table data
  const columns = [
    {
      title: "Image",
      key: "userImage",
      render: ({ userImage }) => (
        <img src={userImage} alt={userImage} style={{ borderRadius: "50%" }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
  ];
  return (
    <div id="app" className="user-part banner-part">
      <ToastContainer />
      <Sidebar />
      <div id="main">
        <Navbar />
        <div className="main-content container-fluid">
          <div className="page-title">
            <div className="row">
              <div className="col-12 col-md-6 order-md-1 order-last">
                <h3>Users</h3>
              </div>
              <div className="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" className="breadcrumb-header">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Users
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <section className="section">
            <Table columns={columns} dataSource={userData} bordered />
          </section>
        </div>
      </div>
    </div>
  );
}

export default User;
