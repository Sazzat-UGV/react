
import BookingChart from "../../../components/dashboard/BookingChart"
import EarningChart from "../../../components/dashboard/EarningChart"
import { useGetDashboardChartApiQuery } from "../../../redux/dashboardFeatures/dashboardChart/dashboardChartApi"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"


const CommonDashboard = () => {
  const location = useLocation();
  const { data: chartData } = useGetDashboardChartApiQuery()
  const allChartData = chartData?.data
  const earningData = chartData?.data?.earning_statistics
  const bookingData = chartData?.data?.booking_statistics


  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Dashboard";
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Dashboard</title>
      </Helmet>
      <div>
        <div className="grid grid-cols-12 gap-[20px]">
          {/* <div className="col-span-4 h-[149px] bg-[#ffff]  p-[20px]  flex justify-between items-center border rounded-[20px]">
            <div className="w-full flex justify-between ">
              <div>
                <h2 className=" font-degular text-[24px]">Earnings</h2>
                <h2 className="font-semibold font-degular text-[36px] ">${allChartData?.earnings}</h2>
              </div>
              <img src="/dashboardCurdImage/photo1.svg" alt="" className="w-[50px] h-[50px]" />
            </div>
          </div> */}

          <div className="col-span-6 h-[149px] bg-[#ffff]  p-[20px]  flex justify-between items-center border rounded-[20px]">
            <div className="w-full flex justify-between ">
              <div>
                <h2 className=" font-degular text-[24px]">Appointments</h2>
                <h2 className="font-semibold font-degular text-[36px] ">{allChartData?.appointments}</h2>
              </div>
              <img src="/dashboardCurdImage/photo2.svg" alt="" className="w-[50px] h-[50px]" />
            </div>
          </div>

          <div className="col-span-6 h-[149px] bg-[#ffff]  p-[20px]  flex justify-between items-center border rounded-[20px]">
            <div className="w-full flex justify-between ">
              <div>
                <h2 className=" font-degular text-[24px]">Users</h2>
                <h2 className="font-semibold font-degular text-[36px] ">{allChartData?.users}</h2>
              </div>
              <img src="/dashboardCurdImage/photo3.svg" alt="" className="w-[50px] h-[50px]" />
            </div>
          </div>


        </div>

        {/* chart one/two components */}
        <div className="flex flex-col lg:flex-row justify-between gap-[20px] py-[20px]">

          <div className=" w-[100%] md:h-[650px] rounded-lg">
            <div className=" flex justify-between items-center">
              <h3 className="mb-3 px-3 text-[24px] font-degular font-semibold ">
                Booking Statistics
              </h3>
            </div>
            <BookingChart bookingData={bookingData} />
          </div>


          {/* <div className="w-[40%] md:h-[650px] rounded-lg">

            <div className="flex justify-between items-center">
              <h3 className="mb-3 px-3 text-[24px] font-degular font-semibold ">
                Earning Statistics
              </h3>
            </div>

            <EarningChart earningData={earningData} />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default CommonDashboard