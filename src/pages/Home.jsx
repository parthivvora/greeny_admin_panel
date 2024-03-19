import React, { useEffect, useState } from "react";
import "../styles/style.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { totalCount } from "../global/apiCall";
import { errorHandler } from "../global/responseHandler";

function Home() {
  const [totalCountData, setTotalCountData] = useState({
    userCount: "",
    categoryCount: "",
    productCount: "",
    bannerCount: "",
  });

  // Get all data
  async function getAllData() {
    await totalCount()
      .then((response) => {
        setTotalCountData({
          userCount: response.data.totalCount.userCount,
          categoryCount: response.data.totalCount.categoryCount,
          productCount: response.data.totalCount.productCount,
          bannerCount: response.data.totalCount.bannerCount,
        });
      })
      .catch((error) => {
        errorHandler(error.response.data.message);
      });
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="home-page" id="app">
      <Sidebar />
      <div id="main">
        <Navbar />
        <div className="main-content container-fluid">
          <div className="page-title">
            <h3>Dashboard</h3>
          </div>
          <section className="section mt-5">
            <div className="row mb-2">
              <div className="col-12 col-md-3">
                <a href="/user">
                  <div className="card card-statistic">
                    <div className="card-body p-0" style={{ height: 85 }}>
                      <div className="d-flex flex-column">
                        <div className="px-3 py-3 d-flex justify-content-between">
                          <h3 className="card-title">Total Users</h3>
                          <div className="card-right d-flex align-items-center">
                            <p> {totalCountData.userCount} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-12 col-md-3">
                <a href="/categories">
                  <div className="card card-statistic">
                    <div className="card-body p-0" style={{ height: 85 }}>
                      <div className="d-flex flex-column">
                        <div className="px-3 py-3 d-flex justify-content-between">
                          <h3 className="card-title">Total Categories</h3>
                          <div className="card-right d-flex align-items-center">
                            <p> {totalCountData.categoryCount} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-12 col-md-3">
                <a href="/products">
                  <div className="card card-statistic">
                    <div className="card-body p-0" style={{ height: 85 }}>
                      <div className="d-flex flex-column">
                        <div className="px-3 py-3 d-flex justify-content-between">
                          <h3 className="card-title">Total Products</h3>
                          <div className="card-right d-flex align-items-center">
                            <p> {totalCountData.productCount} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-12 col-md-3">
                <a href="/banners">
                  <div className="card card-statistic">
                    <div className="card-body p-0" style={{ height: 85 }}>
                      <div className="d-flex flex-column">
                        <div className="px-3 py-3 d-flex justify-content-between">
                          <h3 className="card-title">Total Banners</h3>
                          <div className="card-right d-flex align-items-center">
                            <p> {totalCountData.bannerCount} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
