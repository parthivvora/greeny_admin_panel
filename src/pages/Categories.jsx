import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Space, Table, Tag } from 'antd'
import { FaRegEdit } from 'react-icons/fa'
import { addCategories, getCategories, updateCategories } from '../global/apiCall'
import { errorHandler, successHandler } from '../global/responseHandler'

function Categories() {
    const [categoriesData, setCategoriesData] = useState([])
    const [showAddBannerModel, setShowAddBannerModel] = useState(false);
    const [showEditBannerModel, setShowEditBannerModel] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [status, setStatus] = useState("");

    const handleAddModelClose = () => setShowAddBannerModel(false);
    const handleAddModelShow = () => setShowAddBannerModel(true);
    const handleEditModelClose = () => setShowEditBannerModel(false);
    const handleEditModelShow = () => setShowEditBannerModel(true);

    // Get all product data
    async function categoryData() {
        await getCategories()
            .then((response) => {
                setCategoriesData(response.data.categoryData)
            })
            .catch((error) => {
                errorHandler(error.response.data.message)
            })
    }

    // Post category data
    const handelAddCategoryData = async (e) => {
        e.preventDefault()
        await addCategories({ categoryName: categoryName })
            .then((response) => {
                successHandler(response.data.message)
                setShowAddBannerModel(false)
                setCategoryName("");
            })
            .catch((error) => {
                errorHandler(error.response.data.message)
            })
    }

    // Update category data
    const editBannerData = (data) => {
        setShowEditBannerModel(true)
        setCategoryName(data.categoryName)
        setCategoryId(data._id)
    }

    const handelEditBannerData = async (e) => {
        e.preventDefault();
        const obj = {
            categoryName: categoryName,
            status: status
        }
        await updateCategories(obj, categoryId)
            .then((response) => {
                successHandler(response.data.message)
                setShowEditBannerModel(false)
                setCategoryName("");
                categoryData()
            })
            .catch((error) => {
                errorHandler(error.response.data.message)
            })
    }

    // Table data
    const columns = [
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
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
                    <FaRegEdit onClick={() => editBannerData(data)} className='edit-icon' style={{ cursor: "pointer" }} />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        categoryData()
    }, [])
    return (
        <div id="app" className="category-part">
            <ToastContainer />
            <Sidebar />
            <div id="main">
                <Navbar />
                <div className="main-content container-fluid">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Category</h3>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Category
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="section">
                        <div className="add-category-btn-part">
                            <button type="button" className="btn btn-primary add-banner-btn" onClick={handleAddModelShow}>Add Category <i className="fa-solid fa-plus"></i></button>
                        </div>
                        <Table columns={columns} dataSource={categoriesData} bordered />
                    </section>

                    {/* Add Category Model */}
                    <Modal show={showAddBannerModel} onHide={handleAddModelClose} className='add-banner-model' centered>
                        <Modal.Header className='align-items-center'>
                            <Modal.Title>Add Category</Modal.Title>
                            <i className="fa-solid fa-xmark close-icon" onClick={() => setShowAddBannerModel(false)}></i>
                        </Modal.Header>
                        <Modal.Body>
                            <section id="basic-vertical-layouts">
                                <div className="row match-height">
                                    <div className="col-md-12 col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form form-vertical" onSubmit={handelAddCategoryData} method='post'>
                                                        <div className="form-body">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">category</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="category" placeholder="Category name" onChange={(e) => setCategoryName(e.target.value)} />
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

                    {/* Edit Category Model */}
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
                                                    <form className="form form-vertical" onSubmit={handelEditBannerData} method='post'>
                                                        <div className="form-body">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">title</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="title" value={categoryName} placeholder="Title" onChange={(e) => setCategoryName(e.target.value)} />
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

export default Categories