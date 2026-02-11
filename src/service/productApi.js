import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const getProducts = async () => {
  const response = await API.get('/products');
  return response.data;
};
export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};
