import axios from "axios";

// Tránh redirect lặp vô hạn
let isRedirecting401 = false;

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Clear auth-related storage
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");

      // Notify app components (same-tab) to update UI
      try {
        window.dispatchEvent(new Event("logout"));
        window.dispatchEvent(new Event("storageUpdated"));
      } catch (error) {
        console.error(error.message);
      }

      // Redirect to login (chỉ khi không ở trang login/register và chưa redirect)
      try {
        const path = window.location?.pathname || "";
        const onAuthPage =
          path.startsWith("/login") || path.startsWith("/register");
        if (!onAuthPage && !isRedirecting401) {
          isRedirecting401 = true;
          // dùng replace để tránh thêm lịch sử và hạn chế vòng lặp quay lại
          window.location.replace("/login");
          // reset cờ sau một khoảng ngắn (phòng trường hợp hot-reload hoặc dispatch lặp)
          setTimeout(() => (isRedirecting401 = false), 1500);
        }
      } catch (_) {
        // fallback
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
