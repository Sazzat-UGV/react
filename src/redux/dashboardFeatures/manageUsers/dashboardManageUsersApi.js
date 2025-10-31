import { baseApi } from "../../api/baseApi";

const dashboardUsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserApi: builder.query({
            query: ({ per_page, page, search = "" }) => ({
                url: `/admin/users?per_page=${per_page}&page=${page}&search=${search}`,
                method: "GET"
            }),
            providesTags: ['manage_user'],
        }),
        detailsUserApi: builder.query({
            query: (detailsId) => ({
                url: `/admin/users/${detailsId}`,
                method: "GET"
            }),
            providesTags: ['manage_user'],
        }),
        deleteUserApi: builder.mutation({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: "DELETE"
            }),
            providesTags: ['manage_user'],
        }),
    })
})


export const { useGetUserApiQuery, useDetailsUserApiQuery ,useDeleteUserApiMutation } = dashboardUsersApi;