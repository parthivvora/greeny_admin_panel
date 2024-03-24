import "../styles/style.css";
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Navbar } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Table } from "antd";
import { errorHandler } from "../global/responseHandler";
import { getAllPayment } from "../global/apiCall";

function Payment() {
    const [paymentData, setPaymentData] = useState([]);

    // Get all payments
    async function getAllPaymentData() {
        await getAllPayment()
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response.data.paymentData)
                setPaymentData(response.data.paymentData);
            })
            .catch((error) => {
                errorHandler(error.response.data.message);
            });
    }

    useEffect(() => {
        getAllPaymentData();
    }, []);

    const convertUTCToIST = (date) => {
        const istTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toLocaleString()
        return istTime
    };

    // Table data
    const columns = [
        {
            title: "Payment Id",
            dataIndex: "paymentId",
            key: "paymentId",
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
        {
            title: "Payment Method",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        {
            title: "Payment Status",
            key: "paymentStatus",
            render: (data) => (
                data.paymentStatus == "paid" ?
                    <Badge bg="success" style={{ padding: "0.5rem 1rem" }}> {data.paymentStatus} </Badge>
                    : <Badge bg="danger"> {data.paymentStatus} </Badge>
            ),
        },
        {
            title: "Payment Date",
            key: "paymentDate",
            render: (data) => convertUTCToIST(data.paymentDate),
        },
    ];

    return (
        <div id="app" className="payment-part banner-part">
            {/* <ToastContainer /> */}
            <Sidebar />
            <div id="main">
                <Navbar />
                <div className="main-content container-fluid">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Payment</h3>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Payment
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="section payment-table">
                        <Table columns={columns} dataSource={paymentData} bordered />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Payment
