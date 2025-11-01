import { baseApi } from "../../api/baseApi";

const dashboardSettingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postSettingApi: builder.mutation({
            query: (settingInfo) => ({
                url: `/admin/pages`,
                method: "POST",
                body: settingInfo,
            }),
            invalidatesTags: ['setting'],
        }),
        getSettingApi: builder.query({
            query: ({ type, }) => ({
                url: `/admin/pages?type=${type}`,
                method: "GET",
            }),
            providesTags: ['setting'],
        }),
        getAuthProfileApi: builder.query({
            query: () => ({
                url: `/auth/profile`,
                method: "GET",
            }),
            providesTags: ['setting'],
        }),
        updateAuthProfileApi: builder.mutation({
            query: (updateInfo) => ({
                url: `/auth/change-profile`,
                method: "POST",
                body: updateInfo,
            }),
            invalidatesTags: ['setting'],
        }),
        updatePasswordApi: builder.mutation({
            query: (updatePasswordInfo) => ({
                url: `/auth/change-password`,
                method: "POST",
                body: updatePasswordInfo,
            }),
            invalidatesTags: ['setting'],
        }),
    })
})


export const { usePostSettingApiMutation, useGetSettingApiQuery,useGetAuthProfileApiQuery,useUpdateAuthProfileApiMutation,useUpdatePasswordApiMutation } = dashboardSettingApi;