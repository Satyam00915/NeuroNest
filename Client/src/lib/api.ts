import axios from "axios";

const api = axios.create({
  baseURL: "https://neuronest-oevp.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

function subscribeTokenRefresh(callback: () => void) {
  refreshSubscribers.push(callback);
}

function onRefresh() {
  refreshSubscribers.forEach((callback) => callback());
}

api.interceptors.response.use(
  (response) => response, // Pass through no issues
  async (error) => {
    const originalRequest = error.config; //Store the original req configs so that we can retry

    if (
      error.response?.status === 401 &&
      error.response?.data?.refresh === false &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((res) => {
          subscribeTokenRefresh(() => {
            res(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        await axios.get(
          "https://neuronest-oevp.onrender.com/api/user/refresh",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        isRefreshing = false;
        onRefresh();

        return api(originalRequest);
      } catch (error) {
        isRefreshing = false;
        refreshSubscribers = [];

        window.location.href = "/login";

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
