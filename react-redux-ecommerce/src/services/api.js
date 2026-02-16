import axios from "axios";

const baseURL = `https://fakestoreapi.com`;

export const getProdcuts = () => {
  return axios.get(`${baseURL}/products`);
};

export const getSingleProdcut = (id) => {
  return axios.get(`${baseURL}/products/${id}`);
};

export const getCategories = () => {
  return axios.get(`${baseURL}/products/categories`);
};
