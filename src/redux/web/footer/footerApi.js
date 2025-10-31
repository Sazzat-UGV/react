import { baseApi } from "../../api/baseApi";

const footerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFooterApi: builder.query({
            query: (type) => ({
                url: `/pages?type=${type}`,
                method: "GET"
            }),
            providesTags: ['footer'],
        }),
    })
})


export const {useGetFooterApiQuery} = footerApi;