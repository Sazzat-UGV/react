import { baseApi } from "../../api/baseApi";

const serviceAvilityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceAvilityApi: builder.query({
            query: () => ({
                url: `/manage-dates`,
                method: "GET",
            }),
            providesTags: ['serviceAvility'],
        }),
        
        getTimeApi: builder.query({
            query: ({service_id,date}) => ({
                url: `/get_free_times?service_id=${service_id}&date=${date}`,
                method: "GET",
            }),
            providesTags: ['serviceAvility'],
        }),
        createIntent: builder.mutation({
            query: (data) => ({
                url: `/booking-intent`,
                method: "POST",
                body : data
            }),
            invalidatesTags: ['serviceAvility'],
        }),
        bookingSuccess: builder.mutation({
            query: (data) => ({
                url: `/bookings`,
                method: "POST",
                body : data
            }),
            invalidatesTags: ['serviceAvility'],
        }),
    })
})


export const {useGetServiceAvilityApiQuery,useGetTimeApiQuery, useBookingSuccessMutation,useCreateIntentMutation} = serviceAvilityApi;