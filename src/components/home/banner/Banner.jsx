import { useNavigate } from "react-router-dom";
import CustomContainer from "../../shared/CustomContainer";
import GroupAvater from "../../shared/GroupAvater";
import { useGetHomeApiQuery } from "../../../redux/web/home/homeApi";
import { Rate } from "antd";
import CustomLoading from "../../shared/CustomLoading";

const Banner = () => {
  const navigate = useNavigate();


  const { data: getHome, isLoading } = useGetHomeApiQuery()
  const homeData = getHome?.data
  const happyClientPhoto = homeData?.latest_images
  const rating = homeData?.latest_comment?.rating
  const latestComment = homeData?.latest_comment?.user


  const handleServiceBookPage = () => {
    navigate("/service-book");
  };


  if (isLoading) {
    return <CustomLoading />
  }


  return (
    <section className="bg-[#f6f6f6] font-degular pt-20 lg:pt-[80px] ">
      <CustomContainer>
        <div className="xl:pb-[200px] ">
          <div className="pt-8 xl:py-16 ">
            <div className="flex flex-col xl:flex-row justify-between ">
              <div className="max-w-[705px] text-wrap md:mt-[0px] xl:mt-[100px] ">
                <h1 className="font-semibold text-[30px] lg:text-[58px] ">
                  Keep your <span className="text-primary">car clean</span> anywhere
                </h1>
                <p className="text-[24px] lg:text-[28px]">
                  Mobile car detailing services in Lakewood Ranch
                </p>
                <div className="pt-[60px] flex items-center gap-2">
                  <button onClick={() => handleServiceBookPage()} className="bg-primary text-[#ffff] text-[20px] py-2 md:py-4 px-[40px] md:px-[57px] rounded-full">
                    Book Now
                  </button>
                  <button onClick={() => handleServiceBookPage()} className="bg-primary text-[#ffff] p-4 md:p-6 rounded-full">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.843277 10.7425L9.03582 2.55001L2.67186 2.55001L2.67185 0.550313H12.4497L12.4497 10.3282L10.45 10.3282L10.45 3.96422L2.25749 12.1568L0.843277 10.7425Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>

                {/* group avater component */}
                <div className="h-[50px] xl:h-[220px] w-full md:mb-2">
                </div>
              </div>


              {/* right side image */}
              <div className="relative flex justify-center items-center">
                {/* medium and large device  */}
                <div className="hidden xl:mt-16 md:block">
                  <img src="/bannerCar1.png" alt="car" />
                </div>



                {/* small device  */}
                <div className="absolute top-[0px] left-0 right-0 mx-auto flex justify-center  z-10 md:hidden">
                  <img src="/bannerCar1.png" alt="car" className=" w-[300px]" />
                </div>

              </div>
            </div>
          </div>



          {/* service section */}
          <div className="absolute left-0 right-0 xl:flex justify-center mt-10 hidden">
            <div className="flex justify-center items-center gap-4 ">
              <div className="md:h-[359px] md:w-[439px] lg:w-[400px] flex flex-col justify-center items-center px-[53px] bg-[#FFFFFF] rounded-[37px]">
                <img src="/service/serviceLogo1.svg" alt="" />
                <h3 className="font-degular text-primary text-[30px] font-semibold">
                  Premium Service
                </h3>
                <p className="text-[16px] font-montserrat text-[#000000] text-center">
                  Professional car washing ensures thorough cleaning, detailing, and
                  protection using advanced techniques, eco-friendly products, and
                  expert care for vehicle maintenance.
                </p>
              </div>
              <div className="md:h-[359px] md:w-[439px] lg:w-[400px] flex flex-col justify-center items-center px-[53px] bg-[#FFFFFF] rounded-[37px]">
                <img src="/service/serviceLogo2.svg" alt="" />
                <h3 className="font-degular text-primary text-[30px] font-semibold">
                  Advanced Equipment
                </h3>
                <p className="text-[16px] font-montserrat text-[#000000] text-center">
                  High-end car washing equipment includes advanced pressure washers, foam cannons, steam cleaners for superior cleaning and protection.
                </p>
              </div>
              <div className="md:h-[359px] md:w-[439px] lg:w-[400px] flex flex-col justify-center items-center px-[53px] bg-[#FFFFFF] rounded-[37px]">
                <img src="/service/serviceLogo3.svg" alt="" />
                <h3 className="font-degular text-primary text-[30px] font-semibold">
                  Affordable Pricing
                </h3>
                <p className="text-[16px] font-montserrat text-[#000000] text-center">
                  Offering the best pricing in mobile car washing with affordable rates, premium service, customized packages, and great value for top-quality vehicle care.
                </p>
              </div>
            </div>
          </div>



        </div>
      </CustomContainer>






      {/* small / medium device for */}
      <div className="w-full mx-auto  xl:hidden px-4 pb-6 pt-[240px] md:pt-16 xl:pt-[400px] lg:pb-[40px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col  bg-[#FFFFFF] rounded-[37px] py-6 px-3">

            <img src="/service/serviceLogo1.svg" alt="" className="w-[60px] mx-auto" />
            <h3 className="font-degular text-primary text-[20px] text-center pt-4">
              Professional Services
            </h3>

            <p className="text-[16px] font-degular text-gray-700 text-wrap text-center pt-4">
              Professional car washing ensures thorough cleaning, detailing, and
              protection using advanced techniques, eco-friendly products, and
              expert care for vehicle maintenance.
            </p>
          </div>

          <div className="flex flex-col  bg-[#FFFFFF] rounded-[37px] py-6 px-3">
            <img src="/service/serviceLogo2.svg" alt="" className="w-[60px] mx-auto" />
            <h3 className="font-degular text-primary text-[20px] text-center pt-4">
              Professional Equipment
            </h3>

            <p className="text-[16px] font-degular text-gray-700 text-wrap text-center pt-4">
              High-end car washing equipment includes advanced pressure washers, foam cannons, steam cleaners for superior cleaning and protection.
            </p>
          </div>

          <div className="flex flex-col  bg-[#FFFFFF] rounded-[37px] py-6 px-3">
            <img src="/service/serviceLogo3.svg" alt="" className="w-[60px] mx-auto" />
            <h3 className="font-degular text-primary text-[20px] text-center pt-4">
              Best Pricing
            </h3>

            <p className="text-[16px] font-degular text-gray-700 text-wrap text-center pt-4">
              Offering the best pricing in mobile car washing with affordable rates, premium service, customized packages, and great value for top-quality vehicle care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
