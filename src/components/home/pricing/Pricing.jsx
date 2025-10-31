
import { Modal } from "antd";
import CommonTitle from "../../shared/CommonTitle";
import CustomContainer from "../../shared/CustomContainer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetPriceApiQuery } from "../../../redux/web/pricing/pricingApi";

const Pricing = () => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectId, setSelectId] = useState('')
  const [singlePriceValue, setSinglePriceValue] = useState({})

  const { data: getPrice } = useGetPriceApiQuery();
  const priceData = getPrice?.data
  // console.log(getPrice)

  // console.log(singlePriceValue)
  // console.log(token,role)


  const showModal = (item) => {

    setSelectId(item?.id)
    setSinglePriceValue(item)
    setModalOpen(true)


  }
  const handleModalOkPenOk = () => {

  }
  const handleModalCancel = () => {
    setModalOpen(false)
  }


  const handlePrice = (id, type, name, price) => {
    navigate(`/service-availability`, { state: { id, type, name, price, singlePriceValue } })
  }




  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup function
    };
  }, [modalOpen]);




  return (
    <section className="bg-[#f6f6f6] w-full overflow-x-auto pt-20 lg:pt-32">
       <CustomContainer>
        {
          priceData?.length > 0 ? <div>
          <CommonTitle text={"Pricing"} />
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="min-w-[1000px]">
              {priceData?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-12 border rounded-xl mb-4 p-2 lg:p-4 font-degular"
                  >
                    <div className="col-start-1 col-end-4 flex items-center">
                      <h1 className="text-[28px] lg:text-[30px]">{item?.car_type}</h1>
                    </div>

                    <div className="col-start-4 col-end-10  flex items-center gap-4">
                      <div className=" lg:w-[300px]">
                        <p className="text-[20px] lg:text-[24px]">Interior</p>
                        <p className="text-[28px] lg:text-[48px] font-semibold text-primary">
                          ${item?.interior}
                        </p>
                      </div>
                      <div className=" lg:w-[300px]">
                        <p className="lg:text-[24px] ">Exterior</p>
                        <p className="text-[28px] lg:text-[48px] font-semibold text-primary ">
                          ${item?.exterior}
                        </p>
                      </div>
                      <div className=" lg:w-[300px]">
                        <p className="lg:text-[24px]">Both</p>
                        <p className="text-[28px] lg:text-[48px] font-semibold text-primary">
                          ${item.both}
                        </p>
                      </div>
                    </div>

                    <div className="col-start-10 col-end-13  flex justify-end items-center ">
                      <button onClick={() => showModal(item)} className="bg-primary h-[60px] flex justify-center items-center text-[#ffffff] px-[74px] py-2 lg:py-[14px] text-[24px] rounded-full m-2">
                        Select
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        :
        ''
        }

        {/* modal component  */}
        <Modal
          centered
          title={
            <div className="text-center bg-primary text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
             {singlePriceValue?.car_type}
            </div>
          }
          open={modalOpen}
          onOk={handleModalOkPenOk}
          onCancel={handleModalCancel}
          footer={null}
          width={600}
          className='custom-service-modal'
        >
          <p className='text-[24px] font-degular font-medium text-center py-8'>Please select a service</p>

          {/* interior card */}
          <div className="pb-4">
            <div className='px-4'>
              <div 
              onClick={() => handlePrice((singlePriceValue?.id),(singlePriceValue?.car_type), ("Interior"), (singlePriceValue?.interior))}
              className='cursor-pointer flex justify-between items-center border border-[#ccc] rounded-xl p-4 mb-4 hover:bg-primary hover:bg-opacity-15'>
                <div>
                  <p className='text-[24px] font-degular'>Interior</p>
                  <p className='text-[24px] font-degular font-semibold text-primary'>${singlePriceValue?.interior}</p>
                </div>
                <span className="cursor-pointer">
                  <svg
                    className="w-[30px] md:w-[40px] lg:w-[60px] h-auto"
                    viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" rx="30" fill="#0063E6" />
                    <path d="M23.8433 34.7425L32.0358 26.55L25.6719 26.55L25.6719 24.5503H35.4497L35.4497 34.3282L33.45 34.3282L33.45 27.9642L25.2575 36.1568L23.8433 34.7425Z" fill="white" />
                  </svg>
                </span>
              </div>
            </div>

            {/* exterior card */}
            <div className='px-4'>
              <div 
              onClick={() => handlePrice((singlePriceValue?.id),(singlePriceValue?.car_type), ("Exterior"), (singlePriceValue?.exterior))}
              className='cursor-pointer flex justify-between items-center border border-[#ccc] rounded-xl p-4 mb-4 hover:bg-primary hover:bg-opacity-15'>
                <div>
                  <p className='text-[24px] font-degular'>Exterior</p>
                  <p className='text-[24px] font-degular font-semibold text-primary'>${singlePriceValue?.exterior}</p>
                </div>
                <span  className="cursor-pointer">
                  <svg
                    className="w-[30px] md:w-[40px] lg:w-[60px] h-auto"
                    viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" rx="30" fill="#0063E6" />
                    <path d="M23.8433 34.7425L32.0358 26.55L25.6719 26.55L25.6719 24.5503H35.4497L35.4497 34.3282L33.45 34.3282L33.45 27.9642L25.2575 36.1568L23.8433 34.7425Z" fill="white" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Both card*/}
            <div className='px-4'>
              <div 
              onClick={() => handlePrice((singlePriceValue?.id),(singlePriceValue?.car_type), ("Both"), (singlePriceValue?.both))}
              className='cursor-pointer flex justify-between items-center border border-[#ccc] rounded-xl p-4 mb-4 hover:bg-primary hover:bg-opacity-15'>
                <div>
                  <p className='text-[24px] font-degular'>Both</p>
                  <p className='text-[24px] font-degular font-semibold text-primary'>${singlePriceValue?.both}</p>
                </div>
                <span  className="cursor-pointer">
                  <svg
                    className="w-[30px] md:w-[40px] lg:w-[60px] h-auto"
                    viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" rx="30" fill="#0063E6" />
                    <path d="M23.8433 34.7425L32.0358 26.55L25.6719 26.55L25.6719 24.5503H35.4497L35.4497 34.3282L33.45 34.3282L33.45 27.9642L25.2575 36.1568L23.8433 34.7425Z" fill="white" />
                  </svg>
                </span>
              </div>
            </div>
          </div>


        </Modal>
      </CustomContainer>
    </section>
  );
};

export default Pricing;
