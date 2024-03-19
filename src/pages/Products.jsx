import "../styles/style.css"
import { Select, Space, Table, Tag } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Form, Modal, Navbar } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { errorHandler, successHandler } from '../global/responseHandler'
import { addProducts, getBrands, getCategories, getProducts, updateProducts } from '../global/apiCall'
import { FaRegEdit } from 'react-icons/fa'
import Sidebar from '../components/Sidebar'

function Products() {
    const [productsData, setProductsData] = useState([])
    const [categoriesData, setCategoriesData] = useState([])
    const [brandData, setBrandData] = useState([])
    const [showAddBannerModel, setShowAddBannerModel] = useState(false);
    const [showEditBannerModel, setShowEditBannerModel] = useState(false);
    const [addBannerData, setAddBannerData] = useState({ productName: "", productPrice: "", productMeasurement: "", productDescription: "", productWeight: "", productStyle: "", productProperties: "", productTags: "" });
    const [brandId, setBrandId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productStatus, setProductStatus] = useState("");
    const [productId, setProductId] = useState("");
    const [oldProductImage, setOldProductImage] = useState("");
    const [status, setStatus] = useState("");

    const handleAddModelClose = () => setShowAddBannerModel(false);
    const handleAddModelShow = () => setShowAddBannerModel(true);
    const handleEditModelClose = () => setShowEditBannerModel(false);
    const handleEditModelShow = () => setShowEditBannerModel(true);

    // Get all brand data
    async function getBrandData() {
        await getBrands()
            .then((response) => {
                setBrandData(response.data.brandsData)
            })
            .catch((error) => {
                errorHandler(error.response.data.message)
            })
    }

    // Get all category data
    async function categoryData() {
        await getCategories()
            .then((response) => {
                setCategoriesData(response.data.categoryData)
            })
            .catch((error) => {
                errorHandler(error.response.data.message)
            })
    }

    // Get all product data
    async function productData() {
        await getProducts()
            .then((response) => {
                // console.log("🚀 ~ .then ~ response:", response)
                setProductsData(response.data.productData)
            })
            .catch((error) => {
                errorHandler(error.response.data.message)
            })
    }

    // Post product data
    const getProductDetails = (e) => {
        setAddBannerData({ ...addBannerData, [e.target.name]: e.target.value })
    }

    // Get brand data
    const handleBrandData = (value) => {
        setBrandId(value)
    }

    // Get product data
    const handleProductStatus = (value) => {
        setProductStatus(value)
    }

    // Get category data
    const handleCategoryData = (value) => {
        setCategoryId(value)
    }

    const productImage = useRef()
    const handelAddProductData = async (e) => {
        e.preventDefault()
        if (!productId) {
            const formData = new FormData();
            formData.append("productName", addBannerData.productName)
            formData.append("productBrand", brandId)
            formData.append("productPrice", addBannerData.productPrice)
            formData.append("productMeasurement", addBannerData.productMeasurement)
            formData.append("productDescription", addBannerData.productDescription)
            formData.append("productWeight", addBannerData.productWeight)
            formData.append("productStyle", addBannerData.productStyle)
            formData.append("productProperties", addBannerData.productProperties)
            formData.append("productImage", productImage.current.files[0])
            formData.append("productTags", addBannerData.productTags)
            formData.append("productStatus", productStatus)
            formData.append("categoryId", categoryId)

            await addProducts(formData)
                .then((response) => {
                    successHandler(response.data.message)
                    setShowAddBannerModel(false)
                    setAddBannerData({ productName: "", productPrice: "", productMeasurement: "", productDescription: "", productWeight: "", productStyle: "", productProperties: "", productTags: "" });
                    productData()
                })
                .catch((error) => {
                    console.log("🚀 ~ handelAddBannerData ~ error:", error.response.data.message)
                    errorHandler(error.response.data.message)
                })
        }
        else {
            if (productImage.current.files[0]) {
                const formData = new FormData();
                formData.append("productName", addBannerData.productName)
                formData.append("productBrand", brandId)
                formData.append("productPrice", addBannerData.productPrice)
                formData.append("productMeasurement", addBannerData.productMeasurement)
                formData.append("productDescription", addBannerData.productDescription)
                formData.append("productWeight", addBannerData.productWeight)
                formData.append("productStyle", addBannerData.productStyle)
                formData.append("productProperties", addBannerData.productProperties)
                formData.append("productImage", productImage.current.files[0])
                formData.append("productTags", addBannerData.productTags)
                formData.append("productStatus", productStatus)
                formData.append("categoryId", categoryId)

                await updateProducts(formData, productId)
                    .then((response) => {
                        successHandler(response.data.message)
                        setShowEditBannerModel(false)
                        setAddBannerData({ productName: "", productPrice: "", productMeasurement: "", productDescription: "", productWeight: "", productStyle: "", productProperties: "", productTags: "" });
                        productData()
                    })
                    .catch((error) => {
                        console.log("🚀 ~ handelAddBannerData ~ error:", error.response.data.message)
                        errorHandler(error.response.data.message)
                    })
            }
            else {
                const formData = new FormData();
                formData.append("productName", addBannerData.productName)
                formData.append("productBrand", brandId)
                formData.append("productPrice", addBannerData.productPrice)
                formData.append("productMeasurement", addBannerData.productMeasurement)
                formData.append("productDescription", addBannerData.productDescription)
                formData.append("productWeight", addBannerData.productWeight)
                formData.append("productStyle", addBannerData.productStyle)
                formData.append("productProperties", addBannerData.productProperties)
                formData.append("productImage", oldProductImage)
                formData.append("productTags", addBannerData.productTags)
                formData.append("productStatus", productStatus)
                formData.append("categoryId", categoryId)

                await updateProducts(formData, productId)
                    .then((response) => {
                        successHandler(response.data.message)
                        setShowEditBannerModel(false)
                        setAddBannerData({ productName: "", productPrice: "", productMeasurement: "", productDescription: "", productWeight: "", productStyle: "", productProperties: "", productTags: "" });
                        productData()
                    })
                    .catch((error) => {
                        console.log("🚀 ~ handelAddBannerData ~ error:", error.response.data.message)
                        errorHandler(error.response.data.message)
                    })
            }
        }
    }

    // Update product data
    const editProductData = (data) => {
        setShowEditBannerModel(true)
        setAddBannerData({ productName: data.productName, productPrice: data.productPrice, productMeasurement: data.productMeasurement, productDescription: data.productDescription, productWeight: data.productWeight, productStyle: data.productStyle, productProperties: data.productProperties, productTags: data.productTags })
        setBrandId(data.productBrand)
        setProductStatus(data.productStatus)
        setProductId(data._id)
        setCategoryId(data.categoryId)
        setOldProductImage(data.productImage)
    }

    // Table data
    const columns = [
        {
            title: 'Image',
            key: 'productImage',
            render: ({ productImage }) => (
                <img src={productImage} alt={productImage} className='w-50 h-50' />
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Product Price',
            key: 'productPrice',
            render: ({ productPrice }) => (
                <>
                    <i class="fa-solid fa-indian-rupee-sign"></i> {productPrice}
                </>
            )
        },
        {
            title: 'Product Status',
            dataIndex: 'productStatus',
            key: 'productStatus',
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
                    <FaRegEdit onClick={() => editProductData(data)} className='edit-icon' style={{ cursor: "pointer" }} />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        productData()
        categoryData()
        getBrandData()
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
                                <h3>Products</h3>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Products
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="section">
                        <div className="add-category-btn-part">
                            <button type="button" className="btn btn-primary add-banner-btn" onClick={handleAddModelShow}>Add Products <i className="fa-solid fa-plus"></i></button>
                        </div>
                        <Table columns={columns} dataSource={productsData} bordered />
                    </section>

                    {/* Add Product Model */}
                    <Modal show={showAddBannerModel} onHide={handleAddModelClose} className='add-banner-model' centered>
                        <Modal.Header className='align-items-center'>
                            <Modal.Title>Add Product</Modal.Title>
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
                                                                        <label htmlFor="first-name-vertical">Product Name</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productName" placeholder="Product name" onChange={getProductDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group d-flex flex-column">
                                                                        <label htmlFor="first-name-vertical">Product Brand</label>
                                                                        <Space wrap className="mt-1">
                                                                            <Select
                                                                                defaultValue="Brand"
                                                                                style={{ width: 200 }}
                                                                                onChange={handleBrandData}
                                                                                options={
                                                                                    brandData.map((i) => {
                                                                                        return (
                                                                                            {
                                                                                                value: i._id,
                                                                                                label: i.brandName,
                                                                                            }
                                                                                        )
                                                                                    })
                                                                                }
                                                                            />
                                                                        </Space>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Price</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productPrice" placeholder="Product price" onChange={getProductDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Measurement</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productMeasurement" placeholder="Product measurement" onChange={getProductDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Description</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productDescription" placeholder="Product description" onChange={getProductDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Weight</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productWeight" placeholder="Product weight" onChange={getProductDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Style</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productStyle" placeholder="Product style" onChange={getProductDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Properties</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productProperties" placeholder="Product properties" onChange={getProductDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Tags</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productTags" placeholder="Product tags" onChange={getProductDetails} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group d-flex flex-column">
                                                                        <label htmlFor="first-name-vertical">Product Status</label>
                                                                        <Space wrap className="mt-1">
                                                                            <Select
                                                                                defaultValue="Status"
                                                                                style={{ width: 200 }}
                                                                                onChange={handleProductStatus}
                                                                                options={[
                                                                                    {
                                                                                        value: "outOfStock",
                                                                                        label: "Out of Stock",
                                                                                    },
                                                                                    {
                                                                                        value: "inStock",
                                                                                        label: "In Stock",
                                                                                    }
                                                                                ]}
                                                                            />
                                                                        </Space>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group d-flex flex-column">
                                                                        <label htmlFor="first-name-vertical">Product Category</label>
                                                                        <Space wrap className="mt-1">
                                                                            <Select
                                                                                defaultValue="Category"
                                                                                style={{ width: 200 }}
                                                                                onChange={handleCategoryData}
                                                                                options={
                                                                                    categoriesData.map((i) => {
                                                                                        return (
                                                                                            {
                                                                                                value: i._id,
                                                                                                label: i.categoryName,
                                                                                            }
                                                                                        )
                                                                                    })
                                                                                }
                                                                            />
                                                                        </Space>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <Form.Group controlId="formFile" className="mb-3">
                                                                            <Form.Label>Image</Form.Label>
                                                                            <Form.Control type="file" name='productImage' ref={productImage} />
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

                    {/* Edit Product Model */}
                    <Modal show={showEditBannerModel} onHide={handleEditModelShow} className='add-banner-model' centered>
                        <Modal.Header className='align-items-center'>
                            <Modal.Title>Edit Product</Modal.Title>
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
                                                                        <label htmlFor="first-name-vertical">Product Name</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productName" placeholder="Product name" onChange={getProductDetails} value={addBannerData.productName} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group d-flex flex-column">
                                                                        <label htmlFor="first-name-vertical">Product Brand</label>
                                                                        <Space wrap className="mt-1">
                                                                            <Select
                                                                                defaultValue="Brand"
                                                                                style={{ width: 200 }}
                                                                                onChange={handleBrandData}
                                                                                options={
                                                                                    brandData.map((i) => {
                                                                                        return (
                                                                                            {
                                                                                                value: i._id,
                                                                                                label: i.brandName,
                                                                                            }
                                                                                        )
                                                                                    })
                                                                                }
                                                                            />
                                                                        </Space>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Price</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productPrice" placeholder="Product price" onChange={getProductDetails} value={addBannerData.productPrice} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Measurement</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productMeasurement" placeholder="Product measurement" onChange={getProductDetails} value={addBannerData.productMeasurement} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Description</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productDescription" placeholder="Product description" onChange={getProductDetails} value={addBannerData.productDescription} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Weight</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productWeight" placeholder="Product weight" onChange={getProductDetails} value={addBannerData.productWeight} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Style</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productStyle" placeholder="Product style" onChange={getProductDetails} value={addBannerData.productStyle} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Properties</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productProperties" placeholder="Product properties" onChange={getProductDetails} value={addBannerData.productProperties} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="first-name-vertical">Product Tags</label>
                                                                        <input type="text" id="first-name-vertical" className="form-control" name="productTags" placeholder="Product tags" onChange={getProductDetails} value={addBannerData.productTags} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group d-flex flex-column">
                                                                        <label htmlFor="first-name-vertical">Product Status</label>
                                                                        <Space wrap className="mt-1">
                                                                            <Select
                                                                                defaultValue="Status"
                                                                                style={{ width: 200 }}
                                                                                onChange={handleProductStatus}
                                                                                options={[
                                                                                    {
                                                                                        value: "outOfStock",
                                                                                        label: "Out of Stock",
                                                                                    },
                                                                                    {
                                                                                        value: "inStock",
                                                                                        label: "In Stock",
                                                                                    }
                                                                                ]}
                                                                            />
                                                                        </Space>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group d-flex flex-column">
                                                                        <label htmlFor="first-name-vertical">Product Category</label>
                                                                        <Space wrap className="mt-1">
                                                                            <Select
                                                                                defaultValue="Category"
                                                                                style={{ width: 200 }}
                                                                                onChange={handleCategoryData}
                                                                                options={
                                                                                    categoriesData.map((i) => {
                                                                                        return (
                                                                                            {
                                                                                                value: i._id,
                                                                                                label: i.categoryName,
                                                                                            }
                                                                                        )
                                                                                    })
                                                                                }
                                                                            />
                                                                        </Space>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <Form.Group controlId="formFile" className="mb-3">
                                                                            <Form.Label>Image</Form.Label>
                                                                            <Form.Control type="file" name='productImage' ref={productImage} />
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-primary mr-1 mb-1">
                                                                        Update
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

export default Products