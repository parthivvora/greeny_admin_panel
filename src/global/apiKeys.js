const BASE_URI = 'http://localhost:7000/api/'

const apiKeys = {
    login: `${BASE_URI}admin/login`,
    totalCount: `${BASE_URI}admin/totalCount`,

    // Banners
    getBannersData: `${BASE_URI}admin/getAllBanners`,
    addBannersData: `${BASE_URI}admin/addBanner`,
    updateBannersData: `${BASE_URI}admin/updateBanner/`,

    // Category
    getCategoriesData: `${BASE_URI}admin/getAllCategory`,
    addCategoriesData: `${BASE_URI}admin/addCategory`,
    updateCategoriesData: `${BASE_URI}admin/updateCategory/`,

    // Products
    getProductsData: `${BASE_URI}admin/getAllProducts`,
    addProductsData: `${BASE_URI}admin/addProduct`,
    updateProductsData: `${BASE_URI}admin/editProduct/`,

    // Brands
    getBrandsData: `${BASE_URI}admin/getAllBrands`,
    addBrandsData: `${BASE_URI}admin/createBrand`,
    getSingleBrandData: `${BASE_URI}admin/getSingleBrand/`,
    updateBrandsData: `${BASE_URI}admin/updateBrand/`,

    getAllUser: `${BASE_URI}user/userData`
}

export { BASE_URI, apiKeys }