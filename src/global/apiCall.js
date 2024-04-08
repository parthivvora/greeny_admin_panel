import axios from "axios";
import { BASE_URI, apiKeys } from "./apiKeys";

const adminToken = sessionStorage.getItem("adminToken");
const httpRequest = axios.create({
  baseURL: BASE_URI,
  headers: {
    Authorization: adminToken ? `Bearer ${adminToken}` : "",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const adminLogin = (data) => httpRequest.post(apiKeys.login, data);
export const totalCount = () => httpRequest.get(apiKeys.totalCount);
// Banners
export const getBanners = () => httpRequest.get(apiKeys.getBannersData);
export const addBanners = (data) =>
  httpRequest.post(apiKeys.addBannersData, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateBannersData = (data, bannerId) =>
  httpRequest.put(`${apiKeys.updateBannersData}${bannerId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Category
export const getCategories = () => httpRequest.get(apiKeys.getCategoriesData);
export const addCategories = (data) =>
  httpRequest.post(apiKeys.addCategoriesData, data);
export const updateCategories = (data, categoryId) =>
  httpRequest.put(`${apiKeys.updateCategoriesData}${categoryId}`, data);

// Products
export const getProducts = () => httpRequest.get(apiKeys.getProductsData);
export const addProducts = (data) =>
  httpRequest.post(apiKeys.addProductsData, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProducts = (data, productId) =>
  httpRequest.put(`${apiKeys.updateProductsData}${productId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Brands
export const getBrands = () => httpRequest.get(apiKeys.getBrandsData);
export const addBrands = (data) =>
  httpRequest.post(apiKeys.addBrandsData, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateBrands = (data, brandId) =>
  httpRequest.put(`${apiKeys.updateBrandsData}${brandId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getSingleBrand = (brandId) =>
  httpRequest.get(`${apiKeys.getSingleBrandData}${brandId}`);

export const getAllUser = () => httpRequest.get(apiKeys.getAllUser);

// Orders
export const getAllOrders = () => httpRequest.get(apiKeys.getAllOrder);
export const updateOrderDeliveryStatus = (orderId) =>
  httpRequest.put(`${apiKeys.updateOrderDeliveryStatus}${orderId}`);

// Payment
export const getAllPayment = () => httpRequest.get(apiKeys.getAllPayments);
