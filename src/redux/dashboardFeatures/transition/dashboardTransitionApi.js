import { baseApi } from "../../api/baseApi";

const dashboardTransitionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransitionApi: builder.query({
            query: ({ per_page, page, search = "", filter }) => ({
                url: `/admin/transactions?per_page=${per_page}&page=${page}&search=${search}&filter=${filter}`,
                method: "GET"
            }),
            providesTags: ['transition'],
        }),
        filterBookingApi: builder.query({
            query: () => ({
                url: `/admin/services`,
                method: "GET"
            }),
            providesTags: ['booking'],
        }),
    })
})


export const { useGetTransitionApiQuery,useFilterBookingApiQuery } = dashboardTransitionApi;