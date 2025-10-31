import { baseApi } from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCarPhotoApi: builder.mutation({
            query: (carInfo) => ({
                url: `/car-photo`,
                method: "POST",
                body: carInfo
            }),
            invalidatesTags: ['webProfile'],
        }),
        updatePhotoApi: builder.mutation({
            query: ({updateInfo,id}) => ({
                url: `/car-photo/${id}`,
                method: "POST",
                body: updateInfo,
            }),
            invalidatesTags: ['webProfile'],
        }),
    })
})


export const { useAddCarPhotoApiMutation,useUpdatePhotoApiMutation} = profileApi;