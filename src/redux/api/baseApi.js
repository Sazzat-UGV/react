import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("accept", "application/json");
    }
    return headers;
  },
});

// 👇 Custom baseQuery to catch 401/403 errors
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // If token is invalid or expired
  if (result?.error?.status === 401) {
    // console.log('dsfdfhsfhsdhfksjdhfjk',result?.error?.status)
    // Remove token
    localStorage.removeItem("token");
    const role = localStorage.getItem("role");
    if(role === "ADMIN"){
        window.location.href = "/admin/dashboard/login"; // Change based on your route
        
    }else{
          window.location.href = "/login"; // Change based on your route

      }

    // Optional: clear user state, etc.
    // api.dispatch(logoutUser());

    // Redirect to login

    return result;
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "manage_user",
    "chart",
    "booking",
    "service",
    "manage_image",
    "manage_date",
    "transition",
    "feedback-web",
    "setting",
    "notification",
    "gallary",
    "home",
    "feedback-db",
    "webProfile",
    "auth",
    "serviceAvility",
  ],
  endpoints: () => ({}),
});
