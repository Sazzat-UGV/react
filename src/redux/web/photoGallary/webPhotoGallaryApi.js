import { baseApi } from "../../api/baseApi";

const webPhotoGallaryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPhotoGallaryApi: builder.query({
            query: () => ({
                url: `/photo-gallery`,
                method: "GET"
            }),
            providesTags: ['gallary'],
        }),
    })
})


export const {useGetPhotoGallaryApiQuery} = webPhotoGallaryApi;