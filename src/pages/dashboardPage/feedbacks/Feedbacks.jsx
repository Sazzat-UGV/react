import { Button, Form, Input, Modal, Pagination, Rate } from "antd";
import { useEffect, useState } from "react";
import { useDeleteFeedbackMutation, useGetDBFeedbackApiQuery, } from "../../../redux/dashboardFeatures/feedback/dashboardFeedbackApi";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";




const Feedbacks = () => {
  const [formOne] = Form.useForm();
  const [mondalOne, setModalOne] = useState(false);
  const [selectId, setSelectId] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [hightColor, setHightColor] = useState(false)


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const feedbackId = queryParams.get('id');



  const { data: feebackData, refetch } = useGetDBFeedbackApiQuery({ per_page: perPage, page: currentPage }) // get 
  const allFeedbackData = feebackData?.data?.data
  const totalPaginationData = feebackData?.data?.total



  const [deleteFeedback] = useDeleteFeedbackMutation()


  // find unic notification data
  const existInId = allFeedbackData?.find(item => item?.id === parseInt(feedbackId));

  // sort notification data
  const sortedFeedback = allFeedbackData?.slice().sort((a, b) => {
    const aIsTarget = a.id === parseInt(feedbackId);
    const bIsTarget = b.id === parseInt(feedbackId);

    if (aIsTarget && !bIsTarget) return -1;
    if (!aIsTarget && bIsTarget) return 1;

    return b.is_highlight - a.is_highlight;
  });





  // =============  modal one start ===============
  const showModalOne = (complated, id) => {
    setSelectId(id)
    setModalOne(true)
    if (complated) {
      setHightColor(true)
    } else {
      setHightColor(false)
    }

  }



  const handleModalOneOk = () => {
  }

  const handleCancelModalOne = () => {
    setModalOne(false)
  }
  // =============  modal one end ===============


  const handleHighest = async () => {
    try {
      const token = localStorage.getItem("token");
      const API = import.meta.env.VITE_API_BASE_URL;

      const res = await axios.get(`${API}/admin/feedback-highlight/${selectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res?.data?.status === true) {
        toast.success(res?.data?.message);
        refetch()
        setModalOne(false);
      }else{
         toast.error(res?.message);
      }
    } catch (error) {
     console.log(error)
    }

  }


  // delete api
  const handleDelete = async () => {
    try {
      const res = await deleteFeedback(selectId).unwrap();
      console.log(res);

      if (res?.status === true) {
        toast.success(res?.message);
        setModalOne(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;

      if (typeof errorMessage === 'object') {
        Object.entries(errorMessage).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach(msg => toast.error(msg));
          } else {
            toast.error(messages);
          }
        });
      } else {

        toast.error(errorMessage);
      }
    }

  }


  useEffect(() => {
    refetch();
  }, [currentPage, perPage, refetch]);


  useEffect(() => {
    if (mondalOne) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup function
    };
  }, [mondalOne]);


  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Dashboard Feedbacks";
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Dashboard Feedbacks</title>
      </Helmet>
      <div>
        <div className="space-y-4">
          {
            sortedFeedback?.map((item, index) => {
              return (
                <div key={index} className={`border ${item?.is_highlight === 1 ? "border-primary bg-primary bg-opacity-5" : "border-[#ccc]"} rounded-2xl p-4 space-y-2 ${existInId?.id === item?.id ? 'bg-gray-200' : ""}`}>
                  <div className="flex justify-between items-center ">
                    <div className="flex items-center gap-2">
                      <img src={item?.user?.photo} alt="photo" className="w-[50px] h-[50px] rounded-full" />
                      <div>


                        <h3 className="text-[24px] font-semibold font-degular">{item?.user?.name}</h3>

                        <Rate
                          allowHalf
                          defaultValue={item?.rating}
                          disabled
                          character={(props) => {
                            const index = props.index + 1;
                            const value = props.value;

                            let fillColor = "oklch(92.8% 0.006 264.531)";

                            if (index <= value) {
                              fillColor = "#ffc107"; // full star
                            } else if (index - 0.5 === value) {
                              // half star: use linear gradient
                              return (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 511.987 511"
                                >
                                  <defs>
                                    <linearGradient id={`halfGradient-${index}`}>
                                      <stop offset="50%" stopColor="#ffc107" />
                                      <stop offset="50%" stopColor="oklch(92.8% 0.006 264.531)" />
                                    </linearGradient>
                                  </defs>
                                  <g>
                                    <path
                                      fill={`url(#halfGradient-${index})`}
                                      d="M510.652 185.902a27.158 27.158 0 0 0-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 0 0 1.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0 0 10.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 0 0 7.98-28.927z"
                                    />
                                  </g>
                                </svg>
                              );
                            }

                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 511.987 511"
                              >
                                <g>
                                  <path
                                    fill={fillColor}
                                    d="M510.652 185.902a27.158 27.158 0 0 0-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 0 0 1.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0 0 10.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 0 0 7.98-28.927z"
                                  />
                                </g>
                              </svg>
                            );
                          }}
                        />

                      </div>


                    </div>
                    <span onClick={() => showModalOne(item?.is_highlight, item?.id)} className="cursor-pointer">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="24" fill="#F6F6F6" />
                        <path d="M24 18C25.1046 18 26 17.1046 26 16C26 14.8954 25.1046 14 24 14C22.8954 14 22 14.8954 22 16C22 17.1046 22.8954 18 24 18Z" fill="black" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M24 26C25.1046 26 26 25.1046 26 24C26 22.8954 25.1046 22 24 22C22.8954 22 22 22.8954 22 24C22 25.1046 22.8954 26 24 26Z" fill="black" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M24 34C25.1046 34 26 33.1046 26 32C26 30.8954 25.1046 30 24 30C22.8954 30 22 30.8954 22 32C22 33.1046 22.8954 34 24 34Z" fill="black" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </span>
                  </div>
                  <p>{item.comment}</p>
                </div>
              )
            })
          }
        </div>


        {/* modal component */}
        <Modal
          centered
          title={
            <div className="text-center bg-primary text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
              Feedback
            </div>
          }
          open={mondalOne}
          onOk={handleModalOneOk}
          onCancel={handleCancelModalOne}
          footer={null}
          width={600}
          className='custom-service-modal'
          maskStyle={{ backgroundColor: 'rgba(134, 134, 134, 0.4)' }}
        >

          <div className="">
            <div onClick={handleDelete} className="flex items-center gap-3 bg-red-100 p-4 border-b-2 border-gray-300 cursor-pointer">
              <span>
                <svg width="40" height="40" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#FF3F3F" />
                </svg>

              </span>
              <p className="text-4xl font-degular font-bold text-red-500">Delete</p>
            </div>

            {
              hightColor ? <div onClick={handleHighest} className="flex items-center gap-3 bg-primary bg-opacity-10 p-4 cursor-pointer">
                <span>
                  <svg width="35" height="35" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clipRule="evenodd" d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM8.823 12.14L6.058 9.373L5 10.431L8.119 13.552C8.30653 13.7395 8.56084 13.8448 8.826 13.8448C9.09116 13.8448 9.34547 13.7395 9.533 13.552L15.485 7.602L14.423 6.54L8.823 12.14Z" fill="#0063E5" />
                  </svg>
                </span>
                <p className="text-4xl font-degular font-bold text-primary">Highlighted</p>
              </div>
                :
                <div onClick={handleHighest} className="flex items-center gap-3 bg-[#ffff] bg-opacity-10 p-4 cursor-pointer">
                  <span>
                    <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.58 15.25L7.5 11.36L4.5 8.78L8.45 8.41L10 4.8L11.55 8.45L15.5 8.78L12.5 11.36L13.42 15.25L10 13.19L6.58 15.25ZM10 0C11.3132 0 12.6136 0.258658 13.8268 0.761205C15.0401 1.26375 16.1425 2.00035 17.0711 2.92893C17.9997 3.85752 18.7362 4.95991 19.2388 6.17317C19.7413 7.38642 20 8.68678 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C8.68678 20 7.38642 19.7413 6.17317 19.2388C4.95991 18.7362 3.85752 17.9997 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0ZM10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2Z" fill="black" />
                    </svg>

                  </span>
                  <p className="text-4xl font-degular font-bold ">Highlighted</p>
                </div>
            }
          </div>
        </Modal>


        <div className="flex justify-end pt-4">
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
}

export default Feedbacks