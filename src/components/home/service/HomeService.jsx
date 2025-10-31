import { useNavigate } from "react-router-dom"
import CommonTitle from "../../shared/CommonTitle"
import CustomContainer from "../../shared/CustomContainer"


const HomeService = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/pricing')
    }
    return (
        <section className="bg-[#f6f6f6] pt-20 lg:pt-32">
            <CustomContainer>
                <div className="pb-[22px]">
                    <CommonTitle text={"Our Services"} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] lg:gap-x-[24px]  gap-y-[16px] lg:gap-y-[24px]">
                    {/* card one */}
                    <div onClick={handleNavigate} className="relative cursor-pointer">
                        <div className="relative">
                            <img
                                src="/ourServices/service1.png"
                                alt=""
                                className="w-full h-full object-cover rounded-[20px]"
                            />
                            {/* Overlay Layer */}
                            <div
                                className="absolute inset-0 rounded-[20px]"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)'
                                }}
                            ></div>
                            <div className="absolute inset-0 top-[82%] md:top-[84%] lg:top-[88%] left-[5%] text-[#ffff]">
                                <p className="lg:text-[20px] font-medium font-degular">Interior Cleaning</p>
                            </div>

                        </div>
                        <p className="absolute top-0 bg-primary w-10 h-10 md:w-16 md:h-16 lg:w-20  lg:h-20 rounded-[10px] flex justify-center items-center text-[#ffff] text-[20px] md:text-[34px] lg:text-[48px] font-semibold font-degular ring-4 md:ring-8 ring-[#f6f6f6]">
                            01
                        </p>
                    </div>
                    {/* card two */}
                    <div onClick={handleNavigate} className="relative cursor-pointer">
                        <div className="relative">
                            <img
                                src="/ourServices/service2.png"
                                alt=""
                                className="w-full h-full object-cover rounded-[20px]"
                            />
                            {/* Overlay Layer */}
                            <div
                                className="absolute inset-0 rounded-[20px]"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)'
                                }}
                            ></div>


                            <div className="absolute inset-0 top-[82%] md:top-[84%] lg:top-[88%] left-[5%] text-[#ffff]">
                                <p className="lg:text-[20px] font-medium font-degular">Exterior Cleaning</p>
                            </div>

                        </div>
                        <p className="absolute top-0 bg-primary w-10 h-10 md:w-16 md:h-16 lg:w-20  lg:h-20 rounded-[10px] flex justify-center items-center text-[#ffff] text-[20px] md:text-[34px] lg:text-[48px] font-semibold font-degular ring-4 md:ring-8 ring-[#f6f6f6]">
                            02
                        </p>
                    </div>


                </div>
            </CustomContainer>
        </section>
    )
}

export default HomeService