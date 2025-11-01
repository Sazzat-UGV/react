import { baseApi } from "../../api/baseApi";

const pricingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPriceApi: builder.query({
            query: () => ({
                url: `/services`,
                method: "GET",
            }),
            providesTags: ['price'],
        }),
        // postSupportApi: builder.mutation({
        //     query: (supportInfo) => ({
        //         url: `/support-message`,
        //         method: "POST",
        //         body:supportInfo
        //     }),
        //     providesTags: ['price'],
        // }),
    })
})


export const {useGetPriceApiQuery} = pricingApi;