import { useNavigate } from "react-router-dom";
import CommonTitle from "../../shared/CommonTitle";
import CustomContainer from "../../shared/CustomContainer";

const Choose = () => {
  const navigate = useNavigate();

  const handleServiceBookPage = () => {
    navigate("/service-book");
  };
  return (
    <section className="bg-[#f6f6f6]">
      <CustomContainer>
        <div className=" mt-[30px]">
          <div className="flex flex-col lg:flex-row justify-between gap-8 pt-[40px] lg:pt-[300px]">
            <div className="order-2 lg:order-1">
              <CommonTitle text={"Why Choose Us?"} />
              <p className="text-[24px] text-wrap font-degular pt-3 text-primary">
                Our name comes from our mission to transform challenges into shining successes. A portion of our profits is donated to community schools. We
                thank you for your business.
              </p>
              <h3 className="font-semibold font-degular text-[32px] text-[#000000] pt-[25px] pb-[34px]">
                Our Commitment
              </h3>
              {/* list items */}
              <div>

                <p className="text-[20px] md:text-[24px] font-degular flex gap-2">
                  <span className="mt-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM8.823 12.14L6.058 9.373L5 10.431L8.119 13.552C8.30653 13.7395 8.56084 13.8448 8.826 13.8448C9.09116 13.8448 9.34547 13.7395 9.533 13.552L15.485 7.602L14.423 6.54L8.823 12.14Z"
                        fill="#0063E6"
                      />
                    </svg>
                  </span>
                  Premium Service – Expert car cleaning with attention to
                  detail.
                </p>

                <p className="text-[20px] md:text-[24px] font-degular flex gap-2">
                  <span className="mt-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM8.823 12.14L6.058 9.373L5 10.431L8.119 13.552C8.30653 13.7395 8.56084 13.8448 8.826 13.8448C9.09116 13.8448 9.34547 13.7395 9.533 13.552L15.485 7.602L14.423 6.54L8.823 12.14Z"
                        fill="#0063E6"
                      />
                    </svg>
                  </span>
                  Advanced Equipment – High-end tools for superior results.
                </p>

                <p className="text-[20px] md:text-[24px] font-degular flex gap-2">
                  <span className="mt-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM8.823 12.14L6.058 9.373L5 10.431L8.119 13.552C8.30653 13.7395 8.56084 13.8448 8.826 13.8448C9.09116 13.8448 9.34547 13.7395 9.533 13.552L15.485 7.602L14.423 6.54L8.823 12.14Z"
                        fill="#0063E6"
                      />
                    </svg>
                  </span>
                  Affordable Pricing – Best value with competitive rates.
                </p>


                <p className="text-[20px] md:text-[24px] font-degular flex gap-2">
                  <span className="mt-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM8.823 12.14L6.058 9.373L5 10.431L8.119 13.552C8.30653 13.7395 8.56084 13.8448 8.826 13.8448C9.09116 13.8448 9.34547 13.7395 9.533 13.552L15.485 7.602L14.423 6.54L8.823 12.14Z"
                        fill="#0063E6"
                      />
                    </svg>
                  </span>
                  Eco-Friendly Approach – Water-saving and biodegradable
                  products.
                </p>

                <p className="text-[20px] md:text-[24px] font-degular flex gap-2">
                  <span className="mt-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM8.823 12.14L6.058 9.373L5 10.431L8.119 13.552C8.30653 13.7395 8.56084 13.8448 8.826 13.8448C9.09116 13.8448 9.34547 13.7395 9.533 13.552L15.485 7.602L14.423 6.54L8.823 12.14Z"
                        fill="#0063E6"
                      />
                    </svg>
                  </span>
                  Customer Satisfaction – Your car comes FULL CIRCLE every time.
                </p>

                <div className="pt-8 lg:pt-[137px] flex items-center gap-2">
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
              </div>
            </div>

            {/* right site image */}
            <div className="order-1 lg:order-2 pb-20 md:pb-44 lg:pb-0 flex justify-center">
              <div className="relative flex justify-center items-center w-full">
                <img
                  src="/choose/photo1.png"
                  alt="choose"
                  className="w-[70%] md:w-[60%] lg:w-full"
                />

                <img
                  src="/choose/photo2.png"
                  alt="choose"
                  className="absolute w-[70%] md:w-[60%] lg:w-full top-[40%] right-[30%] md:right-[40%] lg:right-[40%]"
                />
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default Choose;
