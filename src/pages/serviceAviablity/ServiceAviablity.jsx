import { Link, useLocation, useNavigate } from "react-router-dom"
import CustomContainer from "../../components/shared/CustomContainer"
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useGetServiceAvilityApiQuery, useGetTimeApiQuery } from "../../redux/web/serviceAvility/serviceAvilityApi";
import moment from "moment";
import { Form, Input, Modal } from "antd";
import { Helmet } from "react-helmet-async";







const ServiceAviablity = () => {
  const [formOne] = Form.useForm();
  const navigate = useNavigate();
  const [activeTimes, setActiveTimes] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNextButton, setActiveNextButton] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // send
  const [selectedDateTow, setSelectedDateTwo] = useState(null); // send
  const [bookingTime, setBookingTime] = useState(null); // send
  const [stateAddress, setStateAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

  const location = useLocation();
  const { id, type, name, price, singlePriceValue } = location.state || {};


  const [serviceData, setServiceData] = useState({
    id: id || "",
    type: type || "",
    name: name || "",
    price: price || 0,
  });













  const { data: getBlockService } = useGetServiceAvilityApiQuery()
  const blockServiceDate = getBlockService?.data?.data;

  


  const { data: timeData, isLoading, isFetching } = useGetTimeApiQuery({ service_id: id, date: moment(selectedDate)?.format("YY-MM-DD") })



  const today = new Date();
  const disabledBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Get array of already blocked dates
    // Get array of already blocked dates
const blockedDates = blockServiceDate?.map(item => {
    const date = new Date(item.date);
    date.setDate(date.getDate() + 1);
    return date;
}) || [];

  // ==================== date formate and ui show start ==========================
  const date = new Date('Sun Jun 29 2025 00:00:00 GMT+0600');

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = months[date.getMonth()]; // "June"
  const singleDay = date.getDate(); // 29
  const singleYear = date.getFullYear(); // 2025

  const singleFormattedDate = `${monthName} ${singleDay}, ${singleYear}`;
  // console.log("singleFormattedDate", singleFormattedDate); 

  // ==================== date formate and ui show end ============================












  // ✅ Local date format function (YYYY-MM-DD)
  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 🔹 User date select handler
  // const handleDateSelect = (date) => {
  //   if (date) {
  //     setSelectedDate(date);
  //   }
  // };

  // console.log(selectedDate)


  const handleDateSelect = (date) => {

    if (date) {
      // Get local date components (avoids timezone issues)

      setSelectedDate(date);
      const displayOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const displayDate = date.toLocaleDateString('en-US', displayOptions);
      setSelectedDateTwo(displayDate)
    }


  };

  const onFinishOne = (values) => {
    setStateAddress(values.street_address);
    setZipCode(values.zip_code);
  }


  const handleCheckoutPage = () => {
    const values = formOne.getFieldsValue(); // Get all form values

    const stateAddress = values.street_address;
    const zipCode = values.zip_code;

    if (activeTimes.length === 0) return; // Do nothing if nothing is selected
    navigate(`/checkout`, { state: { serviceData, stateAddress, zipCode, selectedDate, bookingTime, singlePriceValue } });
  }



  const handleSelectTime = (tmv) => {
    setBookingTime(tmv)
    setActiveNextButton(true)
  }



  // single modal 
  const showModal = () => {
    setModalOpen(true)
  }
  const handleModalOkPenOk = () => {

  }
  const handleModalCancel = () => {
    setModalOpen(false)
  }


  const handlePrice = (id, type, name, price) => {
    setServiceData({
      id,
      type,
      name,
      price,
    });

    setModalOpen(false)
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



  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Service Availability";
  }, [location.pathname]);




  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Service Availability</title>
      </Helmet>
      <section className=" pt-10 lg:pt-[120px] pb-[52px] bg-[#f6f6f6] transition-all duration-500 ">
        <CustomContainer>
          <div className="">
            <div className="flex items-center">
              <div>
                <span onClick={() => navigate(-1)} className="cursor-pointer">
                  <svg
                    className="w-[30px] md:w-[40px] lg:w-[60px] h-auto"
                    viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" rx="30" fill="#0063E6" />
                    <path d="M37.707 31.0001H26.121L30.621 35.5001L29.207 36.9141L22.293 30.0001L29.207 23.0861L30.621 24.5001L26.121 29.0001H37.707V31.0001Z" fill="white" />
                  </svg>
                </span>
              </div>

              <div className="flex justify-center w-full">
                <h2 className='text-[20px] md:text-[50px] font-medium font-degular'>Requested Service Location</h2>
              </div>
            </div>


            <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 pt-0 lg:pt-8 min-h-[200px]">
              {/* FORM VALIDATION */}
              <div className="lg:w-[55%] py-4 ">
                <Form form={formOne} onFinish={onFinishOne}>

                  <div className="flex pt-4 lg:pt-0">
                    <div className="w-full">
                      <div className=" flex flex-col md:flex-row items-center md:gap-6 pt-0 lg:pt-6">
                        {/* Street address */}
                        <div
                          className="w-full lg:w-[70%]"
                        >
                          <Form.Item name="street_address"
                            rules={[
                              { required: true, message: "Please enter your street address" },
                            ]}
                          >
                            <Input
                              placeholder="Street address"
                              style={{
                                background: "transparent",
                                height: "60px",
                                borderRadius: "20px",
                                paddingInline: "20px",
                                border: "1px solid #ccc",
                              }}
                            />
                          </Form.Item>
                        </div>

                        {/* Zip code*/}
                        <div className="w-full lg:w-[30%] ">
                          <Form.Item name="zip_code"
                            rules={[
                              { required: true, message: "Please enter your zip code" },
                            ]}
                          >
                            <Input
                              onInput={(e) => {
                                e.target.value = e.target.value
                                  .replace(/[^0-9]/g, "")
                                  .slice(0, 6);
                              }}
                              placeholder="Zip code"
                              style={{
                                background: "transparent",
                                height: "60px",
                                borderRadius: "20px",
                                paddingInline: "20px",
                                border: "1px solid #ccc",
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      {/* date picker conponent */}
                      <p className='text-[20px]  font-medium font-degular'>Select Date</p>

                      <div className="bg-gray-100 shadow-md p-4 w-full max-w-md mx-auto md:max-w-full  h-auto sm:h-[300px] md:h-[340px] lg:h-[360px] overflow-auto">
                        <DayPicker
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={[
                            { before: disabledBefore }, // Disable past dates
                            ...blockedDates.map(date => ({ from: date, to: date })) // Disable already blocked dates
                          ]}
                          modifiers={{ today: new Date() }}
                          modifiersClassNames={{
                            disabled: "cursor-not-allowed opacity-50",
                            selected: "bg-primary text-white",
                            today: "text-primary "
                          }}
                        />
                      </div>
                    </div>



                  </div>



                  {isLoading || isFetching ? <div>loading...</div> :
                    <div className=" mt-8">


                      {
                        timeData?.data?.length > 0 && <p className='text-[20px]  font-medium font-degular py-4'>Select Time</p>
                      }

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center md:place-items-baseline gap-y-4">
                        {
                          timeData?.data?.length > 0 ? (
                            timeData?.data.map((singleTime, index) => {
                              return (
                                <div
                                  key={index}
                                  onClick={() => {
                                    setActiveNextButton(true)
                                    setBookingTime(singleTime)
                                  }}
                                  className={`w-fit px-[80px] xl:px-[60px] py-2 hover:bg-primary hover:text-[#ffff] text-[20px] cursor-pointer rounded-lg ${bookingTime === singleTime ? "bg-primary text-[#ffff]" : "bg-[#ffff]"
                                    }`}
                                >
                                  {singleTime}
                                </div>
                              );
                            })
                          ) : (
                            <div>
                              <p className='text-[28px]  font-bold font-degular'>Today is {moment(selectedDate).format("ll")}. </p>
                              <p className='text-[20px]  font-degular'>No availability </p>

                            </div>
                          )
                        }
                      </div>

                      {

                        <button type="submit" disabled={!activeNextButton}
                          onClick={async () => {
                            try {
                              await formOne.validateFields(); // Trigger validation manually
                              handleCheckoutPage(); // If validation passes
                            } catch (errorInfo) {
                              // Validation failed — do nothing or show error
                              console.log("Validation failed:", errorInfo);
                            }
                          }}
                          className={`w-full flex justify-center items-center  text-[20px] py-2 md:py-4  rounded-full gap-2 my-8 ${activeNextButton ? "bg-primary text-[#ffff] cursor-pointer" : "bg-gray-300 text-[#ffff] cursor-not-allowed"}`}>
                          Next
                          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.29425e-05 6L11.5861 6L7.08606 1.5L8.50006 0.0859985L15.4141 7L8.50006 13.914L7.08606 12.5L11.5861 8L6.29425e-05 8V6Z" fill="white" />
                          </svg>
                        </button>
                      }
                    </div>
                  }
                </Form>

              </div>

              <div className="lg:w-[45%] p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <p className='text-[20px]  font-medium font-degular'>Appointment Summary</p>
                  <button onClick={() => showModal()} className="flex items-center gap-2 border border-primary px-4 py-2 rounded text-[16px] font-semibold text-primary font-degular"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.71 4.04125C18.1 3.65125 18.1 3.00125 17.71 2.63125L15.37 0.291249C15 -0.0987512 14.35 -0.0987512 13.96 0.291249L12.12 2.12125L15.87 5.87125M0 14.2512V18.0012H3.75L14.81 6.93125L11.06 3.18125L0 14.2512Z" fill="#0063E6" />
                  </svg>
                    Change</button>
                </div>
                <div className="flex flex-col md:flex-row justify-between border border-[#ccc] rounded-lg p-4 font-degular mt-6">
                  <p className='text-[28px]  font-degular text-primary font-medium'>{serviceData?.type}</p>
                  <div>
                    <p className='text-[20px]  font-degular'>{serviceData?.name}</p>
                    <p className='text-[28px]  font-bold text-primary font-degular'>${serviceData?.price}</p>
                  </div>
                </div>
              </div>


            </div>
          </div>
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
            <p className='text-[24px] font-degular font-medium text-center py-8'>Which service do you want to update?</p>

            {/* interior card */}
            <div className="pb-4">
              <div className='px-4'>
                <div
                  onClick={() => handlePrice((singlePriceValue?.id), (singlePriceValue?.car_type), ("Interior"), (singlePriceValue?.interior))}
                  className='cursor-pointer flex justify-between items-center border border-[#ccc] rounded-xl p-4 mb-4 hover:bg-primary hover:bg-opacity-15'>
                  <div>
                    <p className='text-[24px] font-degular'>Interior</p>
                    <p className='text-[24px] font-degular font-semibold text-primary'>${singlePriceValue?.interior}</p>
                  </div>
                  <span
                    className="cursor-pointer">
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
                  onClick={() => handlePrice((singlePriceValue?.id), (singlePriceValue?.car_type), ("Exterior"), (singlePriceValue?.exterior))}
                  className='cursor-pointer flex justify-between items-center border border-[#ccc] rounded-xl p-4 mb-4 hover:bg-primary hover:bg-opacity-15'>
                  <div>
                    <p className='text-[24px] font-degular'>Exterior</p>
                    <p className='text-[24px] font-degular font-semibold text-primary'>${singlePriceValue?.exterior}</p>
                  </div>
                  <span
                    className="cursor-pointer">
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
                  onClick={() => handlePrice((singlePriceValue?.id), (singlePriceValue?.car_type), ("Both"), (singlePriceValue?.both))}
                  className='cursor-pointer flex justify-between items-center border border-[#ccc] rounded-xl p-4 mb-4 hover:bg-primary hover:bg-opacity-15'>
                  <div>
                    <p className='text-[24px] font-degular'>Both</p>
                    <p className='text-[24px] font-degular font-semibold text-primary'>${singlePriceValue?.both}</p>
                  </div>
                  <span
                    className="cursor-pointer">
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
    </>
  )
}

export default ServiceAviablity