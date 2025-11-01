

import React, { useEffect, useState } from 'react';
import { Input, Pagination, Space, Table } from 'antd';
const { Search } = Input;
import { useFilterBookingApiQuery, useGetTransitionApiQuery } from '../../../redux/dashboardFeatures/transition/dashboardTransitionApi';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Transactions = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [filterId, setFilterId] = useState('')
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const { data: transitionData, isLoading, refetch } = useGetTransitionApiQuery({ per_page: perPage, page: currentPage, search: searchText, filter: filterId })
  const { data: filterBookingData, } = useFilterBookingApiQuery() // filter booking
  const allTransitionData = transitionData?.data?.data
  const allFilterBookingData = filterBookingData?.data
  const totalPaginationData = transitionData?.data?.total


  const handleClick = () => {
    setOpen(!open)
  }

  console.log(allTransitionData)



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
      title: 'Email', dataIndex: 'email', key: 'email',
      render: (_, record) => (
        <span>{record?.user?.email}</span>
      )
    },

    {
      title: 'Service', dataIndex: 'Service', key: 'service',
      render: (_, record) => (
        <div className='flex flex-col'>
          <span className='font-semibold text-[28px] font-degular'>{record?.service_name}</span>
          <span className='font-medium text-[20px] font-degular'>{record?.service_type}</span>
        </div>
      )
    },
    {
      title: 'Cost', dataIndex: 'price', key: 'cost',
      render: (_, record) => (
        <div className='flex flex-col'>
          <span className='font-semibold text-[28px] font-degular text-primary'>${record?.price}</span>
        </div>
      )
    },
  ];



  const handleFilterValue = (id) => {
    setFilterId(id)
    setOpen(!open)
  }

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }


  useEffect(() => {
    refetch();
  }, [searchText, currentPage, perPage, filterId, refetch]);

  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Dashboard Transitions";
  }, [location.pathname]);

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Dashboard Transitions</title>
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
              open && <div className='absolute h-[170px] overflow-y-auto text-center py-2 space-y-2 bg-[#FFFFFF] w-[116px] hover:border transition-all duration-300'>
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

        <Table
          columns={columns}
          dataSource={allTransitionData}
          pagination={false}
        />
      </div>



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
    </>
  )
};
export default Transactions;