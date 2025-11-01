import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Pagination, Popconfirm, Space, Table } from 'antd';
const { Search } = Input;

import { Dropdown } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useDeleteBookingApiMutation, useFilterBookingApiQuery, useGetBookingApiQuery, useGetDetailsBookingApiQuery, useGetMarkComplateBookingApiQuery } from '../../../redux/dashboardFeatures/bookings/dashboardBookingApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import CustomLoading from '../../../components/shared/CustomLoading';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const DashboardBookings = () => {
  const [formOne] = useForm()
  const [formTwo] = useForm()
  const [open, setOpen] = useState(false);
  const [filterId, setFilterId] = useState('')
  const [selectId, setSelectId] = useState('')
  const [detailsId, setDetailsId] = useState('')
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [mondalOne, setModalOne] = useState(false);
  const [mondalTwo, setModalTwo] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const notificationId = queryParams.get('id');





  const { data: bookingData, isLoading, refetch } = useGetBookingApiQuery({ per_page: perPage, page: currentPage, search: searchText, filter: filterId }) // get booking
  const { data: filterBookingData, } = useFilterBookingApiQuery() // filter booking
  const [deleteBookingApi] = useDeleteBookingApiMutation()
  const { data: markBooking } = useGetMarkComplateBookingApiQuery()
  const { data: detailsBookingData } = useGetDetailsBookingApiQuery(detailsId, {
    skip: !detailsId
  })
  const allBookingData = bookingData?.data?.data
  const allFilterBookingData = filterBookingData?.data
  const totalPaginationData = bookingData?.data?.total
  const detailsBooking = detailsBookingData?.data



  // const existInId = allBookingData?.find(item => item?.id === parseInt(notificationId));


  //  const sortedData = [...allBookingData].sort((a, b) => {
  //     return String(a.id) === notificationId ? -1 : String(b.id) === notificationId ? 1 : 0;
  //   });



  // =============  modal one start ===============
  const onFinishOne = () => {
    console.log('click')
  }

  const showModalOne = (record) => {
    setDetailsId(record.id)
    setModalOne(true)
  }

  const handleModalOneOk = () => {

  }

  const handleCancelModalOne = () => {
    setModalOne(false)
  }
  // =============  modal one end ===============



  // =============  modal two start ===============
  const handleDelete = async (record) => {
    setSelectId(record?.id)

    try {
      const res = await deleteBookingApi(record.id).unwrap()
      if (res?.status === true) {
        toast.success(res?.message)
        refetch()
      }

    } catch (error) {
      console.log(error)
      if (error) {
        toast.error(error?.data?.message)
      }
    }
  }
  // =============  modal two end ===============




  const handleClick = () => {
    setOpen(!open)
  }

  const handleFilterValue = (id) => {
    setFilterId(id)
    setOpen(!open)
  }

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }


  const handleStatusChange = async () => {

    try {
      const token = localStorage.getItem("token");
      const API = import.meta.env.VITE_API_BASE_URL;

      const res = await axios.get(`${API}/admin/booking-status/${detailsBooking?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res?.data?.status === true) {
        toast.success(res?.data?.message);
        setModalOne(false);
        // await refetch()
        window.location.reload();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      if (typeof errorMessage === 'object') {
        Object.entries(errorMessage).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach(msg => toast.error(msg));
          } else {
            toast.error(messages);
          }
        });
      } else {
        toast.error(errorMessage || "Something went wrong");
      }
    }

  }

  const columns = [
    {
      title: 'User', dataIndex: 'user', key: 'user',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img src={record?.user?.photo} alt="User" className="w-10 h-10 rounded-full" />
          <span>{record?.user?.name}</span>
        </div>
      ),
    },

    {
      title: 'Email', dataIndex: 'email',
      render: (_, record) => (
        <span>{record?.user?.email}</span>
      )
    },
    {
      title: 'Phone', dataIndex: 'phone',
      render: (_, record) => (
        <span>{record?.user?.phone}</span>
      )
    },

    {
      title: 'Time', dataIndex: 'time', key: 'time',
      render: (_, record) => (
        <div>
          <div>{record.booking_date}</div>
          <div className='text-[#888888]'>{record?.booking_time}</div>
        </div>
      ),
    },
    {
      title: 'Service', dataIndex: 'Service',
      render: (_, record) => (
        <div className='flex flex-col'>
          <span className='font-semibold text-[28px] font-degular'>{record?.service_name}</span>
          <span className='font-medium text-[20px] font-degular'>{record?.service_type}</span>
        </div>
      )
    },

    {
      title: <div className="text-right">Action</div>,
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <div className="flex items-center justify-end  gap-3">
          <button
            onClick={() => showModalOne(record)}
            className=" p-1 rounded bg-blue"
          >
            <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="37" height="37" rx="5" fill="#FFF3EB" />
              <path d="M18.5 15.3C17.632 15.3 16.7996 15.6371 16.1858 16.2373C15.5721 16.8374 15.2273 17.6513 15.2273 18.5C15.2273 19.3487 15.5721 20.1626 16.1858 20.7627C16.7996 21.3629 17.632 21.7 18.5 21.7C19.368 21.7 20.2004 21.3629 20.8142 20.7627C21.4279 20.1626 21.7727 19.3487 21.7727 18.5C21.7727 17.6513 21.4279 16.8374 20.8142 16.2373C20.2004 15.6371 19.368 15.3 18.5 15.3ZM18.5 23.8333C17.0534 23.8333 15.666 23.2714 14.6431 22.2712C13.6201 21.271 13.0455 19.9145 13.0455 18.5C13.0455 17.0855 13.6201 15.729 14.6431 14.7288C15.666 13.7286 17.0534 13.1667 18.5 13.1667C19.9466 13.1667 21.334 13.7286 22.3569 14.7288C23.3799 15.729 23.9545 17.0855 23.9545 18.5C23.9545 19.9145 23.3799 21.271 22.3569 22.2712C21.334 23.2714 19.9466 23.8333 18.5 23.8333ZM18.5 10.5C13.0455 10.5 8.38727 13.8173 6.5 18.5C8.38727 23.1827 13.0455 26.5 18.5 26.5C23.9545 26.5 28.6127 23.1827 30.5 18.5C28.6127 13.8173 23.9545 10.5 18.5 10.5Z" fill="#F96D10" />
            </svg>
          </button>
          <Popconfirm
            title={
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0.946045C3.61758 0.946045 0.875 3.68862 0.875 7.07104C0.875 10.4535 3.61758 13.196 7 13.196C10.3824 13.196 13.125 10.4535 13.125 7.07104C13.125 3.68862 10.3824 0.946045 7 0.946045ZM6.5625 4.11792C6.5625 4.05776 6.61172 4.00854 6.67188 4.00854H7.32812C7.38828 4.00854 7.4375 4.05776 7.4375 4.11792V7.83667C7.4375 7.89683 7.38828 7.94604 7.32812 7.94604H6.67188C6.61172 7.94604 6.5625 7.89683 6.5625 7.83667V4.11792ZM7 10.1335C6.82827 10.13 6.66476 10.0594 6.54455 9.93667C6.42434 9.81398 6.35701 9.64906 6.35701 9.47729C6.35701 9.30553 6.42434 9.14061 6.54455 9.01792C6.66476 8.89523 6.82827 8.82455 7 8.82104C7.17173 8.82455 7.33524 8.89523 7.45545 9.01792C7.57566 9.14061 7.64299 9.30553 7.64299 9.47729C7.64299 9.64906 7.57566 9.81398 7.45545 9.93667C7.33524 10.0594 7.17173 10.13 7 10.1335Z" fill="#FAAD14" />
                </svg>

                <span>Are you sure to delete this appointment ?</span>
              </span>
            }
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            placement='bottomRight'
            overlayClassName="custom-popconfirm"
          >
            <button className="bg-secondary px-3 py-1 rounded">
              <svg width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="34" height="38" rx="6" fill="#FFE8E8" />
                <path d="M24 11H20.5L19.5 10H14.5L13.5 11H10V13H24M11 26C11 26.5304 11.2107 27.0391 11.5858 27.4142C11.9609 27.7893 12.4696 28 13 28H21C21.5304 28 22.0391 27.7893 22.4142 27.4142C22.7893 27.0391 23 26.5304 23 26V14H11V26Z" fill="#FF5353" />
              </svg>
            </button>
          </Popconfirm>




          <button>
            {record.status === "Ongoing" ? (
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5.5" cy="6" r="5.5" fill="#8C63DA" />
              </svg>
            ) : (
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5.5" cy="6" r="5.5" fill="#009138" />
              </svg>
            )}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    refetch();
  }, [searchText, currentPage, perPage, filterId, refetch]);

  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Dashboard Bookings";
  }, [location.pathname]);


  if (isLoading) {
    return <CustomLoading />
  }

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Dashboard Bookings</title>
      </Helmet>
      <div>
        <div className='flex justify-between items-center mb-2'>
          <div>
            <Space direction="vertical" style={{ marginBottom: "20px", }}>
              <Search placeholder="Enter search email or name"
                enterButton
                className="custom-search-height"
                value={searchText}
                onChange={handleChange}
              />
            </Space>
          </div>

          <div className='relative z-50'>
            <div onClick={handleClick} className='relative cursor-pointer bg-primary px-4 py-3 text-[#fff] flex justify-center items-center gap-3 rounded'>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5929 1H2.00086C1.80861 0.999836 1.6204 1.05509 1.45875 1.15914C1.2971 1.26319 1.16886 1.41164 1.08941 1.58669C1.00995 1.76175 0.98264 1.956 1.01074 2.14618C1.03884 2.33636 1.12117 2.51441 1.24786 2.659L6.54986 8.717C6.70932 8.89948 6.7971 9.13366 6.79686 9.376V14.25C6.79686 14.3276 6.81493 14.4042 6.84964 14.4736C6.88436 14.543 6.93476 14.6034 6.99686 14.65L9.99686 16.9C10.0711 16.9557 10.1595 16.9896 10.252 16.998C10.3444 17.0063 10.4374 16.9887 10.5205 16.9472C10.6035 16.9057 10.6734 16.8419 10.7222 16.7629C10.771 16.6839 10.7969 16.5929 10.7969 16.5V9.376C10.7966 9.13366 10.8844 8.89948 11.0439 8.717L16.3459 2.658C16.9119 2.012 16.4519 1 15.5929 1Z" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>

              <p className='font-semibold text-2xl'>Filter</p>
            </div>

            {
              open && <div className='absolute text-center py-2 space-y-2 bg-[#FFFFFF] w-[116px] h-[170px] overflow-y-auto hover:border transition-all duration-300 '>
                {
                  allFilterBookingData?.map((item, index) => {
                    return (
                      <p
                        key={index}
                        onClick={() => handleFilterValue(item.id)}
                        className='font-semibold hover:cursor-pointer hover:bg-primary bg-opacity-30 hover:text-[#ffff]'>{item?.car_type}</p>
                    )
                  })
                }
              </div>
            }
          </div>
        </div>


        <div className='z-20'>
          <Table
            columns={columns}
            dataSource={allBookingData}
            pagination={false}
            rowKey="id"
            rowClassName={(record) => {
              return String(record.id) === notificationId ? "!bg-gray-200" : "";
            }}
          />
        </div>




        {/* modal component */}
        {/* modal one */}
        <Modal
          centered
          title={
            <div className="text-center bg-primary text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
              Booking Details
            </div>
          }
          open={mondalOne}
          onOk={handleModalOneOk}
          onCancel={handleCancelModalOne}
          footer={null}
          width={900}
          className='custom-service-modal'
          maskStyle={{ backgroundColor: 'rgba(134, 134, 134, 0.4)' }}
        >

          <div className="p-8">
            <div className="max-w-6xl mx-auto p-6 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Car Details */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <svg width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M34.8 10.5652H33.18L29.013 1.39402C28.8244 0.979083 28.5169 0.626546 28.1277 0.379122C27.7384 0.131698 27.2842 5.43551e-06 26.82 0H9.18C8.71581 5.43551e-06 8.26158 0.131698 7.87235 0.379122C7.48311 0.626546 7.17558 0.979083 6.987 1.39402L2.82 10.5652H1.2C0.88174 10.5652 0.576515 10.6889 0.351472 10.909C0.126428 11.1292 0 11.4278 0 11.7391C0 12.0505 0.126428 12.3491 0.351472 12.5692C0.576515 12.7894 0.88174 12.913 1.2 12.913H2.4V24.6522C2.4 25.2749 2.65286 25.872 3.10294 26.3123C3.55303 26.7526 4.16348 27 4.8 27H8.4C9.03652 27 9.64697 26.7526 10.0971 26.3123C10.5471 25.872 10.8 25.2749 10.8 24.6522V23.4783H25.2V24.6522C25.2 25.2749 25.4529 25.872 25.9029 26.3123C26.353 26.7526 26.9635 27 27.6 27H31.2C31.8365 27 32.447 26.7526 32.8971 26.3123C33.3471 25.872 33.6 25.2749 33.6 24.6522V12.913H34.8C35.1183 12.913 35.4235 12.7894 35.6485 12.5692C35.8736 12.3491 36 12.0505 36 11.7391C36 11.4278 35.8736 11.1292 35.6485 10.909C35.4235 10.6889 35.1183 10.5652 34.8 10.5652ZM10.8 17.6087H7.2C6.88174 17.6087 6.57652 17.485 6.35147 17.2649C6.12643 17.0447 6 16.7461 6 16.4348C6 16.1234 6.12643 15.8249 6.35147 15.6047C6.57652 15.3845 6.88174 15.2609 7.2 15.2609H10.8C11.1183 15.2609 11.4235 15.3845 11.6485 15.6047C11.8736 15.8249 12 16.1234 12 16.4348C12 16.7461 11.8736 17.0447 11.6485 17.2649C11.4235 17.485 11.1183 17.6087 10.8 17.6087ZM28.8 17.6087H25.2C24.8817 17.6087 24.5765 17.485 24.3515 17.2649C24.1264 17.0447 24 16.7461 24 16.4348C24 16.1234 24.1264 15.8249 24.3515 15.6047C24.5765 15.3845 24.8817 15.2609 25.2 15.2609H28.8C29.1183 15.2609 29.4235 15.3845 29.6485 15.6047C29.8736 15.8249 30 16.1234 30 16.4348C30 16.7461 29.8736 17.0447 29.6485 17.2649C29.4235 17.485 29.1183 17.6087 28.8 17.6087ZM5.4465 10.5652L9.18 2.34783H26.82L30.5535 10.5652H5.4465Z" fill="#888888" />
                    </svg>

                    <span className="font-medium">Car details</span>
                  </div>

                  {/* Car Info */}
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Car Make</p>
                      <h2 className="text-2xl font-bold text-gray-900">{detailsBooking?.user?.car_brand}</h2>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Car Model</p>
                      <h2 className="text-2xl font-bold text-gray-900">{detailsBooking?.user?.car_model}</h2>
                    </div>
                  </div>

                  {/* Pictures */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pictures</h3>
                    {
                      detailsBooking?.user?.car_photos && <div className="grid grid-cols-2 gap-3">
                        {detailsBooking?.user?.car_photos?.slice(-6)?.reverse()?.map((item, index) => (
                          <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={item.photo}
                              alt={`BMW M5 CS view ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    }
                  </div>


                </div>

                {/* Right Side - Booking Details */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clipRule="evenodd" d="M21.6 3.6H24.3C25.0161 3.6 25.7028 3.88446 26.2092 4.39081C26.7155 4.89716 27 5.58392 27 6.3V24.3C27 25.0161 26.7155 25.7028 26.2092 26.2092C25.7028 26.7155 25.0161 27 24.3 27H2.7C1.98392 27 1.29716 26.7155 0.790812 26.2092C0.284463 25.7028 0 25.0161 0 24.3L0 6.3C0 5.58392 0.284463 4.89716 0.790812 4.39081C1.29716 3.88446 1.98392 3.6 2.7 3.6H5.4V0H7.2V3.6H19.8V0H21.6V3.6ZM10.8 14.4H5.4V12.6H10.8V14.4ZM21.6 12.6H16.2V14.4H21.6V12.6ZM10.8 19.8H5.4V18H10.8V19.8ZM16.2 19.8H21.6V18H16.2V19.8Z" fill="#888888" />
                    </svg>

                    <span className="font-medium">Booking details</span>
                  </div>

                  <div className='border border-gray-200 p-6 rounded-lg'>
                    {/* Customer Info */}
                    <div className=" rounded-xl p-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8  rounded-full flex items-center justify-center">
                          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0.5C11.3261 0.5 12.5979 1.02678 13.5355 1.96447C14.4732 2.90215 15 4.17392 15 5.5C15 6.82608 14.4732 8.09785 13.5355 9.03553C12.5979 9.97322 11.3261 10.5 10 10.5C8.67392 10.5 7.40215 9.97322 6.46447 9.03553C5.52678 8.09785 5 6.82608 5 5.5C5 4.17392 5.52678 2.90215 6.46447 1.96447C7.40215 1.02678 8.67392 0.5 10 0.5ZM10 13C15.525 13 20 15.2375 20 18V20.5H0V18C0 15.2375 4.475 13 10 13Z" fill="#0063E5" />
                          </svg>

                        </div>
                        <span className="text-[20px] font-bold text-gray-900">{detailsBooking?.user?.name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8  rounded-full flex items-center justify-center">
                          <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5 0.5H2.5C1.125 0.5 0.0125 1.625 0.0125 3L0 18C0 19.375 1.125 20.5 2.5 20.5H22.5C23.875 20.5 25 19.375 25 18V3C25 1.625 23.875 0.5 22.5 0.5ZM22.5 5.5L12.5 11.75L2.5 5.5V3L12.5 9.25L22.5 3V5.5Z" fill="#0063E5" />
                          </svg>

                        </div>
                        <span className="text-gray-700 text-[20px]">{detailsBooking?.user?.email}</span>
                      </div>

                      {
                        detailsBooking?.user?.phone && <div className="flex items-center gap-3">
                          <div className="w-8 h-8  rounded-full flex items-center justify-center">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.02222 9.15556C5.62222 12.3 8.2 14.8667 11.3444 16.4778L13.7889 14.0333C14.0889 13.7333 14.5333 13.6333 14.9222 13.7667C16.1667 14.1778 17.5111 14.4 18.8889 14.4C19.5 14.4 20 14.9 20 15.5111V19.3889C20 20 19.5 20.5 18.8889 20.5C8.45556 20.5 0 12.0444 0 1.61111C0 1 0.5 0.5 1.11111 0.5H5C5.61111 0.5 6.11111 1 6.11111 1.61111C6.11111 3 6.33333 4.33333 6.74444 5.57778C6.86667 5.96667 6.77778 6.4 6.46667 6.71111L4.02222 9.15556Z" fill="#0063E5" />
                            </svg>

                          </div>
                          <span className="text-gray-700 text-[20px]">{detailsBooking?.user?.phone}</span>
                        </div>
                      }
                    </div>

                    <div className='space-y-4'>
                      {/* Date & Time */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 7.31575C0 5.33049 -6.27417e-08 4.33891 0.616842 3.72207C1.23368 3.10522 2.22526 3.10522 4.21053 3.10522H16.8421C18.8274 3.10522 19.8189 3.10522 20.4358 3.72207C21.0526 4.33891 21.0526 5.33049 21.0526 7.31575C21.0526 7.81154 21.0526 8.05996 20.8989 8.2147C20.7442 8.36838 20.4947 8.36838 20 8.36838H1.05263C0.556842 8.36838 0.308421 8.36838 0.153684 8.2147C-9.41126e-08 8.05996 0 7.81049 0 7.31575ZM0 16.7894C0 18.7747 -6.27417e-08 19.7663 0.616842 20.3831C1.23368 21 2.22526 21 4.21053 21H16.8421C18.8274 21 19.8189 21 20.4358 20.3831C21.0526 19.7663 21.0526 18.7747 21.0526 16.7894V11.5263C21.0526 11.0305 21.0526 10.7821 20.8989 10.6273C20.7442 10.4736 20.4947 10.4736 20 10.4736H1.05263C0.556842 10.4736 0.308421 10.4736 0.153684 10.6273C-9.41126e-08 10.7821 0 11.0315 0 11.5263V16.7894Z" fill="#0063E5" />
                              <path d="M5.26318 1V4.15789M15.7895 1V4.15789" stroke="#0063E5" stroke-width="2" stroke-linecap="round" />
                            </svg>

                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-[20px]">{detailsBooking?.booking_date}</p>
                            <p className="text-gray-600 text-[20px]">{detailsBooking?.booking_time}</p>
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Type */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.9381 1.99389e-06C13.1395 -0.000171193 12.3512 0.18272 11.6326 0.534904C10.9141 0.887089 10.284 1.39939 9.78978 2.03323C9.29558 2.66707 8.95015 3.40592 8.7795 4.19417C8.60885 4.98242 8.61744 5.7995 8.80461 6.58391L0.826953 14.6438C0.566804 14.9014 0.359775 15.2085 0.217839 15.5475C0.0759028 15.8864 0.0018748 16.2503 3.51517e-05 16.6183C-0.0018045 16.9863 0.0685809 17.3511 0.207122 17.6914C0.345662 18.0317 0.549609 18.341 0.807169 18.6012C1.06473 18.8614 1.37079 19.0675 1.70766 19.2074C2.04453 19.3474 2.40553 19.4185 2.76977 19.4166C3.13401 19.4148 3.49427 19.34 3.82973 19.1966C4.16518 19.0532 4.46917 18.844 4.72411 18.5812L8.67407 14.5924C8.75197 13.4438 9.14117 12.339 9.79906 11.3989L3.70567 17.5532C3.45873 17.8027 3.1238 17.9429 2.77457 17.9429C2.42534 17.9429 2.09042 17.8027 1.84348 17.5532C1.59654 17.3037 1.45781 16.9653 1.45781 16.6125C1.45781 16.2597 1.59654 15.9213 1.84348 15.6718L10.1216 7.31029C10.216 7.21461 10.2822 7.09424 10.3127 6.96269C10.3432 6.83114 10.3369 6.69359 10.2944 6.56549C10.0902 5.94948 10.0424 5.29154 10.1554 4.65202C10.2684 4.01251 10.5386 3.4119 10.9411 2.90532C11.3436 2.39874 11.8656 2.0024 12.4592 1.75267C13.0528 1.50294 13.699 1.40781 14.3384 1.47602L12.5683 3.26432C12.4569 3.37689 12.3685 3.51054 12.3082 3.65764C12.2479 3.80473 12.2168 3.96239 12.2168 4.12161C12.2168 4.28083 12.2479 4.43849 12.3082 4.58559C12.3685 4.73269 12.4569 4.86634 12.5683 4.97891L14.2894 6.71774C14.5144 6.94486 14.8195 7.07243 15.1375 7.07243C15.4555 7.07243 15.7606 6.94486 15.9856 6.71774L17.7566 4.92848C17.77 5.06231 17.7767 5.19743 17.7767 5.33385C17.777 6.04539 17.5835 6.74328 17.2174 7.35117C16.8514 7.95907 16.327 8.45354 15.7014 8.78049C16.3151 8.86062 16.9136 9.03253 17.4772 9.2906C18.025 8.79064 18.4629 8.18019 18.7626 7.49866C19.0624 6.81712 19.2174 6.07965 19.2175 5.33385C19.2175 4.59002 19.0668 3.88111 18.7932 3.23619C18.747 3.12681 18.675 3.03054 18.5834 2.95582C18.4918 2.88111 18.3834 2.83023 18.2679 2.80764C18.1523 2.78505 18.033 2.79144 17.9204 2.82626C17.8078 2.86107 17.7054 2.92324 17.6222 3.00732L15.138 5.51811L13.7567 4.12161L16.2419 1.61179C16.3251 1.52774 16.3867 1.42435 16.4212 1.31067C16.4557 1.19699 16.4622 1.0765 16.4399 0.959732C16.4176 0.842968 16.3674 0.7335 16.2935 0.640913C16.2197 0.548326 16.1245 0.475444 16.0163 0.42865C15.3594 0.145203 14.6524 -0.000621962 13.9381 1.99389e-06ZM11.8043 11.6142C11.8759 11.8649 11.8967 12.1277 11.8655 12.3868C11.8342 12.6458 11.7515 12.8958 11.6224 13.1218C11.4932 13.3478 11.3203 13.5452 11.1139 13.7021C10.9074 13.8589 10.6718 13.9721 10.4211 14.0348L9.86049 14.1745C9.77007 14.7555 9.77201 15.3474 9.86625 15.9278L10.3846 16.0539C10.6376 16.1155 10.8756 16.2284 11.0841 16.3858C11.2925 16.5431 11.4672 16.7417 11.5974 16.9694C11.7275 17.197 11.8105 17.4491 11.8413 17.7101C11.8721 17.9712 11.85 18.2359 11.7764 18.4881L11.5969 19.1C12.0193 19.4744 12.4992 19.7779 13.0224 19.9942L13.4956 19.4909C13.6749 19.3003 13.8908 19.1485 14.1299 19.0448C14.3691 18.9411 14.6267 18.8877 14.887 18.8877C15.1472 18.8877 15.4048 18.9411 15.644 19.0448C15.8832 19.1485 16.099 19.3003 16.2783 19.4909L16.7573 20C17.2766 19.7861 17.7572 19.4869 18.1799 19.1146L17.9898 18.4493C17.9182 18.1985 17.8974 17.9357 17.9288 17.6766C17.9601 17.4175 18.0428 17.1674 18.1721 16.9414C18.3013 16.7154 18.4744 16.5181 18.6809 16.3612C18.8874 16.2044 19.1232 16.0913 19.374 16.0287L19.9336 15.8891C20.024 15.308 20.0221 14.7161 19.9278 14.1357L19.4095 14.0096C19.1566 13.9479 18.9187 13.8349 18.7103 13.6775C18.502 13.5201 18.3274 13.3215 18.1973 13.0939C18.0673 12.8662 17.9843 12.6142 17.9536 12.3532C17.9229 12.0922 17.945 11.8276 18.0186 11.5754L18.1972 10.9645C17.7746 10.5888 17.2932 10.2867 16.7727 10.0703L16.2994 10.5727C16.1201 10.7634 15.9042 10.9153 15.6649 11.0191C15.4257 11.1228 15.168 11.1764 14.9076 11.1764C14.6472 11.1764 14.3895 11.1228 14.1503 11.0191C13.911 10.9153 13.6951 10.7634 13.5158 10.5727L13.0377 10.0635C12.5156 10.2769 12.0356 10.5775 11.6142 10.948L11.8043 11.6142ZM14.898 16.4864C14.1301 16.4864 13.5062 15.8347 13.5062 15.0318C13.5062 14.2288 14.1301 13.5771 14.898 13.5771C15.6659 13.5771 16.2899 14.2288 16.2899 15.0318C16.2899 15.8347 15.6659 16.4864 14.898 16.4864Z" fill="#0063E5" />
                            </svg>

                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-[20px]">{detailsBooking?.service_name}</p>
                            <p className="text-gray-600 text-[20px]">{detailsBooking?.service_type}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="">
                    {
                      detailsBooking?.status === 'Completed' ? <button className="cursor-not-allowed pt-4 w-full flex-1 bg-[#009138] hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                        Complete order
                      </button>
                        :
                        <div className='flex gap-3 pt-4'>
                          <button className="cursor-not-allowed flex-1 bg-[#8C63DA]  text-white font-medium py-3 px-6 rounded-full transition-colors">
                            Ongoing
                          </button>
                          <button onClick={() => handleStatusChange()} className="flex-1 bg-[#009138] hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                            Complete order
                          </button>
                        </div>
                    }

                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            {
              detailsBooking?.booking_note && <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Note</h3>
                <div className="w-full bg-[#F6F6F6] p-4 rounded-xl">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {detailsBooking?.booking_note}
                  </p>
                </div>
              </div>
            }

          </div>
        </Modal>



        <div className="flex justify-end pt-2">
          <Pagination
            current={currentPage}
            pageSize={perPage}
            total={totalPaginationData || 0}
            onChange={(page, pageSize) => {
              setCurrentPage(page)
              setPerPage(pageSize)
            }}
          />
        </div>
      </div>
    </>
  )
};
export default DashboardBookings;
