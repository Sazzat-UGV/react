import { useLocation, useNavigate } from "react-router-dom"
import { useGetNotificationApiQuery, usePostAllMarkRedNotificationApiMutation, usePostMarkRedNotificationApiMutation } from "../../../redux/dashboardFeatures/notification/dashboardNotificationApi"
import toast from "react-hot-toast"
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";


const DashboardNotification = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { data: getNotification, refetch } = useGetNotificationApiQuery()
    const notificationData = getNotification?.data

    const [postMarkRedNotificationApi] = usePostMarkRedNotificationApiMutation()
    const [postAllMarkRedNotificationApi] = usePostAllMarkRedNotificationApiMutation()





    // date formate
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }


    //  time formate
    function formatTime(isoDate) {
        const date = new Date(isoDate);

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        return `${hours}:${minutes} ${ampm}`;
    }


    const handleMarkAsRead = async () => {
        try {
            const res = await postAllMarkRedNotificationApi().unwrap()
            if (res?.status === true) {
                toast.success(res?.message)
                await refetch()
            }else{
                toast.error(res?.message);
            }
        } catch (error) {
           console.log(error)
        }
    }


    const handleMark = async (text, id) => {
        if (text === "mark_read") {
            try {
                const res = await postMarkRedNotificationApi(id).unwrap()
                if (res?.status === true) {
                    toast.success(res?.message)
                    await refetch()
                }else{
                    toast.error(res?.message);
                }
            } catch (error) {
               console.log(error)
            }
        }
    }


    const handleTapToView = async (type, data, markId) => {

        if (type === 'New Appointment') {
            try {
                const res = await postMarkRedNotificationApi(markId).unwrap()
                if (res?.status === true) {
                    toast.success(res?.message)
                    await refetch()
                }else{
                    toast.error(res?.message);
                }
            } catch (error) {
                console.log(error)
            } finally {
                navigate(`/admin/dashboard/bookings?id=${data?.appointment_id}`);
            }
        }
        else if (type === 'New Feedback') {
            try {
                const res = await postMarkRedNotificationApi(markId).unwrap()
                if (res?.status === true) {
                    toast.success(res?.message)
                    await refetch()
                }else{
                    toast.error(res?.message);
                }
            } catch (error) {
               console.log(error)
            } finally {
                navigate(`/admin/dashboard/feedbacks?id=${data?.feedback_id}`);
            }
        }
    }


    useEffect(() => {
        document.title = "FULL CIRCLE Detailing~Dashboard Notifications";
    }, [location.pathname]);


    return (
        <>
            <Helmet>
                <title>FULL CIRCLE Detailing~Dashboard Notifications</title>
            </Helmet>
            <div className="space-y-4">
                <div className="flex justify-end">
                    <button
                        onClick={handleMarkAsRead}
                        className="w-[180px] h-[44px]  rounded-[20px] border flex justify-center items-center gap-3 font-semibold">
                        <span><svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.7718 0.484955C12.2334 0.167283 11.6222 0 11 0C10.3778 0 9.76664 0.167283 9.22821 0.484955L1.76393 4.88799C1.22729 5.2046 0.78182 5.65945 0.472214 6.20689C0.162607 6.75433 -0.000244533 7.37511 2.75602e-07 8.00694V16.3975C2.75602e-07 17.353 0.372512 18.2693 1.03559 18.9449C1.69866 19.6205 2.59798 20 3.53571 20H18.4643C19.402 20 20.3013 19.6205 20.9644 18.9449C21.6275 18.2693 22 17.353 22 16.3975V8.00614C22 7.37458 21.837 6.75414 21.5274 6.207C21.2178 5.65986 20.7725 5.20527 20.2361 4.88879L12.7718 0.484955ZM10.0155 1.87071C10.3147 1.69416 10.6543 1.60119 11 1.60119C11.3457 1.60119 11.6853 1.69416 11.9845 1.87071L19.4488 6.27374C19.7136 6.42985 19.9336 6.6436 20.0978 6.89417L11 11.8856L1.90221 6.89497C2.06721 6.6444 2.28721 6.43065 2.55121 6.27454L10.0155 1.87071ZM1.57143 8.5313L10.6276 13.5003C10.742 13.5631 10.87 13.596 11 13.596C11.13 13.596 11.258 13.5631 11.3724 13.5003L20.4286 8.5313V16.3975C20.4286 16.9283 20.2216 17.4374 19.8532 17.8127C19.4849 18.188 18.9852 18.3989 18.4643 18.3989H3.53571C3.01475 18.3989 2.51513 18.188 2.14675 17.8127C1.77838 17.4374 1.57143 16.9283 1.57143 16.3975V8.5313Z" fill="black" />
                        </svg>
                        </span>
                        Mark all as read
                    </button>
                </div>

                <div className="space-y-5" >
                    {
                        notificationData?.map((item, index) => {
                            return (
                                <div key={index} className="grid grid-cols-12 bg-[#ffff] p-6 rounded-[20px] relative" >

                                    <div className="col-span-6">
                                        {
                                            item?.data?.type === "New Appointment" ? <span>
                                                <svg className="absolute left-0 top-[30%]" width="9" height="52" viewBox="0 0 9 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 52C4.97056 52 9 47.9706 9 43V9C9 4.02944 4.97056 0 0 0V52Z" fill="url(#paint0_linear_200_5452)" />
                                                    <defs>
                                                        <linearGradient id="paint0_linear_200_5452" x1="4.5" y1="52" x2="4.5" y2="0" gradientUnits="userSpaceOnUse">
                                                            <stop stop-color="#FF9E02" />
                                                            <stop offset="1" stop-color="#FFF1DB" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </span> : item?.data?.type === "New Feedback" ? <span>
                                                <svg className="absolute left-0 top-[30%]" width="9" height="52" viewBox="0 0 9 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 52C4.97056 52 9 47.9706 9 43V9C9 4.02944 4.97056 0 0 0V52Z" fill="url(#paint0_linear_200_5475)" />
                                                    <defs>
                                                        <linearGradient id="paint0_linear_200_5475" x1="4.5" y1="52" x2="4.5" y2="0" gradientUnits="userSpaceOnUse">
                                                            <stop stop-color="#FF3F3F" />
                                                            <stop offset="1" stop-color="#FFEAEA" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </span>
                                                :
                                                <span>
                                                    <svg className="absolute left-0 top-[30%]" width="9" height="52" viewBox="0 0 9 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 52C4.97056 52 9 47.9706 9 43V9C9 4.02944 4.97056 0 0 0V52Z" fill="url(#paint0_linear_200_5422)" />
                                                        <defs>
                                                            <linearGradient id="paint0_linear_200_5422" x1="4.5" y1="52" x2="4.5" y2="0" gradientUnits="userSpaceOnUse">
                                                                <stop stop-color="#0063E5" />
                                                                <stop offset="1" stop-color="#B5D5FF" />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>
                                        }
                                        <h2 className="text-[24px] font-degular font-semibold">{item?.data?.title}</h2>
                                        <p>{item?.data?.sub_title}
                                            <span onClick={() => handleTapToView((item?.data?.type), (item?.data), (item.id))} className="cursor-pointer text-[#888888] pl-1">
                                                {item?.data?.type === "New Appointment" || item?.data?.type === "New Feedback"
                                                    ? "Tap to view"
                                                    : ""}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="space-y-2 col-span-3 ">
                                        <span className="text-[#888888] flex items-center gap-3">
                                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 9H4V11H6V9ZM10 9H8V11H10V9ZM14 9H12V11H14V9ZM16 2H15V0H13V2H5V0H3V2H2C1.46957 2 0.960859 2.21071 0.585786 2.58579C0.210714 2.96086 0 3.46957 0 4V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2ZM16 18H2V7H16V18Z" fill="#888888" />
                                            </svg>
                                            {formatDate(item?.created_at)}
                                        </span>
                                        <span className="text-[#888888] flex items-center gap-3">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18Z" fill="#888888" />
                                                <path d="M11 5H9V11H15V9H11V5Z" fill="#888888" />
                                            </svg>

                                            {formatTime((item?.created_at))}
                                        </span>
                                    </div>
                                    <div className="col-span-3 h-full flex justify-end items-center">
                                        {
                                            item?.read_at === null ? <svg onClick={() => handleMark('mark_read', item?.id)} className="cursor-pointer" width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.8276 6.4C20.669 6.4 21.4759 6.06286 22.0708 5.46274C22.6658 4.86263 23 4.04869 23 3.2C23 2.35131 22.6658 1.53737 22.0708 0.937258C21.4759 0.337142 20.669 0 19.8276 0C18.9862 0 18.1793 0.337142 17.5844 0.937258C16.9894 1.53737 16.6552 2.35131 16.6552 3.2C16.6552 4.04869 16.9894 4.86263 17.5844 5.46274C18.1793 6.06286 18.9862 6.4 19.8276 6.4ZM15.4655 3.2C15.4655 5.384 17.0438 7.1968 19.113 7.5416L11.1034 11.8912L1.17379 6.4984L0.00317237 5.8424C0.0434279 4.91575 0.436708 4.04053 1.10102 3.39921C1.76534 2.75788 2.64942 2.39994 3.56897 2.4H15.5369C15.4893 2.65973 15.4655 2.9264 15.4655 3.2ZM0 7.6704V16.4C0 17.3548 0.376015 18.2705 1.04533 18.9456C1.71464 19.6207 2.62242 20 3.56897 20H18.6379C19.5845 20 20.4923 19.6207 21.1616 18.9456C21.8309 18.2705 22.2069 17.3548 22.2069 16.4V7.6704L21.7897 7.9048L11.4794 13.5048C11.3638 13.5675 11.2347 13.6004 11.1034 13.6004C10.9722 13.6004 10.8431 13.5675 10.7275 13.5048L0.407655 7.8992L0 7.6704Z" fill="black" />
                                            </svg>

                                                :
                                                <svg className="cursor-not-allowed" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.7718 0.484955C12.2334 0.167283 11.6222 0 11 0C10.3778 0 9.76664 0.167283 9.22821 0.484955L1.76393 4.88799C1.22729 5.2046 0.78182 5.65945 0.472214 6.20689C0.162607 6.75433 -0.000244533 7.37511 2.75602e-07 8.00694V16.3975C2.75602e-07 17.353 0.372512 18.2693 1.03559 18.9449C1.69866 19.6205 2.59798 20 3.53571 20H18.4643C19.402 20 20.3013 19.6205 20.9644 18.9449C21.6275 18.2693 22 17.353 22 16.3975V8.00614C22 7.37458 21.837 6.75414 21.5274 6.207C21.2178 5.65986 20.7725 5.20527 20.2361 4.88879L12.7718 0.484955ZM10.0155 1.87071C10.3147 1.69416 10.6543 1.60119 11 1.60119C11.3457 1.60119 11.6853 1.69416 11.9845 1.87071L19.4488 6.27374C19.7136 6.42985 19.9336 6.6436 20.0978 6.89417L11 11.8856L1.90221 6.89497C2.06721 6.6444 2.28721 6.43065 2.55121 6.27454L10.0155 1.87071ZM1.57143 8.5313L10.6276 13.5003C10.742 13.5631 10.87 13.596 11 13.596C11.13 13.596 11.258 13.5631 11.3724 13.5003L20.4286 8.5313V16.3975C20.4286 16.9283 20.2216 17.4374 19.8532 17.8127C19.4849 18.188 18.9852 18.3989 18.4643 18.3989H3.53571C3.01475 18.3989 2.51513 18.188 2.14675 17.8127C1.77838 17.4374 1.57143 16.9283 1.57143 16.3975V8.5313Z" fill="black" />
                                                </svg>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DashboardNotification