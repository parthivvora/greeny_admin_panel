import "../styles/style.css";
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Navbar } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Table } from "antd";
import { errorHandler, successHandler } from "../global/responseHandler";
import { getAllOrders, updateOrderDeliveryStatus } from "../global/apiCall";
import { ToastContainer } from "react-toastify";

function Orders() {
    const [orderData, setOrderData] = useState([]);

    // Get all orders
    async function getAllOrdersData() {
        await getAllOrders()
            .then((response) => {
                setOrderData(response.data.orderData);
            })
            .catch((error) => {
                errorHandler(error.response.data.message);
            });
    }

    const convertUTCToIST = (date) => {
        const istTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toLocaleString()
        return istTime
    };

    // Update order delivery status
    const updateDeliveryStatus = async (orderId) => {
        await updateOrderDeliveryStatus(orderId)
            .then((response) => {
                getAllOrdersData()
                successHandler(response.data.message)
            })
            .catch((error) => {
                errorHandler(error.response.data.message);
            });
    }

    // Table data
    const columns = [
        {
            title: "Order Id",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "User",
            dataIndex: ["userDetails", "name"],
            key: "name",

        },
        {
            title: "Order Date",
            key: "orderDate",
            render: (data) => convertUTCToIST(data.orderDate),
        },
        {
            title: "Delivery Status",
            dataIndex: "deliveryStatus",
            key: "deliveryStatus",
        },
        {
            title: "Order Status",
            key: "orderStatus",
            render: (data) => (
                data.orderStatus == "Success" ?
                    <Badge bg="success"> {data.orderStatus} </Badge>
                    : <Badge bg="danger"> {data.orderStatus} </Badge>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Button variant="primary" disabled={data.deliveryStatus == "Pending" ? false : true} onClick={() => updateDeliveryStatus(data._id)}>Confirm</Button>
            ),
        },
    ];

    useEffect(() => {
        getAllOrdersData();
    }, []);

    return (
        <div id="app" className="order-part banner-part">
            <ToastContainer />
            <Sidebar />
            <div id="main">
                <Navbar />
                <div className="main-content container-fluid">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Orders</h3>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Orders
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="section order-table">
                        <Table columns={columns} dataSource={orderData} bordered />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Orders
