import { baseApi } from "../../api/baseApi";

const dashboardManageImagesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPhotoApi: builder.query({
            query: ({per_page,page}) => ({
                url: `/admin/photo-gallery?per_page=${per_page}&page=${page}`,
                method: "GET"
            }),
            providesTags: ['manage_image'],
        }),
        addPhoto: builder.mutation({
            query: (imageInfo) => ({
                url: `/admin/photo-gallery`,
                method: "POST",
                body:imageInfo
            }),
            invalidatesTags: ['manage_image'],
        }),
        updatePhoto: builder.mutation({
            query: ({ id,photo }) => ({
                url: `/admin/photo-gallery/${id}`,
                method: "POST",
                body:photo,
            }),
            invalidatesTags: ['manage_image'],
        }),
        deletePhoto: builder.mutation({
            query: (deleteId) => ({
                url: `/admin/photo-gallery/${deleteId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['manage_image'],
        }),

    })
})


export const {useGetPhotoApiQuery,useAddPhotoMutation,useUpdatePhotoMutation,useDeletePhotoMutation} = dashboardManageImagesApi;