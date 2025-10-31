import { Button, Form, Input, Modal, Upload } from "antd";
import { CloudCog, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react"
import { useAddServiceMutation, useAddTimeMutation, useDeleteServiceMutation, useDeleteTimeMutation, useGetDetailsServiceApiQuery, useGetServiceQuery, useUpdateServiceMutation, useUpdateTimeMutation, } from "../../../redux/dashboardFeatures/services/dashboardServiceApi";
import toast from "react-hot-toast";
import CustomLoading from "../../../components/shared/CustomLoading";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";




const DashboardService = () => {
  const location = useLocation();
  const [formOne] = Form.useForm();
  const [formTwo] = Form.useForm();
  const [formThree] = Form.useForm();
  const [ImageFileList, setImageFileList] = useState([]);
  const [mondalOne, setModalOne] = useState(false);
  const [mondalTwo, setModalTwo] = useState(false);
  const [mondalThree, setModalThree] = useState(false);
  const [mondalFour, setModalFour] = useState(false);
  const [loading, setLoading] = useState(false)
  const [detailsId, setDetailsId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [slotData, setSlotData] = useState([])
  const [text, setText] = useState(''); // 'Add' or 'Update'
  const [currentTime, setCurrentTime] = useState({
    hour: 12,
    minute: 0,
    period: "PM"
  });




  const [initialTime, setInitialTime] = useState(currentTime);
  const [selectedTime, setSelectTime] = useState(null)


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [slotTimeId, setSlotTimeId] = useState('')

  // console.log(selectedTime)


  const { data: getServiceData, isLoading, refetch } = useGetServiceQuery()
  const allServiceData = getServiceData?.data



  const { data: detaislData, } = useGetDetailsServiceApiQuery(detailsId); // details service
  const singleServiceDetails = detaislData?.data
  const timeSlots = singleServiceDetails?.service_times




  const [addService] = useAddServiceMutation() // post 
  const [updateService] = useUpdateServiceMutation() // update
  const [deleteService] = useDeleteServiceMutation() // delete



  const [addTime] = useAddTimeMutation();
  const [updateTime] = useUpdateTimeMutation()
  const [deleteTime] = useDeleteTimeMutation();


  // CURRENT TIME
  useEffect(() => {
    // Update time every minute (60000ms)
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();

      setCurrentTime({
        hour: hours % 12 || 12, // Convert to 12-hour format
        minute: now.getMinutes(),
        period: hours >= 12 ? "PM" : "AM"
      });
    }, 60000);

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  useEffect(() => {
    if (timeSlots) {
      setSlotData(timeSlots)
    }
  }, [timeSlots])


  // defaut service
  useEffect(() => {
    if (singleServiceDetails) {
      formTwo.setFieldsValue({
        ...singleServiceDetails,
        car_type: singleServiceDetails?.car_type,
        interior: singleServiceDetails?.interior,
        exterior: singleServiceDetails?.exterior,
        both: singleServiceDetails?.both,

      });
      if (singleServiceDetails.icon) {
        setImageFileList([
          {
            uid: "-1",
            name: "Existing Image",
            status: "done",
            url: singleServiceDetails.icon,
          },
        ]);
      }
    }
  }, [singleServiceDetails]);






  // =============  modal one start =============== {add service-----------> }

  const showModalOne = () => {
    setImageFileList([])
    setModalOne(true)
  }


  const onFinishOne = async (values) => {
    setLoading(true)
    const formData = new FormData();
    if (ImageFileList) {
      formData.append("icon", ImageFileList[0]?.originFileObj);
    }
    formData.append("car_type", values?.car_type);
    formData.append("interior", values?.interior);
    formData.append("exterior", values?.exterior);
    formData.append("both", values?.both);

    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });


    try {
      const res = await addService(formData).unwrap()
      console.log(res)

      if (res?.status === true) {
        toast.success(res?.message)
        await refetch()
        setLoading(false)
        setImageFileList([])
        formOne.resetFields()
        setModalOne(false)
      }
    } catch (error) {
      if(error){
        toast.error(error?.data?.message?.icon)
      }
    } finally {
      setLoading(false)
    }

  }

  const handleModalOneOk = () => {
    formOne.submit()
  }

  const handleCancelModalOne = () => {
    setImageFileList([])
    formOne.resetFields()
    setModalOne(false)
  }
  // =============  modal one end ===============



  // =============  modal two start ===============  {Edit service-----------> }
  const showModalTwo = (id) => {
    setDetailsId(id)
    setModalTwo(true)
  }

  const onFinishTwo = async (values) => {

    setLoading(true)
    const formData = new FormData();
    if (ImageFileList[0]?.originFileObj) {
      formData.append("icon", ImageFileList[0].originFileObj);
    }

    formData.append("car_type", values?.car_type);
    formData.append("interior", values?.interior);
    formData.append("exterior", values?.exterior);
    formData.append("both", values?.both);
    formData.append("_method", "PUT");

    // formData.forEach((value, key) => {
    //   console.log('key------>', key, 'value------>', value);
    // });

    try {
      const res = await updateService({ updateInfo: formData, id: detailsId }).unwrap()
      // console.log(res)

      if (res?.status === true) {
        toast.success(res?.message)
        setLoading(false)
        await refetch()
        setModalTwo(false)
      } else {
        toast.error(res?.message)
      }
    } catch (errors) {
      console.log(errors)
    } finally {
      setLoading(false)
    }



  }


  const handleModalTwoOk = () => {
    formTwo.submit()
  }

  const handleCancelModalTwo = () => {
    setModalTwo(false)
  }
  // =============  modal two end ===============


  // =============  modal three start ===============
  const showModalThree = (id) => {
    setDetailsId(id)
    setModalThree(true)
  }

  const onFinishThree = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append("time", slotData);
    formData.append("_method", "PUT");

    try {
      const res = await updateService({
        id: detailsId,
        updateInfo: formData,

      }).unwrap()

      if (res?.status === true) {
        toast.success(res?.message)
        await refetch()
        setModalThree(false)
        setLoading(false)
      }
    } catch (errors) {
      console.log(errors)
    }finally{
      setLoading(false)
    }
  }





  const handleModalThreeOk = () => {
    formThree.submit()
  }

  const handleCancelModalThree = () => {
    setModalThree(false)
  }
  // =============  modal three end ===============



  // =============  modal three start ===============
  const showModalFour = (id) => {
    setDeleteId(id)
    setModalFour(true)
  }

  const handleModalFourOk = async () => {
    try {
      const res = await deleteService(deleteId).unwrap()
      if (res?.status === true) {
        toast.success(res?.message)
        refetch()
        setModalFour(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancelModalFour = () => {
    setModalFour(false)
  }
  // =============  modal three end ===============



  // ======================         ======================


  const handleHourChange = (hour) => {
    setInitialTime((prev) => ({ ...prev, hour }));
  };

  const handleMinuteChange = (minute) => {
    setInitialTime((prev) => ({ ...prev, minute }));
  };

  const handleSecondChange = (second) => {
    setInitialTime((prev) => ({ ...prev, second }));
  };

  const handlePeriodChange = (period) => {
    setInitialTime((prev) => ({ ...prev, period }));
  };

  const formatNumber = (num) => num.toString().padStart(2, "0");

  const formatTimeString = () => {
    const { hour, minute, period } = initialTime;
    return `${formatNumber(hour)}:${formatNumber(minute)} ${period}`;
  };






  const handleOkTime = async () => {


    if (text === 'Add') {
      const newTime = formatTimeString();
      setSelectTime(newTime);
      setIsModalOpen(false);


      const formData = new FormData();
      formData.append("service_id", slotTimeId);
      formData.append("time", newTime);

      try {
        const res = await addTime(formData).unwrap()
        // console.log(res);

        if (res?.status === true) {
          toast.success(res?.message)
          setIsModalOpen(false)
          refetch()
        } else {
          toast.error(res?.message)
        }
      } catch (errors) {
        console.log(errors)
      }
    }

    else if (text === 'Update') {

      const newTime = formatTimeString();
      setSelectTime(newTime);

      const formData = new FormData();
      formData.append("service_id", slotTimeId);
      formData.append("time", newTime);
      formData.append("_method", "PUT");


      try {
        const res = await updateTime({
          id: slotTimeId,
          updateTimeInfo: formData
        }).unwrap()
        if (res?.status === true) {
          toast.success(res?.message)
          setIsModalOpen(false)
          refetch()
        } else {
          toast.error(res?.message)
        }
      } catch (errors) {
        console.log(errors)
      }

    }
  }


  const handleCancelTime = () => {
    setIsModalOpen(false);
    setInitialTime(currentTime);
  }



  // ADD SERVICE TIME
  const handleAdd = async (id, text) => {
    setSlotTimeId(id)
    setIsModalOpen(true)
    setText(text)

  }


  // UPDATE SERVICE TIME
  const handleUpdate = async (id, text) => {
    setSlotTimeId(id)
    setIsModalOpen(true)
    setText(text)
  }


  // DELETE SERVICE TIME-- DONE
  const handleDelete = async (id) => {
    try {
      const res = await deleteTime(id).unwrap()

      if (res?.status === true) {
        toast.success(res?.message)
        refetch()
      } else {
        toast.error(res?.message)
      }
    } catch (errors) {
      console.log(errors)
    }
  }


  useEffect(() => {
    if (mondalOne || mondalTwo || mondalThree) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup function
    };
  }, [mondalOne || mondalTwo || mondalThree]);


  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Dashboard Services";
  }, [location.pathname]);


  if (isLoading) {
    return <CustomLoading />
  }


  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Dashboard Services</title>
      </Helmet>
      <div className="">
        <div className="py-4 pb-8">
          <button
            onClick={showModalOne}
            type="button" className="w-[274px] h-[64px] bg-primary text-[#ffff] px-8 py-2 rounded-[20px] text-xl">+ Add more</button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {
            allServiceData?.map((item, index) => {
              return (
                <div key={index} className="col-span-4 bg-[#ffff]  border border-[#ccc] rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[30px] font-degular font-semibold text-[#000000]">{item.car_type}</p>

                    <button onClick={() => showModalTwo(item?.id)} className="flex items-center gap-3 py-2 px-4 border border-primary rounded-md text-primary">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.71 4.04125C18.1 3.65125 18.1 3.00125 17.71 2.63125L15.37 0.291249C15 -0.0987512 14.35 -0.0987512 13.96 0.291249L12.12 2.12125L15.87 5.87125M0 14.2512V18.0012H3.75L14.81 6.93125L11.06 3.18125L0 14.2512Z" fill="#0063E6" />
                      </svg>

                      <span className="text-[20px] font-semibold text-primary font-degular">Edit</span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-between pt-6 space-y-2">
                    <div className="w-full flex justify-between items-center gap-3 py-2 px-4 border border-[#ccc] rounded-[20px] ">
                      <p className="text-[20px] font-degular font-medium">Interior</p>
                      <h2 className="text-[28px] font-degular font-semibold">${item.interior}</h2>
                    </div>
                    <div className="w-full flex justify-between items-center gap-3 py-2 px-4 border border-[#ccc] rounded-[20px] ">
                      <p className="text-[20px] font-degular font-medium">Exterior</p>
                      <h2 className="text-[28px] font-degular font-semibold">${item.exterior}</h2>
                    </div>
                    <div className="w-full flex justify-between items-center gap-3 py-2 px-4 border border-[#ccc] rounded-[20px] ">
                      <p className="text-[20px] font-degular font-medium">Both</p>
                      <h2 className="text-[28px] font-degular font-semibold">${item.both}</h2>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button onClick={() => showModalThree(item?.id)} className="flex items-center gap-2 py-2 px-4 border border-primary rounded-md text-primary">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.71 4.04125C18.1 3.65125 18.1 3.00125 17.71 2.63125L15.37 0.291249C15 -0.0987512 14.35 -0.0987512 13.96 0.291249L12.12 2.12125L15.87 5.87125M0 14.2512V18.0012H3.75L14.81 6.93125L11.06 3.18125L0 14.2512Z" fill="#0063E6" />
                      </svg>

                      <span className="text-[20px] font-semibold text-primary font-degular ">Edit time settings</span>
                    </button>

                    {/* delete service */}
                    <button
                      onClick={() => showModalFour(item?.id)}
                    >
                      <svg width="46" height="36" viewBox="0 0 46 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.502441" y="0.5" width="45" height="35" rx="5.5" fill="#FFF0F0" />
                        <rect x="0.502441" y="0.5" width="45" height="35" rx="5.5" stroke="#FF3F3F" />
                        <path d="M29.0024 10.8889H26.0024L25.1453 10H20.8596L20.0024 10.8889H17.0024V12.6667H29.0024M17.8596 24.2222C17.8596 24.6937 18.0402 25.1459 18.3617 25.4793C18.6832 25.8127 19.1192 26 19.5739 26H26.431C26.8857 26 27.3217 25.8127 27.6432 25.4793C27.9647 25.1459 28.1453 24.6937 28.1453 24.2222V13.5556H17.8596V24.2222Z" fill="#FF5353" />
                      </svg>

                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>


        {/*================== modal component ============= */}
        {/* modal one */}
        <Modal
          centered
          title={
            <div className="text-center bg-primary text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
              Add new Service
            </div>
          }
          open={mondalOne}
          onOk={handleModalOneOk}
          onCancel={handleCancelModalOne}
          footer={null}
          width={600}
          className='custom-service-modal'
        >

          <div className="p-8">
            <Form form={formOne} onFinish={onFinishOne}>
              <div className="space-y-3">
                {/* car image */}
                <div className="w-full flex justify-center items-center border border-[#ccc] p-4 rounded-xl mb-10">
                  <Form.Item
                    className="md:col-span-2"
                    name="icon"
                    rules={[
                      {
                        required: ImageFileList.length === 0,
                        message: "Image required",
                      },
                    ]}
                  >
                    <Upload
                      accept="image/*"
                      maxCount={1}
                      showUploadList={{ showPreviewIcon: true }}
                      fileList={ImageFileList}
                      onChange={({ fileList }) => setImageFileList(fileList)}
                      listType="picture-card"
                      className="w-full"
                      beforeUpload={() => false}
                    >
                      <div style={{ cursor: "pointer" }} className="flex justify-center items-center">
                        <UploadCloud className="w-5 h-5 text-gray-400" />
                        <span className="w-full">Upload logo</span>
                      </div>
                    </Upload>
                  </Form.Item>
                </div>

                {/* car type */}
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-[20px] font-medium font-degular">Car Type</p>
                  <Form.Item name="car_type" className="mb-0"
                    rules={[{ required: true, message: "Car type is required" }]}
                  >
                    <Input placeholder="car name" style={{ height: "50px", borderRadius: "20px" }} />
                  </Form.Item>
                </div>

                {/* Interior */}
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-[20px] font-medium font-degular">Interior</p>
                  <Form.Item name="interior" className="mb-0"
                    rules={[
                      { required: true, message: "Interior price is required" },
                      // {
                      //   pattern: /^[0-9]+$/,
                      //   message: "Interior price must be a number",
                      // },
                    ]}
                  >
                    <Input placeholder="interior price" style={{ height: "50px", borderRadius: "20px" }} />
                  </Form.Item>
                </div>

                {/* Exterior */}
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-[20px] font-medium font-degular">Exterior</p>
                  <Form.Item name="exterior" className="mb-0"
                    rules={[
                      { required: true, message: "Exterior price is required" },
                      // {
                      //   pattern: /^[0-9]+$/,
                      //   message: "Exterior price must be a number",
                      // },
                    ]}
                  >
                    <Input placeholder="exterior price" style={{ height: "50px", borderRadius: "20px" }} />
                  </Form.Item>
                </div>

                {/* Both */}
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-[20px] font-medium font-degular">Both</p>
                  <Form.Item name="both" className="mb-0"
                    rules={[
                      { required: true, message: "Both price is required" },
                      // {
                      //   pattern: /^[0-9]+$/,
                      //   message: "Both price must be a number",
                      // },
                    ]}
                  >
                    <Input placeholder="both price" style={{ height: "50px", borderRadius: "20px" }} />
                  </Form.Item>
                </div>

                <Button
                  htmlType="submit"
                  block
                  loading={loading}
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
              </div>
            </Form>
          </div>
        </Modal>



        {/* modal two */}
        <Modal
          centered
          title={
            <div className="text-center bg-primary text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
              {singleServiceDetails?.car_type}
            </div>
          }
          open={mondalTwo}
          onOk={handleModalTwoOk}
          onCancel={handleCancelModalTwo}
          footer={null}
          width={600}
          className='custom-service-modal'
        >

          <div className="p-8">
            <Form form={formTwo} onFinish={onFinishTwo}>
              <div className="space-y-3">
                {/* car image */}
                <div className="w-full flex justify-center items-center border border-[#ccc] p-4 rounded-xl mb-10">
                  <Form.Item
                    className="md:col-span-2"
                    name="icon"
                    rules={[
                      {
                        required: ImageFileList.length === 0,
                        message: "Image required",
                      },
                    ]}
                  >
                    <Upload
                      accept="image/*"
                      maxCount={1}
                      fileList={ImageFileList}
                      // showUploadList={{ showPreviewIcon: true }}
                      onChange={({ fileList }) => setImageFileList(fileList)}
                      listType="picture-card"
                      className="w-full"
                      beforeUpload={() => false}
                    >
                      <div style={{ cursor: "pointer" }} className="flex justify-center items-center">
                        <UploadCloud className="w-5 h-5 text-gray-400" />
                        <span className="">Upload logo</span>
                      </div>
                    </Upload>
                  </Form.Item>
                </div>


                {/* car type */}
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-[20px] font-medium font-degular">Car Type</p>
                  <Form.Item name="car_type" className="mb-0"
                    rules={[{ required: true, message: "Car type is required" }]}
                  >
                    <Input placeholder="car name" style={{ height: "50px", borderRadius: "20px" }} />
                  </Form.Item>
                </div>

                {/* Interior */}
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-[20px] font-medium font-degular">Interior</p>
                  <Form.Item name="interior" className="mb-0"
                    rules={[
                      { required: true, message: "Interior price is required" },
                      // {
                      //   pattern: /^[0-9]+$/,
                      //   message: "Interior price must be a number",
                      // },
                    ]}
                  >
                    <Input placeholder="interior price" style={{ height: "50px", borderRadius: "20px" }} />
                  </Form.Item>
                </div>

                {/* Exterior */}
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-[20px] font-medium font-degular">Exterior</p>
                  <Form.Item name="exterior" className="mb-0"
                    rules={[
                      { required: true, message: "Exterior price is required" },
                      // {
                      //   pattern: /^[0-9]+$/,
                      //   message: "Exterior price must be a number",
                      // },
                    ]}
                  >
                    <Input placeholder="exterior price" style={{ height: "50px", borderRadius: "20px" }} />
                  </Form.Item>
                </div>

                {/* Both */}
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-[20px] font-medium font-degular">Both</p>
                  <Form.Item name="both" className="mb-0"
                    rules={[
                      { required: true, message: "Both price is required" },
                      // {
                      //   pattern: /^[0-9]+$/,
                      //   message: "Both price must be a number",
                      // },
                    ]}
                  >
                    <Input placeholder="both price" style={{ height: "50px", borderRadius: "20px" }} />
                  </Form.Item>
                </div>

                <Button
                  htmlType="submit"
                  block
                  loading={loading}
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
                Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </Modal>




        {/* modal three */}
        <Modal
          centered
          title={
            <div className="text-center bg-primary text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
              {singleServiceDetails?.car_type} Time Settings
            </div>
          }
          open={mondalThree}
          onOk={handleModalThreeOk}
          onCancel={handleCancelModalThree}
          footer={null}
          width={800}
          zIndex={100}
          className='custom-service-modal'
        >

          <div className="p-8">
            <Form form={formThree} onFinish={onFinishThree}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Always show 6 slots (time slots + placeholders if needed) */}
                {[...Array(6)].map((_, index) => {
                  if (timeSlots && timeSlots[index]) {
                    return (
                      <div
                        key={timeSlots[index].id}
                        className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between "
                      >
                        <div className="flex-1">
                          <span className="text-lg font-semibold text-gray-900">{timeSlots[index].time}</span>
                        </div>

                        <div className="flex items-center gap-3">

                          <button onClick={() => handleUpdate((timeSlots[index]?.id), "Update")} type="button">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="50" height="50" rx="15" fill="#E8F2FF" />
                              <path d="M25 13C18.376 13 13 18.376 13 25C13 31.624 18.376 37 25 37C31.624 37 37 31.624 37 25C37 18.376 31.624 13 25 13ZM25.072 33.4V30.988H25C23.464 30.988 21.928 30.4 20.752 29.236C19.7752 28.2582 19.1655 26.9735 19.0256 25.5986C18.8857 24.2236 19.2242 22.8425 19.984 21.688L21.304 23.008C20.452 24.604 20.668 26.62 22.012 27.964C22.852 28.804 23.956 29.2 25.06 29.176V26.608L28.456 30.004L25.072 33.4ZM30.004 28.312L28.684 26.992C29.536 25.396 29.32 23.38 27.976 22.036C27.5865 21.6431 27.1229 21.3316 26.612 21.1194C26.1011 20.9072 25.5532 20.7986 25 20.8H24.928V23.38L21.532 19.996L24.928 16.6V19.024C26.488 19 28.06 19.564 29.248 20.764C31.288 22.804 31.54 25.984 30.004 28.312Z" fill="#0063E5" />
                            </svg>

                          </button>


                          <button onClick={() => handleDelete(timeSlots[index]?.id)} type="button">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="50" height="50" rx="15" fill="#FFE2E2" />
                              <path d="M34.5 14.3333H29.75L28.3929 13H21.6071L20.25 14.3333H15.5V17H34.5M16.8571 34.3333C16.8571 35.0406 17.1431 35.7189 17.6521 36.219C18.1612 36.719 18.8516 37 19.5714 37H30.4286C31.1484 37 31.8388 36.719 32.3479 36.219C32.8569 35.7189 33.1429 35.0406 33.1429 34.3333V18.3333H16.8571V34.3333Z" fill="#FF3F3F" />
                            </svg>

                          </button>
                        </div>
                      </div>
                    );
                  }
                  // Else, show placeholder button
                  return (
                    <button
                      key={`${index}`} // Unique key for placeholder
                      onClick={() => handleAdd((detailsId), "Add")}
                      type="button"
                      className="h-[90px] bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-center group"
                    >
                      <svg width="241" height="24" viewBox="0 0 241 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M118.786 13.7143H108.5V10.2857H118.786V0H122.214V10.2857H132.5V13.7143H122.214V24H118.786V13.7143Z" fill="black" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </Form>
          </div>
        </Modal>



        {/* modal four ------ DELETE-------*/}
        <Modal
          centered
          title={
            <div className="text-center bg-[#EF4444] text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
              Delete Service ?
            </div>
          }
          open={mondalFour}
          onOk={handleModalFourOk}
          onCancel={handleCancelModalFour}
          footer={false}
          width={600}
          className='custom-service-modal'
        >

          <div className="flex justify-center">
            <div>
              <div className="text-center">
                <span className="flex justify-center py-[50px]">
                  <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.4332 2.63334H28.2165L25.5831 0H12.4164L9.7831 2.63334H0.566406V7.90002H37.4332M3.19975 42.1334C3.19975 43.5302 3.75463 44.8698 4.74232 45.8575C5.73001 46.8452 7.06961 47.4001 8.46642 47.4001H29.5331C30.93 47.4001 32.2696 46.8452 33.2572 45.8575C34.2449 44.8698 34.7998 43.5302 34.7998 42.1334V10.5334H3.19975V42.1334Z" fill="#EF4444" />
                  </svg>
                </span>

                <h3 className="text-[22px] font-semibold font-degular text-[#EF4444] ">You are going to delete this service</h3>
                <p className="text-[16px] font-degular text-[#888888] pb-[53px]">After deleting, users can’t find this service on your <br /> website or mobile application anymore.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 pb-6">
            <button
              onClick={handleCancelModalFour}
              className="w-[212px] h-[60px] border rounded-[30px]">Cancel</button>
            <button
              onClick={handleModalFourOk}
              className="w-[212px] h-[60px] bg-[#EF4444] text-[#fff] rounded-[30px]">Delete</button>
          </div>
        </Modal>




        {/* time picker component */}
        <div className=" bg-gray-50 flex items-center justify-center p-4">
          {
            isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
              <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 shadow-xl">
                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Time</h2>

                {/* Time Display */}
                <div className="flex items-center justify-center mb-6">
                  {/* Hour Section */}
                  <div className="flex flex-col items-center mx-1">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 min-w-[70px] text-center">
                      <span className="text-2xl font-medium text-gray-800">
                        {formatNumber(initialTime.hour)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Hour</span>
                  </div>

                  {/* Minute Section */}
                  <div className="flex flex-col items-center mx-1">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 min-w-[70px] text-center">
                      <span className="text-2xl font-medium text-gray-800">
                        {formatNumber(initialTime.minute)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Minute</span>
                  </div>

                  <div className="text-2xl font-light text-gray-400 mx-1">:</div>



                  {/* AM/PM Section */}
                  <div className="ml-4 flex flex-col">
                    <button
                      onClick={() => handlePeriodChange("AM")}
                      className={`px-4 py-2 rounded-t-lg border text-sm font-medium ${initialTime.period === "AM"
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-600"
                        }`}
                    >
                      AM
                    </button>
                    <button
                      onClick={() => handlePeriodChange("PM")}
                      className={`px-4 py-2 rounded-b-lg border border-t-0 text-sm font-medium ${initialTime.period === "PM"
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-600"
                        }`}
                    >
                      PM
                    </button>
                  </div>
                </div>

                {/* Time Selection Grids */}
                <div className="space-y-4">
                  {/* Hour Selection */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Hour</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => (
                        <button
                          key={hour}
                          onClick={() => handleHourChange(hour)}
                          className={`py-2 rounded-md text-sm ${initialTime.hour === hour
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          {hour}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minute Selection */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Minute</h3>
                    <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1">
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <button
                          key={minute}
                          onClick={() => handleMinuteChange(minute)}
                          className={`py-1 rounded-md text-xs ${initialTime.minute === minute
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          {formatNumber(minute)}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end mt-6 space-x-3">
                  <button
                    onClick={handleCancelTime}
                    className="px-4 py-2 text-gray-700 font-medium rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleOkTime}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default DashboardService