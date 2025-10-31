import { baseApi } from "../../api/baseApi";



const dashboardBookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBookingApi: builder.query({
            query: ({ per_page, page, search = "", filter }) => ({
                url: `/admin/bookings?per_page=${per_page}&page=${page}&search=${search}&filter=${filter}`,
                method: "GET"
            }),
            providesTags: ['booking'],
        }),
        deleteBookingApi: builder.mutation({
            query: (deleteId) => ({
                url: `/admin/bookings/${deleteId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['booking'],
        }),
        getMarkComplateBookingApi: builder.query({
            query: (markId) => ({
                url: `/admin/booking-status/${markId}`,
                method: "GET"
            }),
            providesTags: ['booking'],
        }),
        getDetailsBookingApi: builder.query({
            query: (detailsId) => ({
                url: `/bookings/${detailsId}`,
                method: "GET"
            }),
            providesTags: ['booking'],
        }),
        // for filter booking
        filterBookingApi: builder.query({
            query: () => ({
                url: `/admin/services`,
                method: "GET"
            }),
            providesTags: ['booking'],
        }),
    })
})


export const { useGetBookingApiQuery, useDeleteBookingApiMutation, useGetMarkComplateBookingApiQuery, useGetDetailsBookingApiQuery, useFilterBookingApiQuery } = dashboardBookingApi;