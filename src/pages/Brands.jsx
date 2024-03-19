import "../styles/style.css"
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Space, Table, Tag, Select } from 'antd'
import { errorHandler, successHandler } from '../global/responseHandler'
import { FaRegEdit } from 'react-icons/fa'
import { addBrands, getBrands, updateBrands } from "../global/apiCall"
import { Form, Modal } from 'react-bootstrap'

function Brands() {
    const [brandsData, setBrandData] = useState([])
    const [addBrandsData, setAddBrandsData] = useState({ brandName: "", totalItems: "" });
    const [showAddBannerModel, setShowAddBannerModel] = useState(false);
    const [showEditBannerModel, setShowEditBannerModel] = useState(false);
    const [brandStatus, setBrandStatus] = useState("");
    const [brandId, setBrandId] = useState("");
    const [oldBrandImage, setOldBrandImage] = useState("");

    const handleAddModelClose = () => setShowAddBannerModel(false);
    const handleAddModelShow = () => setShowAddBannerModel(true);
    const handleEditModelClose = () => setShowEditBannerModel(false);
    const handleEditModelShow = () => setShowEditBannerModel(true);

    // Get all product data
    async function getBrandsData() {
        await getBrands()
            .then((response) => {
                // console.log("🚀 ~ .then ~ response:", response)
                setBrandData(response.data.brandsData)
            })
            .catch((error) => {
                errorHandler(error.response.data.message)
            })
    }

    const brandImage = useRef()
    const getBrandsDetails = (e) => {
        setAddBrandsData({ ...addBrandsData, [e.target.name]: e.target.value })
    }

    // Get product data
    const handleBrandStatus = (value) => {
        setBrandStatus(value)
    }

    const handelAddProductData = async (e) => {
        e.preventDefault()
        if (!brandId) {
            const formData = new FormData();
            formData.append("brandName", addBrandsData.brandName)
            formData.append("totalItems", addBrandsData.totalItems)
            formData.append("brandImage", brandImage.current.files[0])

            await addBrands(formData)
                .then((response) => {
                    successHandler(response.data.message)
                    setShowAddBannerModel(false)
                    setAddBrandsData({ brandName: "", totalItems: "" });
                    setBrandId("")
                    getBrandsData()
                })
                .catch((error) => {
                    console.log("🚀 ~ handelAddBannerData ~ error:", error.response.data.message)
                    errorHandler(error.response.data.message)
                })
        }
        else {
            if (brandImage.current.files[0]) {
                const formData = new FormData();
                formData.append("brandName", addBrandsData.brandName)
                formData.append("totalItems", addBrandsData.totalItems)
                formData.append("brandImage", brandImage.current.files[0])

                await updateBrands(formData, brandId)
                    .then((response) => {
                        successHandler(response.data.message)
                        setShowEditBannerModel(false)
                        setAddBrandsData({ brandName: "", totalItems: "" });
                        setBrandId("")
                        getBrandsData()
                    })
                    .catch((error) => {
                        console.log("🚀 ~ handelAddBannerData ~ error:", error.response.data.message)
                        errorHandler(error.response.data.message)
                    })
            }
            else {
                const formData = new FormData();
                formData.append("brandName", addBrandsData.brandName)
                formData.append("totalItems", addBrandsData.totalItems)
                formData.append("brandImage", oldBrandImage)

                await updateBrands(formData, brandId)
                    .then((response) => {
                        successHandler(response.data.message)
                        setShowEditBannerModel(false)
                        setAddBrandsData({ brandName: "", totalItems: "" });
                        setBrandId("")
                        getBrandsData()
                    })
                    .catch((error) => {
                        console.log("🚀 ~ handelAddBannerData ~ error:", error.response.data.message)
                        errorHandler(error.response.data.message)
                    })
            }
        }
    }

    // Update brands data
    const editBrandsData = (data) => {
        setShowEditBannerModel(true)
        setAddBrandsData({ brandName: data.brandName, totalItems: data.totalItems })
        setBrandId(data._id)
        setOldBrandImage(data.brandImage)
    }

    // Table data
    const columns = [
        {
            title: 'Image',
            key: 'brandImage',
            render: ({ brandImage }) => (
                <img src={brandImage} alt={brandImage} className='w-50 h-50' />
            ),
        },
        {
            title: 'Brands Name',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Total Items',
            dataIndex: 'totalItems',
            key: 'totalItems',
        },
        {
            title: 'Brands Status',
            key: 'brandStatus',
            render: ({ brandStatus }) => (
                <>
                    {brandStatus ? <Tag color='success' className='banner-inactive-text'>Active</Tag> : <Tag color='error' className='banner-active-text'>Inactive</Tag>}
                </>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <FaRegEdit onClick={() => editBrandsData(data)} className='edit-icon' style={{ cursor: "pointer" }} />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getBrandsData()
    }, [])
    return (
        <div id="app" className="product-part">
            <ToastContainer />
            <Sidebar />
            <div id="main">
                <Navbar />
                <div className="main-content container-fluid">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Brands</h3>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Brands
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="section">
                        <div className="add-category-btn-part">
                            <button type="button" className="btn btn-primary add-banner-btn" onClick={handleAddModelShow}>Add Brands <i className="fa-solid fa-plus"></i></button>
                        </div>
                        <Table columns={columns} dataSource={brandsData} bordered />
                    </section>

                    {/* Add Product Model */}
                    <Modal show={showAddBannerModel} onHide={handleAddModelClose} className='add-banner-model' centered>
                        <Modal.Header className='align-items-center'>
                            <Modal.Title>Add Brand</Modal.Title>
                            <i className="fa-solid fa-xmark close-icon" onClick={() => setShowAddBannerModel(false)}></i>
                        </Modal.Header>
                        <Modal.Body>
                            <section id="basic-vertical-layouts">
                                <div className="row match-height">
                                    <div className="col-md-12 col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form form-vertical" onSubmit={handelAddProductData} method='post' encType='multipart/form-data'>
                                                        <div className="form-body">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Brand Name</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="brandName" placeholder="Brand name" onChange={getBrandsDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Brands Total Items</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="totalItems" placeholder="Total Items" onChange={getBrandsDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <Form.Group controlId="formFile" className="mb-3">
                                                                            <Form.Label>Image</Form.Label>
                                                                            <Form.Control type="file" name='brandImage' ref={brandImage} />
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-primary mr-1 mb-1">
                                                                        Add
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

                    {/* Edit Product Model */}
                    <Modal show={showEditBannerModel} onHide={handleEditModelShow} className='add-banner-model' centered>
                        <Modal.Header className='align-items-center'>
                            <Modal.Title>Edit Brand</Modal.Title>
                            <i className="fa-solid fa-xmark close-icon" onClick={() => handleEditModelClose(false)}></i>
                        </Modal.Header>
                        <Modal.Body>
                            <section id="basic-vertical-layouts">
                                <div className="row match-height">
                                    <div className="col-md-12 col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form form-vertical" onSubmit={handelAddProductData} method='post' encType='multipart/form-data'>
                                                        <div className="form-body">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Brand Name</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="brandName" placeholder="Brand name" onChange={getBrandsDetails} value={addBrandsData.brandName} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Brands Total Items</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="totalItems" placeholder="Total Items" onChange={getBrandsDetails} value={addBrandsData.totalItems} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group d-flex flex-column">
                                                                        <label htmlFor="first-name-vertical">Brands Status</label>
                                                                        <Space wrap className="mt-1">
                                                                            <Select
                                                                                defaultValue="Status"
                                                                                style={{ width: 200 }}
                                                                                onChange={handleBrandStatus}
                                                                                options={[
                                                                                    {
                                                                                        value: "true",
                                                                                        label: "True",
                                                                                    },
                                                                                    {
                                                                                        value: "false",
                                                                                        label: "False",
                                                                                    }
                                                                                ]}
                                                                            />
                                                                        </Space>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <Form.Group controlId="formFile" className="mb-3">
                                                                            <Form.Label>Image</Form.Label>
                                                                            <Form.Control type="file" name='brandImage' ref={brandImage} />
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-primary mr-1 mb-1">
                                                                        Edit
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
                </div>
            </div>
        </div>
    )
}

export default Brands