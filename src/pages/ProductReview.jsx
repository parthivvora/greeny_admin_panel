import "../styles/style.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Navbar } from "react-bootstrap";
import { Table } from "antd";
import { errorHandler, successHandler } from "../global/responseHandler";
import {
  deleteProductReviewByReviewId,
  getAllProductsReviews,
} from "../global/apiCall";
import { ToastContainer } from "react-toastify";

function ProductReview() {
  const [productReviewData, setProductReviewData] = useState([]);

  // Get all product reviews
  async function getAllProductReviewsData() {
    await getAllProductsReviews()
      .then((response) => {
        setProductReviewData(response.data.productsReviews);
      })
      .catch((error) => {
        errorHandler(error.response.data.message);
      });
  }

  const convertUTCToIST = (date) => {
    const istTime = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    ).toLocaleString();
    return istTime;
  };

  // Update product review
  const deleteProductReview = async (reviewId) => {
    await deleteProductReviewByReviewId(reviewId)
      .then((response) => {
        getAllProductReviewsData();
        successHandler(response.data.message);
      })
      .catch((error) => {
        errorHandler(error.response.data.message);
      });
  };

  // Table data
  const columns = [
    {
      title: "Product Id",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Review Message",
      key: "message",
      render: (data) => {
        return data.message.substring(0, 20) + "...";
      },
    },
    {
      title: "Review Date",
      key: "createdAt",
      render: (data) => convertUTCToIST(data.createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <div className="form-check form-switch p-0" key={data._id}>
          <input
            className="form-check-input mx-auto"
            type="checkbox"
            id="flexSwitchCheckChecked"
            checked={!data.isDeleted ? false : true}
            disabled={!data.isDeleted ? false : true}
            style={{ cursor: "pointer" }}
            onClick={() => deleteProductReview(data._id)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllProductReviewsData();
  }, []);

  return (
    <div id="app" className="order-part banner-part product-review-part">
      <ToastContainer />
      <Sidebar />
      <div id="main">
        <Navbar />
        <div className="main-content container-fluid">
          <div className="page-title">
            <div className="row">
              <div className="col-12 col-md-6 order-md-1 order-last">
                <h3>Product Reviews</h3>
              </div>
              <div className="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" className="breadcrumb-header">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Product Reviews
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <section className="section product-review-table">
            <Table columns={columns} dataSource={productReviewData} bordered />
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductReview;
