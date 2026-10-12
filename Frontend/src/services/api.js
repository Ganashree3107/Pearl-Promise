const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.DEV ? "http://localhost:8000" : ""
);
const ACCESS_TOKEN_KEY = "Pearl Promise-access-token";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const message = body?.detail || "Something went wrong. Please try again.";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return body;
}

export const authApi = {
  signup: (payload) => request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  login: (payload) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  google: (idToken) => request("/auth/google", {
    method: "POST",
    body: JSON.stringify({ id_token: idToken }),
  }),
  forgotPassword: (email) => request("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  }),
  resetPassword: (payload) => request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  refresh: (refreshToken) => request("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  }),
  logout: (accessToken) => request("/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  }),
  me: (accessToken) => request("/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  }),
  updateMe: (accessToken, payload) => request("/users/me", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(payload),
  }),
};

const userRequest = (path, options = {}) => request(path, {
  ...options,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
    ...(options.headers || {}),
  },
});

export const cartApi = {
  get: () => userRequest("/cart"),
  add: (productId, quantity = 1) => userRequest("/cart/items", {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity }),
  }),
  update: (productId, quantity) => userRequest(`/cart/items/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ product_id: productId, quantity }),
  }),
  remove: (productId) => userRequest(`/cart/items/${productId}`, { method: "DELETE" }),
  clear: () => userRequest("/cart", { method: "DELETE" }),
};

export const wishlistApi = {
  get: () => userRequest("/wishlist"),
  add: (productId) => userRequest(`/wishlist/${productId}`, { method: "POST" }),
  remove: (productId) => userRequest(`/wishlist/${productId}`, { method: "DELETE" }),
  clear: () => userRequest("/wishlist", { method: "DELETE" }),
};

export const orderApi = {
  list: () => userRequest("/orders"),
  get: (orderId) => userRequest(`/orders/${orderId}`),
  create: (payload) => userRequest("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  cancel: (orderId) => userRequest(`/orders/${orderId}/cancel`, { method: "POST" }),
  requestReturn: (orderId, payload) => userRequest(`/orders/${orderId}/return`, {
    method: "POST",
    body: JSON.stringify(payload),
  }),
};

export const reviewApi = {
  list: (productId) => request(`/reviews/product/${productId}`),
  add: (productId, payload) => userRequest(`/reviews/product/${productId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  update: (reviewId, payload) => userRequest(`/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  }),
  remove: (reviewId) => userRequest(`/reviews/${reviewId}`, { method: "DELETE" }),
  myCount: () => userRequest("/reviews/me/count"),
};
