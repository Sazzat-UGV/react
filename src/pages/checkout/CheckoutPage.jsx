import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomContainer from "../../components/shared/CustomContainer"
import { Button, Checkbox, Form, Input, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useGetAuthProfileApiQuery } from "../../redux/dashboardFeatures/setting/dashboardSettingApi";

import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import toast from "react-hot-toast";
import { useBookingSuccessMutation, useCreateIntentMutation, useGetServiceAvilityApiQuery, useGetTimeApiQuery } from "../../redux/web/serviceAvility/serviceAvilityApi";
import moment from "moment";
import { DayPicker } from "react-day-picker";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLIC_KEY); // payment api key by server site
const CheckoutPage = () => {
  const [formOne] = Form.useForm();
  const [formTwo] = Form.useForm();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [agreement, setAgreement] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);

  const [bookingNode, setBookingNode] = useState('')
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [clickCheckout, setClickCheckout] = useState(false);
  const { serviceData, stateAddress, zipCode, selectedDate, bookingTime, singlePriceValue } = location.state || {};


  const { data: userProfileData, isLoading, refetch } = useGetAuthProfileApiQuery();
  const userProfile = userProfileData?.data
  const carPhoto = userProfile?.car_photos


useEffect(() => {
  if (userProfile) {
    // Filter out invalid fields
    const validProfile = Object.fromEntries(
      Object.entries(userProfile).filter(([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "undefined" &&
        value !== "null"
      )
    );

    // Always include stateAddress and zipCode if they exist
    if (stateAddress) validProfile.street_address = stateAddress;
    if (zipCode) validProfile.zip_code = zipCode;

    // Set values in form
    formOne.setFieldsValue(validProfile);
  }
}, [userProfile, stateAddress, zipCode]);










  const initialOptions = {
    clientId: "YOUR_CLIENT_ID",
  };

  const styles = {
    shape: "rect",
    layout: "vertical",
  };


  const showModal = () => {
    setModalOpen(true)
  }
  const handleModalOkPenOk = () => {

  }
  const handleModalCancel = () => {
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





  const onFinishOne = (values) => {

    const info = {
      'service_id': serviceData?.id,
      'service_name': serviceData?.name,
      'service_type': serviceData?.type,
      'booking_date': selectedDate,
      'booking_time': bookingTime,
      'price': serviceData?.price,
      'booking_note': bookingNode,
      'car_brand': values?.car_brand,
      'car_model': values?.car_model,
      'street_address': values?.street_address,
      'zip_code': values?.zip_code,
    }

    setPaymentInfo(info)


  }







  const onFinishTwo = (value) => {
    setBookingNode(value?.booking_note)
    setModalOpen(false)
    formTwo.resetFields()
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Checkout";
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Checkout</title>
      </Helmet>
      <section className=" pt-4 lg:pt-[120px] pb-[52px] bg-[#f6f6f6]">
        <CustomContainer>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 pt-10 lg:pt-0">
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
              <h2 className='text-[20px] md:text-[50px] font-medium font-degular'>Checkout</h2>
            </div>
          </div>

          <div className={`transition-all duration-300  flex flex-col lg:flex-row ${paymentInfo?.price ? "justify-between" : "justify-center"} `}>
            {/* left  */}
            <div className="w-full lg:w-[50%]">
              <Form form={formOne} onFinish={onFinishOne}>


                {/* phone number */}
                <div>
                  <Form.Item
                    name="phone"
                  >
                    <Input
                      placeholder="Your phone number (9419996666)"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      prefix={
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.02222 9.15556C5.62222 12.3 8.2 14.8667 11.3444 16.4778L13.7889 14.0333C14.0889 13.7333 14.5333 13.6333 14.9222 13.7667C16.1667 14.1778 17.5111 14.4 18.8889 14.4C19.5 14.4 20 14.9 20 15.5111V19.3889C20 20 19.5 20.5 18.8889 20.5C8.45556 20.5 0 12.0444 0 1.61111C0 1 0.5 0.5 1.11111 0.5H5C5.61111 0.5 6.11111 1 6.11111 1.61111C6.11111 3 6.33333 4.33333 6.74444 5.57778C6.86667 5.96667 6.77778 6.4 6.46667 6.71111L4.02222 9.15556Z" fill="#888888" />
                        </svg>

                      }
                      style={{
                        height: "60px",
                        borderRadius: "20px",
                        paddingInline: "20px",
                        border: isFocused ? "1px solid #ccc" : "1px solid #ccc",
                      }}
                    />
                  </Form.Item>
                </div>
                {/* full name */}
                <div>
                  <Form.Item
                    name="name"
                  >
                    <Input
                      placeholder="Your full name"
                      prefix={
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 0.5C11.3261 0.5 12.5979 1.02678 13.5355 1.96447C14.4732 2.90215 15 4.17392 15 5.5C15 6.82608 14.4732 8.09785 13.5355 9.03553C12.5979 9.97322 11.3261 10.5 10 10.5C8.67392 10.5 7.60215 9.97322 6.46447 9.03553C5.52678 8.09785 5 6.82608 5 5.5C5 4.17392 5.52678 2.90215 6.46447 1.96447C7.40215 1.02678 8.67392 0.5 10 0.5ZM10 13C15.525 13 20 15.2375 20 18V20.5H0V18C0 15.2375 4.475 13 10 13Z"
                            fill="#888888"
                          />
                        </svg>
                      }
                      style={{
                        height: "60px",
                        borderRadius: "20px",
                        paddingInline: "20px",
                        border: isFocused ? "1px solid #ccc" : "1px solid #ccc",
                      }}
                    />
                  </Form.Item>
                </div>

                {/* email */}
                <div>
                  <Form.Item
                    name="email"
                  >
                    <Input
                      readOnly
                      placeholder="Enter your email"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      prefix={
                        <svg
                          width="25"
                          height="21"
                          viewBox="0 0 25 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.5 0.5H2.5C1.125 0.5 0.0125 1.625 0.0125 3L0 18C0 19.375 1.125 20.5 2.5 20.5H22.5C23.875 20.5 25 19.375 25 18V3C25 1.625 23.875 0.5 22.5 0.5ZM22.5 5.5L12.5 11.75L2.5 5.5V3L12.5 9.25L22.5 3V5.5Z"
                            fill="#888888"
                          />
                        </svg>
                      }
                      style={{
                        height: "60px",
                        borderRadius: "20px",
                        paddingInline: "20px",
                        border: isFocused ? "1px solid #ccc" : "1px solid #ccc",
                        cursor: "pointer",
                        position: "relative", // Ensure correct layering
                        zIndex: isFocused ? 10 : 1,
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:gap-6">
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

                          height: "60px",
                          borderRadius: "20px",
                          paddingInline: "20px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:gap-3">
                  {/* brand name */}
                  <div className="w-full md:w-[50%]">
                    <p className="text-[20px] font-degular">Car Make</p>
                    <Form.Item name="car_brand"
                      rules={[
                        { required: true, message: 'Please enter your car make ' },
                      ]}
                    >
                      <Input
                        placeholder="Car make"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={{
                          height: "60px",
                          borderRadius: "20px",
                          paddingInline: "20px",
                          border: isFocused
                            ? "1px solid #ccc"
                            : "1px solid #ccc",
                          position: "relative", // Ensure correct layering
                          zIndex: isFocused ? 10 : 1,
                        }}
                      />
                    </Form.Item>
                  </div>


                  {/* car modal */}
                  <div className="w-full md:w-[50%]">
                    <p className="text-[20px] font-degular">Car Model</p>
                    <Form.Item name="car_model"
                      rules={[
                        { required: true, message: 'Please enter your car model ' },
                      ]}
                    >
                      <Input
                        placeholder="Car Model"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={{
                          height: "60px",
                          borderRadius: "20px",
                          paddingInline: "20px",
                          border: isFocused
                            ? "1px solid #ccc"
                            : "1px solid #ccc",
                          position: "relative", // Ensure correct layering
                          zIndex: isFocused ? 10 : 1,
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>


                <div className="border border-[#ccc] flex flex-col md:flex-row md:justify-between md:items-center gap-10 md:gap-0 p-4 rounded-lg">
                  <p className="text-[28px] font-degular font-semibold text-[#000000]">Appointment Notes</p>
                  <button
                    onClick={showModal}
                    type="button" className="bg-primary text-[#ffff] px-8 py-2 rounded text-xl">+ Add</button>
                </div>
                <div className="pt-4 pb-2 pr-1 font-degular">
                  <Form.Item
                    name="agree"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error("You must agree to the terms")),
                      },
                    ]}
                  >
                    <Checkbox onChange={(e) => {
                      setClickCheckout(!clickCheckout)
                    }}
                      className=" font-semibold font-degular">
                      <div className="flex gap-[5px]">
                        <span>I  agree with the</span>
                        <span className="text-primary">Privacy Policy</span>
                        and
                        <span className="text-primary">Terms & Conditions</span>
                      </div>
                    </Checkbox>
                  </Form.Item>
                </div>

                {
                  bookingNode && <div className="border rounded-xl h-[150px] p-2 bg-gray-200 overflow-y-auto">
                    {bookingNode}
                  </div>
                }

                <Button
                  htmlType="submit"
                  block
                  disabled={!clickCheckout}
                  style={{
                    backgroundColor: "#0063E5",
                    color: "#ffffff",
                    fontSize: "20px",
                    fontWeight: "600",
                    height: "60px",
                    borderRadius: "20px",
                    paddingInline: "20px",
                    marginTop: "20px",
                    opacity: !clickCheckout ? 0.2 : 1, // optional: visually indicate disabled
                    cursor: !clickCheckout ? "not-allowed" : "pointer",
                  }}
                >
                  Save
                </Button>
              </Form>

              {/* node modal component */}
              <Modal
                centered
                title={
                  <div className="text-center bg-primary text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
                    Add note
                  </div>
                }
                open={modalOpen}
                onOk={handleModalOkPenOk}
                onCancel={handleModalCancel}
                footer={null}
                width={600}
                className='custom-service-modal'
                maskStyle={{ backgroundColor: 'rgba(134, 134, 134, 0.4)' }}
              >

                <div className='p-4'>
                  <Form form={formTwo} onFinish={onFinishTwo}>
                    <Form.Item name="booking_note">
                      <TextArea placeholder="Type here" style={{ height: "300px", resize: "none" }} />
                    </Form.Item>

                    <Button
                      htmlType="submit"
                      block
                      style={{
                        backgroundColor: "#0063E5",
                        color: "#ffffff",
                        fontSize: "20px",
                        fontWeight: "600",
                        height: "60px",
                        borderRadius: "20px",
                        paddingInline: "20px",
                        marginTop: "20px"
                      }}
                    >
                      Add
                    </Button>
                  </Form>
                </div>
              </Modal>
            </div>
            {
              paymentInfo?.price && <Elements stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: parseInt(paymentInfo?.price) * 100,
                  currency: 'usd',

                }}
              >

                <PaymentCard
                  paymentInfo={paymentInfo}
                  singlePriceValue={singlePriceValue}
                  serviceData={serviceData}
                  selectedDate={selectedDate}

                />
              </Elements>
            }
          </div>
        </CustomContainer>
      </section>
    </>
  )
}

export default CheckoutPage




export const PaymentCard = ({ paymentInfo, singlePriceValue, serviceData }) => {


  const [errorMessage, setErrorMessage] = useState(null);
  const { service_type, service_name, price, booking_date, booking_time } = paymentInfo;
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [modalOpenThree, setModalOpenThree] = useState(false);

  const [updateData, setUpdateData] = useState({
    id: serviceData?.id || "",
    type: serviceData?.type || "",
    name: serviceData?.name || "",
    price: serviceData?.price || 0,
  });



  const [createIntent, intentResults] = useCreateIntentMutation()

  const [bookingSuccess, bookingResults] = useBookingSuccessMutation()

  const navigation = useNavigate()
  // const stripe = useStripe();
  const elements = useElements();



  const navigate = useNavigate();
  const [activeNextButton, setActiveNextButton] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(booking_date)); // send
  const [selectedDateTow, setSelectedDateTwo] = useState(null); // send
  const [bookingTime, setBookingTime] = useState(booking_time); // send
  const { data: getBlockService } = useGetServiceAvilityApiQuery()
  const blockServiceDate = getBlockService?.data?.data;


  const { data: timeData, isLoading, isFetching } = useGetTimeApiQuery({ service_id: updateData?.id, date: moment(selectedDate)?.format("YY-MM-DD") })




  const today = new Date();
  const disabledBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Get array of already blocked dates
  const blockedDates = blockServiceDate?.map(item => new Date(item.date)) || [];

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


  const handleDateSelect = (date) => {

    if (date) {
      // Get local date components (avoids timezone issues)

      setSelectedDate(date);
      const displayOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const displayDate = date.toLocaleDateString('en-US', displayOptions);
      setSelectedDateTwo(displayDate)
    }


  };







  const handleSubmit = async () => {
    try {
      paymentInfo.booking_date = moment(selectedDate).format("YYYY-MM-DD");
      paymentInfo.booking_time = bookingTime;
      paymentInfo.price = updateData?.price;



      const res = await bookingSuccess(paymentInfo).unwrap();
      console.log("Response ------->", res);

      if (res.status) {
        toast.success(res?.message);
        navigation("/");
      }
    } catch (err) {
      console.error("Payment error:", err);
    toast.error("Something went wrong. Please try again.");

    }
  };




  const showModalTwo = () => {
    setModalOpenTwo(true)
  }
  const handleModalOkTwo = () => {

  }
  const handleModalCancelTwo = () => {
    setModalOpenTwo(false)
  }




  const showModalThree = () => {
    setModalOpenThree(true)
  }
  const handleModalOkThree = () => {

  }
  const handleModalCancelThree = () => {
    setModalOpenThree(false)
  }


  const handleNextButton = () => {
    setModalOpenThree(false)

  }

  const handlePrice = (id, type, name, price) => {

    setUpdateData({
      id,
      type,
      name,
      price,
    });

    setModalOpenTwo(false)
  }


  useEffect(() => {
    if (modalOpenTwo || modalOpenThree) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup function
    };
  }, [modalOpenTwo, modalOpenThree]);


  return <>

    {/* right  */}
    <div className=" w-full lg:w-[40%]">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pt-8 lg:pt-0">
        <p className='text-[20px]  font-medium font-degular'>Appointment Summary</p>
        <button onClick={() => showModalTwo()} className="flex items-center gap-2 border border-primary px-4 py-2 rounded text-[16px] font-semibold text-primary font-degular"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.71 4.04125C18.1 3.65125 18.1 3.00125 17.71 2.63125L15.37 0.291249C15 -0.0987512 14.35 -0.0987512 13.96 0.291249L12.12 2.12125L15.87 5.87125M0 14.2512V18.0012H3.75L14.81 6.93125L11.06 3.18125L0 14.2512Z" fill="#0063E6" />
        </svg>
          Change</button>
      </div>
      <div className="flex flex-col md:flex-row justify-between border border-[#ccc] rounded-lg p-4 font-degular mt-6">


        <div className="flex items-center gap-3">
          <img src="/checkoutLogo.svg" alt="logo" />
          <div>
            <p className='text-[20px]  font-degular'>{selectedDate && moment(selectedDate).format("ll")}</p>
            {/* <p className='text-[20px] text-gray-300 font-degular'>{bookingTime}</p> */}
            <p className='text-[20px] text-gray-300 font-degular'>{bookingTime}</p>
          </div>
        </div>

        <button onClick={() => showModalThree()} className="border border-primary px-6 py-4 rounded-lg ">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.7071 4.04125C18.0971 3.65125 18.0971 3.00125 17.7071 2.63125L15.3671 0.291249C14.9971 -0.0987512 14.3471 -0.0987512 13.9571 0.291249L12.1171 2.12125L15.8671 5.87125M-0.00292969 14.2512V18.0012H3.74707L14.8071 6.93125L11.0571 3.18125L-0.00292969 14.2512Z" fill="#0063E6" />
          </svg>

        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between border border-[#ccc] rounded-lg p-4 font-degular mt-6">
        <p className='text-[28px]  font-degular text-primary'>{updateData?.type}</p>
        <div>
          <p className='text-[20px]  font-degular'>{updateData?.name}</p>
          <p className='text-[28px]  font-bold text-primary font-degular'>${updateData?.price}</p>
        </div>
      </div>



      <div className="mt-4">
        {/* <PaymentElement /> */}
      </div>
      <div className="mt-4">
        <Button
          loading={intentResults.isLoading || bookingResults?.isLoading}
          onClick={() => {
            handleSubmit()
          }}
          // disabled={!stripe || !elements}
          htmlType="submit"
          block
          style={{
            backgroundColor: "#0063E5",
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: "600",
            height: "60px",
            borderRadius: "20px",
            paddingInline: "20px",
          }}
        >
          Book Appointment <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.293032 6L11.879 6L7.37903 1.5L8.79303 0.0859985L15.707 7L8.79303 13.914L7.37903 12.5L11.879 8L0.293032 8V6Z" fill="white" />
          </svg>

        </Button>
      </div>
      {/* Show error message to your customers */}
      {errorMessage && <div className="text-red-700 text-base font-medium">{errorMessage}</div>}

    </div>


    {/* modal component  */}
    <Modal
      centered
      title={
        <div className="text-center bg-primary text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
          {singlePriceValue?.car_type}
        </div>
      }
      open={modalOpenTwo}
      onOk={handleModalOkTwo}
      onCancel={handleModalCancelTwo}
      footer={null}
      width={600}
      className='custom-service-modal'

    >
      <p className='text-[24px] font-degular font-medium text-center py-8'>Please select a service</p>

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

    {/* DATE SHOW */}
    <Modal
      centered
      title={
        <div className="text-center bg-primary text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
          {singlePriceValue?.car_type}
        </div>
      }
      open={modalOpenThree}
      onOk={handleModalOkThree}
      onCancel={handleModalCancelThree}
      footer={null}
      width={800}
      className='custom-service-modal'

    >
      <p className='text-[24px] font-degular font-medium text-center py-8'>Which date you wants to update ?</p>

      {/* interior card */}
      <div className="p-4">


        <div className="flex flex-col lg:flex-row justify-between  pt-10 lg:pt-0">
          <div className="w-full">
            {/* date picker conponent */}
            <p className='text-[20px]  font-medium font-degular'>Select Date</p>
            <div className="bg-gray-100 shadow-md p-4  flex justify-center items-center rounded-lg m-4">
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



        <div className=" mt-3">
          {
            timeData?.data?.length > 0 && <p className='text-[20px]  font-medium font-degular pb-8'>Select Time</p>
          }

          <div className="flex justify-center items-center gap-4">
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
                      className={`w-fit px-8 py-2 hover:bg-primary hover:text-[#ffff] text-[20px] cursor-pointer rounded-lg ${bookingTime === singleTime ? "bg-primary text-[#ffff]" : "bg-[#ffff] border"
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

            <button
              disabled={!activeNextButton}
              onClick={handleNextButton}
              className={`w-full flex justify-center items-center  text-[20px] py-2 md:py-4  rounded-full gap-2 my-8 ${activeNextButton ? "bg-primary text-[#ffff] cursor-pointer" : "bg-gray-300 text-[#ffff] cursor-not-allowed"}`}>
              Next
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.29425e-05 6L11.5861 6L7.08606 1.5L8.50006 0.0859985L15.4141 7L8.50006 13.914L7.08606 12.5L11.5861 8L6.29425e-05 8V6Z" fill="white" />
              </svg>
            </button>
          }
        </div>
      </div>
    </Modal>
  </>
}