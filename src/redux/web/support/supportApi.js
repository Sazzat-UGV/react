import { baseApi } from "../../api/baseApi";

const supportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postSupportApi: builder.mutation({
            query: (supportInfo) => ({
                url: `/support-message`,
                method: "POST",
                body:supportInfo
            }),
            providesTags: ['support'],
        }),
    })
})


export const {usePostSupportApiMutation} = supportApi;