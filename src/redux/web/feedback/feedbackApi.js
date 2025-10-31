import { baseApi } from "../../api/baseApi";

const feedbackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbackApi: builder.query({
            query: () => ({
                url: `/feedback`,
                method: "GET"
            }),
            providesTags: ['feedback-web'],
        }),
    })
})


export const {useGetFeedbackApiQuery} = feedbackApi;