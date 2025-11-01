import { baseApi } from "../../api/baseApi";

const dashboardServiceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDetailsServiceApi: builder.query({
            query: (detailsId) => ({
                url: `/admin/services/${detailsId}`,
                method: "GET"
            }),
            providesTags: ['service'],
        }),
        addService: builder.mutation({
            query: (serviceInfo) => ({
                url: `/admin/services`,
                method: "POST",
                body: serviceInfo
            }),
            invalidatesTags: ['service'],
        }),
        updateService: builder.mutation({
            query: ({ updateInfo, id }) => ({
                url: `/admin/services/${id}`,
                method: "POST",
                body: updateInfo
            }),
            invalidatesTags: ['service'],
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/admin/services/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['service'],
        }),
        getService: builder.query({
            query: () => ({
                url: `/admin/services`,
                method: "GET",
            }),
            invalidatesTags: ['service'],
        }),
        addTime: builder.mutation({
            query: (addTimeInfo) => ({
                url: `/admin/service_times`,
                method: "POST",
                body: addTimeInfo
            }),
            invalidatesTags: ['service'],
        }),
        deleteTime: builder.mutation({
            query: (deleteId) => ({
                url: `/admin/service_times/${deleteId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['service'],
        }),
        updateTime: builder.mutation({
            query: ({updateTimeInfo,id}) => ({
                url: `/admin/service_times/${id}`,
                method: "POST",
                body: updateTimeInfo,
            }),
            invalidatesTags: ['service'],
        }),

    })
})


export const { useGetDetailsServiceApiQuery, useAddServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation, useGetServiceQuery, useAddTimeMutation, useDeleteTimeMutation,useUpdateTimeMutation } = dashboardServiceApi;