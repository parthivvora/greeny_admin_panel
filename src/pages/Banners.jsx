import React, { useEffect, useRef, useState } from 'react'
import "../styles/style.css"
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Space, Table, Tag } from 'antd';
import { FaRegEdit } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { addBanners, getBanners, updateBannersData } from '../global/apiCall';
import { errorHandler, successHandler } from '../global/responseHandler';
import { ToastContainer } from 'react-toastify';

function Banners() {
    const [bannersData, setBannersData] = useState([])
    const [showAddBannerModel, setShowAddBannerModel] = useState(false);
    const [showEditBannerModel, setShowEditBannerModel] = useState(false);
    const [addBannerData, setAddBannerData] = useState({ title: "", description: "" });
    const [bannerId, setBannerId] = useState("");
    const [oldBannerImage, setOldBannerImage] = useState("");
    const [status, setStatus] = useState("");

    const handleAddModelClose = () => setShowAddBannerModel(false);
    const handleAddModelShow = () => setShowAddBannerModel(true);
    const handleEditModelClose = () => setShowEditBannerModel(false);
    const handleEditModelShow = () => setShowEditBannerModel(true);

    // Get all banner data
    async function getBannersData() {
        await getBanners()
            .then((response) => {
                setBannersData(response.data.bannerData)
            })
            .catch((error) => {
                errorHandler(error.response.data.message)
            })
    }

    // Post banner data
    const bannerImage = useRef()
    const getBannerDetails = (e) => {
        setAddBannerData({ ...addBannerData, [e.target.name]: e.target.value })
    }

    const handelAddBannerData = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("bannerTitle", addBannerData.title)
        formData.append("bannerDescription", addBannerData.description)
        formData.append("bannerImage", bannerImage.current.files[0])

        await addBanners(formData)
            .then((response) => {
                successHandler(response.data.message)
                setShowAddBannerModel(false)
                setAddBannerData({ title: "", description: "" });
                getBannersData()
            })
            .catch((error) => {
                console.log("🚀 ~ handelAddBannerData ~ error:", error.response.data.message)
                errorHandler(error.response.data.message)
            })
    }

    // Update banner data
    const editBannerData = (data) => {
        setShowEditBannerModel(true)
        setAddBannerData({ title: data.bannerTitle, description: data.bannerDescription })
        setBannerId(data._id)
        setOldBannerImage(data.bannerImage)
    }

    const handelEditBannerData = async (e) => {
        e.preventDefault();
        if (bannerImage.current.files[0]) {
            const formData = new FormData();
            formData.append("bannerTitle", addBannerData.title)
            formData.append("bannerDescription", addBannerData.description)
            formData.append("bannerImage", bannerImage.current.files[0])
            formData.append("bannerStatus", status)

            await updateBannersData(formData, bannerId)
                .then((response) => {
                    successHandler(response.data.message)
                    setShowEditBannerModel(false)
                    setAddBannerData({ title: "", description: "" });
                    getBannersData()
                })
                .catch((error) => {
                    errorHandler(error.response.data.message)
                })
        }
        else {
            const formData = new FormData();
            formData.append("bannerTitle", addBannerData.title)
            formData.append("bannerDescription", addBannerData.description)
            formData.append("bannerImage", oldBannerImage)
            formData.append("bannerStatus", status)

            await updateBannersData(formData, bannerId)
                .then((response) => {
                    successHandler(response.data.message)
                    setShowEditBannerModel(false)
                    setAddBannerData({ title: "", description: "" });
                    getBannersData()
                })
                .catch((error) => {
                    errorHandler(error.response.data.message)
                })
        }
    }

    useEffect(() => {
        getBannersData()
    }, [])

    // Table data
    const columns = [
        {
            title: 'Image',
            key: 'bannerImage',
            render: ({ bannerImage }) => (
                <img src={bannerImage} alt={bannerImage} className='w-50 h-50' />
            ),
        },
        {
            title: 'Title',
            dataIndex: 'bannerTitle',
            key: 'bannerTitle',
        },
        {
            title: 'Description',
            dataIndex: 'bannerDescription',
            key: 'bannerDescription',
        },
        {
            title: 'Status',
            key: 'isDeleted',
            render: ({ isDeleted }) => (
                <>
                    {isDeleted ? <Tag color='error' className='banner-inactive-text'>InActive</Tag> : <Tag color='success' className='banner-active-text'>Active</Tag>}
                </>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <FaRegEdit onClick={() => editBannerData(data)} className='edit-icon' />
                    {/* <MdOutlineDelete onClick={() => hello(id)} className='delete-icon' /> */}
                </Space>
            ),
        },
    ];

    return (
        <div id="app" className='banner-part'>
            <ToastContainer />
            <Sidebar />
            <div id="main">
                <Navbar />
                <div className="main-content container-fluid">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Banners</h3>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Banners
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="section">
                        <div className="add-banner-btn-part">
                            <button type="button" className="btn btn-primary add-banner-btn" onClick={handleAddModelShow}>Add Banner <i className="fa-solid fa-plus"></i></button>
                        </div>
                        <Table columns={columns} dataSource={bannersData} bordered />
                    </section>

                    {/* Add Banners Model */}
                    <Modal show={showAddBannerModel} onHide={handleAddModelClose} className='add-banner-model' centered>
                        <Modal.Header className='align-items-center'>
                            <Modal.Title>Add Banner</Modal.Title>
                            <i className="fa-solid fa-xmark close-icon" onClick={() => setShowAddBannerModel(false)}></i>
                        </Modal.Header>
                        <Modal.Body>
                            <section id="basic-vertical-layouts">
                                <div className="row match-height">
                                    <div className="col-md-12 col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form form-vertical" onSubmit={handelAddBannerData} method='post' encType='multipart/form-data'>
                                                        <div className="form-body">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">title</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="title" placeholder="Title" onChange={getBannerDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="email-id-vertical">description</label>
                                                                        <input type="text" id="email-id-vertical" className="form-control" name="description" placeholder="Description" onChange={getBannerDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <Form.Group controlId="formFile" className="mb-3">
                                                                            <Form.Label>Image</Form.Label>
                                                                            <Form.Control type="file" name='bannerImage' ref={bannerImage} />
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-primary mr-1 mb-1">
                                                                        Submit
                                                                    </button>
                                                                    <button type="reset" className="btn btn-light-secondary mr-1 mb-1" onClick={() => setShowAddBannerModel(false)}>
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Modal.Body>
                    </Modal>

                    {/* Edit Banners Model */}
                    <Modal show={showEditBannerModel} onHide={handleEditModelShow} className='add-banner-model' centered>
                        <Modal.Header className='align-items-center'>
                            <Modal.Title>Edit Banner</Modal.Title>
                            <i className="fa-solid fa-xmark close-icon" onClick={() => handleEditModelClose(false)}></i>
                        </Modal.Header>
                        <Modal.Body>
                            <section id="basic-vertical-layouts">
                                <div className="row match-height">
                                    <div className="col-md-12 col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form form-vertical" onSubmit={handelEditBannerData} method='post' encType='multipart/form-data'>
                                                        <div className="form-body">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">title</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="title" value={addBannerData.title} placeholder="Title" onChange={getBannerDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="email-id-vertical">description</label>
                                                                        <input type="text" id="email-id-vertical" className="form-control" name="description" value={addBannerData.description} placeholder="Description" onChange={getBannerDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <Form.Group controlId="formFile" className="mb-3">
                                                                            <Form.Label>Image</Form.Label>
                                                                            <Form.Control type="file" name='bannerImage' ref={bannerImage} />
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">Select Status</Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item onClick={() => setStatus(false)}>Enabled</Dropdown.Item>
                                                                            <Dropdown.Item onClick={() => setStatus(true)}>Disabled</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                                <div className="col-12 d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-primary mr-1 mb-1">Update</button>
                                                                    <button type="reset" className="btn btn-light-secondary mr-1 mb-1" onClick={() => handleEditModelClose(false)}>Cancel</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Banners