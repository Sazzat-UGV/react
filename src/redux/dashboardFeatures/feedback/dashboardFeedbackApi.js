import { baseApi } from "../../api/baseApi";

const dashboardFeedbackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDBFeedbackApi: builder.query({
            query: ({per_page,page}) => ({
                url: `/admin/feedbacks?per_page=${per_page}&page=${page}`,
                method: "GET"
            }),
            providesTags: ['feedback-db'],
        }),
        deleteFeedback: builder.mutation({
            query: (deleteId) => ({
                url: `/admin/feedbacks/${deleteId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['feedback-db'],
        }),
        postFeedback: builder.mutation({
            query: (feedbackInfo) => ({
                url: `/feedbacks`,
                method: "POST",
                body:feedbackInfo,
            }),
            invalidatesTags: ['feedback-db'],
        }),

    })
})


export const {useGetDBFeedbackApiQuery, useDeleteFeedbackMutation,usePostFeedbackMutation } = dashboardFeedbackApi;