import { baseApi } from "../../api/baseApi";

const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHomeApi: builder.query({
            query: () => ({
                url: `/home`,
                method: "GET"
            }),
            providesTags: ['home'],
        }),
    })
})


export const {useGetHomeApiQuery} = homeApi;