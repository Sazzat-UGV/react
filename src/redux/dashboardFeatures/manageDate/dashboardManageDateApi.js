import { baseApi } from "../../api/baseApi";

const dashboardManageDateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlockedDateApi: builder.query({
            query: () => ({
                url: `/admin/manage-dates`,
                method: "GET"
            }),
            providesTags: ['manage_date'],
        }),
        addBlockDateApi: builder.mutation({
            query: (blockInfo) => ({
                url: `/admin/manage-dates`,
                method: "POST",
                body:blockInfo
            }),
            invalidatesTags: ['manage_date'],
        }),
        deleteUnBlockDateApi: builder.mutation({
            query: (id) => ({
                url: `/admin/manage-dates/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['manage_date'],
        }),

    })
})


export const {useGetBlockedDateApiQuery,useAddBlockDateApiMutation,useDeleteUnBlockDateApiMutation} = dashboardManageDateApi;