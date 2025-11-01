import { Button, Form, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useAddBlockDateApiMutation, useDeleteUnBlockDateApiMutation, useGetBlockedDateApiQuery } from '../../../redux/dashboardFeatures/manageDate/dashboardManageDateApi';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ManageDates = () => {
  const location = useLocation();
  const [formOne] = useForm();
  const [formTwo] = useForm();
  const [modalOne, setModalOne] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { data: manageDateData } = useGetBlockedDateApiQuery(); // get
  const [addBlockDateApi] = useAddBlockDateApiMutation(); // post
  const [deleteUnBlockDateApi] = useDeleteUnBlockDateApiMutation(); // delete
  const allDateData = manageDateData?.data?.data;
  console.log(allDateData)


  



  // Get array of already blocked dates
const blockedDates = allDateData?.map(item => {
    const date = new Date(item.date);
    date.setDate(date.getDate() + 1);
    return date;
}) || [];


  // ✅ Local date format function (YYYY-MM-DD)


  // 🔹 User date select handler
  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      setModalOne(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteUnBlockDateApi(id).unwrap();
      if (res?.status === true) {
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to unblock date');
    }
  };

  const year = selectedDate?.getFullYear();
  const month = String(selectedDate?.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate?.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;




  // =============  modal one start ===============
  const onFinishOne = async () => {
    const formData = new FormData();
    formData.append("date", formattedDate);

    try {
      const res = await addBlockDateApi(formData).unwrap();
      if (res?.status === true) {
        toast.success(res?.message);
        setModalOne(false);
        setSelectedDate(null);
      }else{
        toast.error(res?.message);
      }
    } catch (error) {
     console.log(error)
    }
  };

  const handleModalOneOk = () => {
    formOne.submit();
  };

  const handleCancelModalOne = () => {
    setModalOne(false);
    setSelectedDate(null);
  };
  // =============  modal one end ===============


  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Dashboard Manage Dates";
  }, [location.pathname]);

 
  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Dashboard Manage Dates</title>
      </Helmet>
      <div>
        <div className='flex justify-evenly gap-10 pt-14'>
          <div className='w-[60%]'>
            <h2 className='text-[28px] font-degular font-medium pb-4'>Block certain dates</h2>
            <div className="bg-gray-100 shadow-md p-4 ">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={[
                  { before: new Date() }, // Disable past dates
                  ...blockedDates.map(date => ({ from: date, to: date })) // Disable already blocked dates
                ]}
                modifiersClassNames={{
                  disabled: "cursor-not-allowed opacity-50",
                  selected: "bg-primary text-white"
                }}
              />
            </div>
          </div>

          <div className='w-[50%]'>
            <div>
              <h2 className='text-[28px] font-degular font-medium text-red-500 flex items-center gap-3 pb-4'>
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.75017 23.25L23.2502 5.75001M27 14.5C27 21.4036 21.4036 27 14.5 27C7.59644 27 2 21.4036 2 14.5C2 7.59644 7.59644 2 14.5 2C21.4036 2 27 7.59644 27 14.5Z" stroke="#FF3636" stroke-width="3" />
                </svg>
                Date Blocked
              </h2>
            </div>
            <div className='border border-[#ccc] rounded-[20px]'>
              <div className='space-y-4 h-[340px] overflow-y-auto p-6'>
                {allDateData?.map((singleData, index) => (
                  <div key={index} className='flex justify-between items-center'>
                    <p className='text-[20px] font-semibold font-degular'>{singleData?.date}</p>
                    <button
                      onClick={() => handleDelete(singleData?.id)}
                      className='bg-primary py-2 px-10 rounded-[20px] text-[16px] text-[#fff]'
                    >
                      Unlock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* modal components */}
        {/* modal one */}
        <Modal
          centered
          title={
            <div className="text-center bg-red-600 text-[#ffffff] py-4 font-degular text-[18px] font-semibold rounded-t-lg">
              Block Date
            </div>
          }
          open={modalOne}
          onOk={handleModalOneOk}
          onCancel={handleCancelModalOne}
          footer={null}
          width={500}
          className='custom-service-modal bg-custom'
          maskStyle={{ backgroundColor: 'rgba(134, 134, 134, 0.4)' }}
        >
          <Form form={formOne} onFinish={onFinishOne}>
            <div className="p-8 space-y-4">
              <span className='flex justify-center'>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.4004 49.6L49.6004 10.4M58 30C58 45.464 45.464 58 30 58C14.536 58 2 45.464 2 30C2 14.536 14.536 2 30 2C45.464 2 58 14.536 58 30Z" stroke="#FF3636" stroke-width="4" />
                </svg>
              </span>

              <div>
                <p className='font-degular text-center font-semibold text-[28px]'>
                  Are you sure to <span className='text-[#FF3F3F] font-bold'>Block</span>
                  <br />
                  this date?
                </p>
              </div>

              <div className='flex justify-center mt-2'>
                <button type='submit' className='bg-[#FF3F3F] text-[#fff] text-[16px] font-semibold px-4 py-3 rounded-xl w-[300px]'>
                  Block
                </button>
              </div>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default ManageDates;