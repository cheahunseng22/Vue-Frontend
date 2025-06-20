// src/apiEndpoints.js

const API_BASE_URL = 'https://elarastore.duckdns.org/api';

export const endpoints = {
  adminLogin: `${API_BASE_URL}/admin/login`,          // POST
  authDelete: (id) => `${API_BASE_URL}/auth/del/${id}`, // DELETE with param
  authListUser: `${API_BASE_URL}/auth/listuser`,      // GET|HEAD
  login: `${API_BASE_URL}/login`,                      // POST
  logout: `${API_BASE_URL}/logout`,                    // POST
  pay: `${API_BASE_URL}/pay`,                          // POST
  payAll: `${API_BASE_URL}/pay/all`,                   // GET|HEAD
  productsIndex: `${API_BASE_URL}/products`,           // GET|HEAD
  productsStore: `${API_BASE_URL}/products`,           // POST
  productDetail: (productId) => `${API_BASE_URL}/products/${productId}`, // GET|HEAD
  productUpdate: (productId) => `${API_BASE_URL}/products/${productId}`, // PUT|PATCH
  productDelete: (productId) => `${API_BASE_URL}/products/${productId}`, // DELETE
  register: `${API_BASE_URL}/register`,                // POST
  user: `${API_BASE_URL}/user`                         // GET|HEAD (assuming)
};
