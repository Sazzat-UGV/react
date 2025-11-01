import { baseApi } from "../../api/baseApi";


const dashboardChartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardChartApi: builder.query({
            query: () => ({
                url: `/admin/dashboard`,
                method:"GET"
            }),
            providesTags: ['chart'],
        }),
    })
})


export const {useGetDashboardChartApiQuery} = dashboardChartApi;