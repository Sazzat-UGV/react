import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerApi: builder.mutation({
            query: (registerInof) => ({
                url: `/auth/register`,
                method: "POST",
                body: registerInof
            }),
            invalidatesTags: ['auth'],
        }),
        otpSendApi: builder.mutation({
            query: (otpInof) => ({
                url: `/auth/check-otp`,
                method: "POST",
                body: otpInof
            }),
            invalidatesTags: ['auth'],
        }),
        postAuthApi: builder.mutation({
            query: (authInfo) => ({
                url: `/auth/login`,
                method: "POST",
                body: authInfo
            }),
            invalidatesTags: ['auth'],
        }),
        logOutAuthApi: builder.mutation({
            query: () => ({
                url: `/auth/logout`,
                method: "POST",
            }),
            invalidatesTags: ['auth'],
        }),
        getProfileApi: builder.query({
            query: () => ({
                url: `/auth/profile`,
                method: "GET",
            }),
            providesTags: ['auth'],
        }),
        getServiceApi: builder.query({
            query: () => ({
                url: `/bookings`,
                method: "GET",
            }),
            providesTags: ['auth'],
        }),
        updateProfileApi: builder.mutation({
            query: (updateInfo) => ({
                url: `/auth/change-profile`,
                method: "POST",
                body: updateInfo,
            }),
            invalidatesTags: ['auth'],
        }),
        updateSinglePhotoApi: builder.mutation({
            query: (formData) => ({
                url: `/auth/change-profile-photo`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ['auth'],
        }),
        forgetPasswordApi: builder.mutation({
            query: (emailInfo) => ({
                url: `/auth/forgot-password`,
                method: "POST",
                body: emailInfo,
            }),
            invalidatesTags: ['auth'],
        }),
        resetPasswordApi: builder.mutation({
            query: (resetInfo) => ({
                url: `/auth/reset-password`,
                method: "POST",
                body: resetInfo,
            }),
            invalidatesTags: ['auth'],
        }),
        deleteApi: builder.mutation({
            query: (deleteInfo) => ({
                url: `/auth/profile-delete`,
                method: "POST",
                body:deleteInfo,
            }),
            invalidatesTags: ['auth'],
        }),
    })
})


export const { usePostAuthApiMutation, useOtpSendApiMutation, useRegisterApiMutation, useGetProfileApiQuery, useLogOutAuthApiMutation, useGetServiceApiQuery, useUpdateProfileApiMutation, useUpdateSinglePhotoApiMutation, useForgetPasswordApiMutation, useResetPasswordApiMutation, useDeleteApiMutation } = authApi;