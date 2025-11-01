
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomContainer from "../../components/shared/CustomContainer"
import { useEffect, useState } from "react";
import { useDeleteApiMutation, useGetServiceApiQuery, useLogOutAuthApiMutation } from "../../redux/authontication/authApi";
import toast from "react-hot-toast";
import { useGetAuthProfileApiQuery } from "../../redux/dashboardFeatures/setting/dashboardSettingApi";
import CustomLoading from "../../components/shared/CustomLoading";
import { Helmet } from "react-helmet-async";
import { Button, Form, Input, Modal } from "antd";


const UserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formOne] = Form.useForm();
    const [mondalOne, setModalOne] = useState(false);
    const [loading, setLoading] = useState(false)


    const [logOutAuthApi] = useLogOutAuthApiMutation(); // logout 
    const { data: userProfileData } = useGetAuthProfileApiQuery();
    const userProfile = userProfileData?.data
    const carPhoto = userProfile?.car_photos

    // console.log(userProfile, 'userProfile')

    const { data: profileService, isLoading } = useGetServiceApiQuery()
    const serviceData = profileService?.data?.data


    const [deleteApi] = useDeleteApiMutation()



    // =============  modal one start ===============
    const showModalOne = () => {
        setModalOne(true)
    }

    const onFinishOne = async (values) => {

        const formData = new FormData();
        formData.append("password", values?.password);

        try {
            const res = await deleteApi(formData).unwrap();
            console.log(res)

            if (res?.status === true) {
                toast.success(res?.message);
                localStorage.removeItem("token")
                localStorage.removeItem("role")
                navigate('/')
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalOneOk = () => {
        formOne.submit()
    }

    const handleCancelModalOne = () => {
        setModalOne(false)
    }
    // =============  modal one end ===============


    // logout function
    const handleLogout = async () => {
        try {
            const res = await logOutAuthApi().unwrap();
            console.log(res)
            if (res?.data === true) {
                toast.success(res?.message);
                localStorage.removeItem("token")
                localStorage.removeItem("role")
                navigate('/login')
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


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
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        document.title = "FULL CIRCLE Detailing~User Profile";
    }, [location.pathname]);


    if (isLoading) {
        return <CustomLoading />
    }


    return (
        <>
            <Helmet>
                <title>FULL CIRCLE Detailing~User Profile</title>
            </Helmet>
            <section className="pt-20 lg:pt-[120px] bg-[#f6f6f6]">
                <CustomContainer>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 pt-10 lg:pt-0 pb-[24px]">
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
                            <h2 className='text-[20px] md:text-[50px] font-medium font-degular'>Profile</h2>
                        </div>
                    </div>


                    {/* *************** */}
                    <div className="bg-[#ffffff] py-6 px-3 md:px-0 md:py-10 rounded-lg flex justify-center items-center w-full lg:w-[80%] mx-auto relative">
                        <div className="flex flex-col text-center gap-3 md:gap-0">

                            <img src={userProfile?.photo} alt="" className="w-[200px] h-[200px] rounded-full object-cover" />
                            <div>
                                <p className="text-[30px] font-medium font-degular text-[#000000]">{userProfile?.name}</p>
                                <p className="text-[20px] font-medium font-degular text-[#000000]">{userProfile?.email}</p>
                            </div>

                            {/* small device edit/logout buttont */}
                            <div className="w-full flex flex-col gap-3 pt-8 md:hidden">
                                <Link to="/edit-user-profile">
                                    <button className="flex items-center gap-2 border border-primary px-4 py-2 rounded-2xl text-[16px] font-semibold text-primary font-degular"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.71 4.04125C18.1 3.65125 18.1 3.00125 17.71 2.63125L15.37 0.291249C15 -0.0987512 14.35 -0.0987512 13.96 0.291249L12.12 2.12125L15.87 5.87125M0 14.2512V18.0012H3.75L14.81 6.93125L11.06 3.18125L0 14.2512Z" fill="#0063E6" />
                                    </svg>
                                        Edit Profile</button>
                                </Link>

                                <button onClick={() => handleLogout()} className="flex items-center gap-2 border border-red-500 px-4 py-2 rounded-2xl text-[16px] font-semibold text-red-500 font-degular">
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.56214 17.129C9.56214 16.898 9.65452 16.6765 9.81896 16.5132C9.98341 16.3498 10.2064 16.2581 10.439 16.2581H17.454C17.5315 16.2581 17.6058 16.2275 17.6607 16.173C17.7155 16.1186 17.7463 16.0447 17.7463 15.9677V2.03226C17.7463 1.95526 17.7155 1.88141 17.6607 1.82697C17.6058 1.77252 17.5315 1.74194 17.454 1.74194H10.439C10.2064 1.74194 9.98341 1.65017 9.81896 1.48684C9.65452 1.3235 9.56214 1.10196 9.56214 0.870968C9.56214 0.639973 9.65452 0.418439 9.81896 0.2551C9.98341 0.0917623 10.2064 0 10.439 0H17.454C18.5834 0 19.5 0.910452 19.5 2.03226V15.9677C19.5 16.5067 19.2844 17.0236 18.9007 17.4048C18.517 17.7859 17.9966 18 17.454 18H10.439C10.2064 18 9.98341 17.9082 9.81896 17.7449C9.65452 17.5816 9.56214 17.36 9.56214 17.129Z" fill="#E33629" />
                                        <path d="M14.662 10.2949C14.662 10.6028 14.5388 10.8982 14.3196 11.116C14.1003 11.3338 13.8029 11.4561 13.4928 11.4561H7.81539C7.78811 11.8688 7.7546 12.2814 7.71485 12.6941L7.67977 13.0483C7.66671 13.1818 7.62142 13.3102 7.54775 13.4226C7.47408 13.5349 7.3742 13.628 7.25658 13.6939C7.13897 13.7598 7.00709 13.7965 6.87214 13.801C6.73718 13.8054 6.60314 13.7775 6.48138 13.7195C4.34355 12.7031 2.40858 11.3107 0.770033 9.60969L0.734959 9.5737C0.584203 9.41794 0.5 9.21027 0.5 8.99421C0.5 8.77815 0.584203 8.57048 0.734959 8.41473L0.770033 8.37873C2.40858 6.67775 4.34355 5.28537 6.48138 4.26892C6.60314 4.21095 6.73718 4.183 6.87214 4.18746C7.00709 4.19191 7.13897 4.22864 7.25658 4.29451C7.3742 4.36039 7.47408 4.45348 7.54775 4.56587C7.62142 4.67827 7.66671 4.80666 7.67977 4.94015L7.71485 5.29434C7.7546 5.70621 7.78811 6.11886 7.81539 6.53228H13.4928C13.8029 6.53228 14.1003 6.65463 14.3196 6.87241C14.5388 7.09019 14.662 7.38557 14.662 7.69357V10.2949Z" fill="#E33629" />
                                    </svg>

                                    Logout</button>

                                <button onClick={showModalOne} className="flex items-center gap-2 border  px-4 py-2 rounded-2xl text-[16px] font-semibold font-degular bg-[#FF1F3D] text-[#fff]"><svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="white" />
                                </svg>
                                    Delete account</button>
                            </div>
                        </div>





                        {/* medium & large device for */}
                        <div className="absolute right-0 top-0 hidden md:block w-full">
                            <div className="flex justify-between m-3">

                                <button
                                    onClick={showModalOne}
                                    className="flex items-center gap-2 border  px-4 py-2 rounded-2xl text-[16px] font-semibold font-degular bg-[#FF1F3D] text-[#fff]"><svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="white" />
                                    </svg>
                                    Delete account</button>

                                <Link to="/edit-user-profile">
                                    <button className="flex items-center gap-2 border border-primary px-4 py-2 rounded-2xl text-[16px] font-semibold text-primary font-degular"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.71 4.04125C18.1 3.65125 18.1 3.00125 17.71 2.63125L15.37 0.291249C15 -0.0987512 14.35 -0.0987512 13.96 0.291249L12.12 2.12125L15.87 5.87125M0 14.2512V18.0012H3.75L14.81 6.93125L11.06 3.18125L0 14.2512Z" fill="#0063E6" />
                                    </svg>
                                        Edit Profile</button>
                                </Link>
                            </div>
                        </div>

                        {/* medium & large device for */}
                        <div className="absolute right-0 bottom-0 m-3 hidden md:block">
                            <button onClick={() => handleLogout()} className="flex items-center gap-2 border border-red-500 px-4 py-2 rounded-2xl text-[16px] font-semibold text-red-500 font-degular">
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.56214 17.129C9.56214 16.898 9.65452 16.6765 9.81896 16.5132C9.98341 16.3498 10.2064 16.2581 10.439 16.2581H17.454C17.5315 16.2581 17.6058 16.2275 17.6607 16.173C17.7155 16.1186 17.7463 16.0447 17.7463 15.9677V2.03226C17.7463 1.95526 17.7155 1.88141 17.6607 1.82697C17.6058 1.77252 17.5315 1.74194 17.454 1.74194H10.439C10.2064 1.74194 9.98341 1.65017 9.81896 1.48684C9.65452 1.3235 9.56214 1.10196 9.56214 0.870968C9.56214 0.639973 9.65452 0.418439 9.81896 0.2551C9.98341 0.0917623 10.2064 0 10.439 0H17.454C18.5834 0 19.5 0.910452 19.5 2.03226V15.9677C19.5 16.5067 19.2844 17.0236 18.9007 17.4048C18.517 17.7859 17.9966 18 17.454 18H10.439C10.2064 18 9.98341 17.9082 9.81896 17.7449C9.65452 17.5816 9.56214 17.36 9.56214 17.129Z" fill="#E33629" />
                                    <path d="M14.662 10.2949C14.662 10.6028 14.5388 10.8982 14.3196 11.116C14.1003 11.3338 13.8029 11.4561 13.4928 11.4561H7.81539C7.78811 11.8688 7.7546 12.2814 7.71485 12.6941L7.67977 13.0483C7.66671 13.1818 7.62142 13.3102 7.54775 13.4226C7.47408 13.5349 7.3742 13.628 7.25658 13.6939C7.13897 13.7598 7.00709 13.7965 6.87214 13.801C6.73718 13.8054 6.60314 13.7775 6.48138 13.7195C4.34355 12.7031 2.40858 11.3107 0.770033 9.60969L0.734959 9.5737C0.584203 9.41794 0.5 9.21027 0.5 8.99421C0.5 8.77815 0.584203 8.57048 0.734959 8.41473L0.770033 8.37873C2.40858 6.67775 4.34355 5.28537 6.48138 4.26892C6.60314 4.21095 6.73718 4.183 6.87214 4.18746C7.00709 4.19191 7.13897 4.22864 7.25658 4.29451C7.3742 4.36039 7.47408 4.45348 7.54775 4.56587C7.62142 4.67827 7.66671 4.80666 7.67977 4.94015L7.71485 5.29434C7.7546 5.70621 7.78811 6.11886 7.81539 6.53228H13.4928C13.8029 6.53228 14.1003 6.65463 14.3196 6.87241C14.5388 7.09019 14.662 7.38557 14.662 7.69357V10.2949Z" fill="#E33629" />
                                </svg>

                                Logout</button>
                        </div>
                    </div>

                    {/* car details & service history */}
                    <div className="flex flex-col lg:flex-row justify-between gap-20 py-8">

                        <div className="lg:w-[60%]">
                            <div className="flex items-center gap-3 pb-[35px]">
                                <span>
                                    <svg width="48" height="37" viewBox="0 0 48 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M46.4 14.4783H44.24L38.684 1.91033C38.4326 1.34171 38.0225 0.8586 37.5035 0.519537C36.9846 0.180475 36.3789 7.44866e-06 35.76 0H12.24C11.6211 7.44866e-06 11.0154 0.180475 10.4965 0.519537C9.97748 0.8586 9.56744 1.34171 9.316 1.91033L3.76 14.4783H1.6C1.17565 14.4783 0.768687 14.6477 0.468629 14.9494C0.168571 15.2511 0 15.6603 0 16.087C0 16.5136 0.168571 16.9228 0.468629 17.2245C0.768687 17.5262 1.17565 17.6957 1.6 17.6957H3.2V33.7826C3.2 34.6359 3.53714 35.4543 4.13726 36.0576C4.73737 36.661 5.55131 37 6.4 37H11.2C12.0487 37 12.8626 36.661 13.4627 36.0576C14.0629 35.4543 14.4 34.6359 14.4 33.7826V32.1739H33.6V33.7826C33.6 34.6359 33.9371 35.4543 34.5373 36.0576C35.1374 36.661 35.9513 37 36.8 37H41.6C42.4487 37 43.2626 36.661 43.8627 36.0576C44.4629 35.4543 44.8 34.6359 44.8 33.7826V17.6957H46.4C46.8243 17.6957 47.2313 17.5262 47.5314 17.2245C47.8314 16.9228 48 16.5136 48 16.087C48 15.6603 47.8314 15.2511 47.5314 14.9494C47.2313 14.6477 46.8243 14.4783 46.4 14.4783ZM14.4 24.1304H9.6C9.17565 24.1304 8.76869 23.9609 8.46863 23.6593C8.16857 23.3576 8 22.9484 8 22.5217C8 22.0951 8.16857 21.6859 8.46863 21.3842C8.76869 21.0825 9.17565 20.913 9.6 20.913H14.4C14.8243 20.913 15.2313 21.0825 15.5314 21.3842C15.8314 21.6859 16 22.0951 16 22.5217C16 22.9484 15.8314 23.3576 15.5314 23.6593C15.2313 23.9609 14.8243 24.1304 14.4 24.1304ZM38.4 24.1304H33.6C33.1757 24.1304 32.7687 23.9609 32.4686 23.6593C32.1686 23.3576 32 22.9484 32 22.5217C32 22.0951 32.1686 21.6859 32.4686 21.3842C32.7687 21.0825 33.1757 20.913 33.6 20.913H38.4C38.8243 20.913 39.2313 21.0825 39.5314 21.3842C39.8314 21.6859 40 22.0951 40 22.5217C40 22.9484 39.8314 23.3576 39.5314 23.6593C39.2313 23.9609 38.8243 24.1304 38.4 24.1304ZM7.262 14.4783L12.24 3.21739H35.76L40.738 14.4783H7.262Z" fill="#888888" />
                                    </svg>
                                </span>
                                <p className=" text-[28px] font-medium font-degular text-[#000000]">Car details</p>
                            </div>
                            <div className="bg-[#ffffff] border border-[#ccc]  rounded-lg p-4">
                                <div className="flex  gap-14">
                                    <div>
                                        <p className="text-[20px] font-degular text-[#000000]">Car Make</p>
                                        {
                                            userProfile?.car_brand === "undefined" ? '' : <h3 className="text-[36px] font-semibold font-degular text-[#000000]">{userProfile?.car_brand}</h3>
                                        }

                                    </div>
                                    <div>
                                        <p className="text-[20px] font-degular text-[#000000]">Car Model</p>
                                        {
                                            userProfile?.car_model === "undefined" ? '' : <h3 className="text-[36px] font-semibold font-degular text-[#000000]">{userProfile?.car_model}</h3>
                                        }
                                    </div>
                                </div>
                                <p className="text-[28px] font-medium font-degular text-[#000000 py-2">Pictures</p>
                                {/* photo gallary */}
                                {
                                    carPhoto?.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {
                                            carPhoto?.map((item, index) => {
                                                return (
                                                    <div key={index} className=" col-span-1 h-[146px] rounded-2xl">
                                                        <img src={item?.photo} alt="car" className="w-full h-full object-cover rounded-2xl" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                        :
                                        <div className="h-[270px] bg-gray-50 rounded-lg flex justify-center items-center">
                                            <p className="lg:text-6xl md:text-1xl text-base font-bold text-gray-200 uppercase text-center">No data found</p>
                                        </div>
                                }
                            </div>
                        </div>



                        {/* right side */}
                        <div className="lg:w-[40%]">
                            <div className="flex items-center gap-3 pb-[35px]">
                                <span>
                                    <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 0.5C8.05876 0.5 0 8.55876 0 18.5C0 28.4412 8.05876 36.5 18 36.5C27.9412 36.5 36 28.4412 36 18.5C36 8.55876 27.9412 0.5 18 0.5ZM28.3859 17.2219C27.5333 18.2024 26.4117 18.9112 25.1602 19.2604C23.9086 19.6095 22.5821 19.5837 21.3451 19.1861L12.4442 29.4234C11.9864 29.9395 11.3433 30.254 10.6549 30.2985C9.96638 30.3429 9.2882 30.1136 8.76789 29.6606C8.24757 29.2075 7.92722 28.5673 7.87652 27.8793C7.82582 27.1912 8.04889 26.511 8.49718 25.9866L17.4117 15.7394C16.867 14.6039 16.6572 13.3366 16.8072 12.086C16.9571 10.8355 17.4605 9.6537 18.2583 8.67912C19.0561 7.70455 20.1152 6.97764 21.3114 6.58363C22.5077 6.18963 23.7915 6.14486 25.0122 6.45459L21.6002 10.4326L22.7149 13.6774L26.0872 14.3338L29.5054 10.3459C29.9777 11.4826 30.1233 12.7286 29.926 13.9435C29.7286 15.1585 29.1961 16.2943 28.3883 17.2231L28.3859 17.2219Z" fill="#888888" />
                                    </svg>

                                </span>
                                <p className="text-[28px] font-medium font-degular text-[#000000]">Service history</p>
                            </div>
                            <div>


                                <div className={`space-y-4 ${serviceData?.length > 0 ? 'h-[430px] overflow-y-auto' : ''}`}>
                                    {
                                        serviceData?.length > 0 ? (
                                            serviceData?.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className=" bg-white border border-gray-300 rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center"
                                                    >
                                                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                            <span>
                                                                <svg
                                                                    width="43"
                                                                    height="43"
                                                                    viewBox="0 0 43 43"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <rect width="43" height="43" rx="6" fill="#E1EEFF" />
                                                                    <path
                                                                        d="M10 16.9474C10 14.7636 10 13.6728 10.6785 12.9943C11.3571 12.3158 12.4478 12.3158 14.6316 12.3158H28.5263C30.7101 12.3158 31.8008 12.3158 32.4794 12.9943C33.1579 13.6728 33.1579 14.7636 33.1579 16.9474C33.1579 17.4927 33.1579 17.766 32.9888 17.9362C32.8186 18.1053 32.5442 18.1053 32 18.1053H11.1579C10.6125 18.1053 10.3393 18.1053 10.1691 17.9362C10 17.766 10 17.4916 10 16.9474ZM10 27.3684C10 29.5522 10 30.643 10.6785 31.3215C11.3571 32 12.4478 32 14.6316 32H28.5263C30.7101 32 31.8008 32 32.4794 31.3215C33.1579 30.643 33.1579 29.5522 33.1579 27.3684V21.579C33.1579 21.0336 33.1579 20.7603 32.9888 20.5901C32.8186 20.4211 32.5442 20.4211 32 20.4211H11.1579C10.6125 20.4211 10.3393 20.4211 10.1691 20.5901C10 20.7603 10 21.0347 10 21.579V27.3684Z"
                                                                        fill="#0063E6"
                                                                    />
                                                                    <path
                                                                        d="M15.7891 10V13.4737M27.368 10V13.4737"
                                                                        stroke="#0063E6"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <div>
                                                                <p className="text-2xl font-medium text-black">{item?.booking_date}</p>
                                                                <p className="text-2xl font-medium text-gray-500">{item?.booking_time}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-2xl font-medium text-black">{item?.service_name}</p>
                                                            <p className="text-xl font-medium text-black">{item?.service_type}</p>
                                                            <p className="text-3xl font-semibold text-primary">${item?.price}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="h-[470px] bg-gray-100 rounded-lg flex justify-center items-center">
                                                <p className="lg:text-6xl md:text-1xl text-base font-bold text-gray-200 uppercase text-center">No data found</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomContainer>
            </section >



            {/* modal one */}
            <Modal
                centered
                title={
                    <div className="text-center bg-[#FF1F3D] text-[#ffffff] py-4 font-degular text-[18px]  font-semibold rounded-t-lg">
                        Delete account
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
                            <div className="flex justify-center">
                                <div>
                                    <div className="text-center">
                                        <span className="flex justify-center pt-[50px] pb-4">
                                            <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M37.4332 2.63334H28.2165L25.5831 0H12.4164L9.7831 2.63334H0.566406V7.90002H37.4332M3.19975 42.1334C3.19975 43.5302 3.75463 44.8698 4.74232 45.8575C5.73001 46.8452 7.06961 47.4001 8.46642 47.4001H29.5331C30.93 47.4001 32.2696 46.8452 33.2572 45.8575C34.2449 44.8698 34.7998 43.5302 34.7998 42.1334V10.5334H3.19975V42.1334Z" fill="#EF4444" />
                                            </svg>
                                        </span>

                                        <h3 className="text-[24px] font-bold font-degular  ">You are going to delete <br /> your account</h3>
                                        <p className="text-[16px] font-degular text-[#888888] pb-[53px]">For deleting please enter your password</p>
                                    </div>
                                </div>
                            </div>


                            {/* password */}
                            <div>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter your password",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Password"
                                        style={{
                                            background: "#E7E7E7",
                                            height: "60px",
                                            borderRadius: "20px",
                                            paddingInline: "20px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </Form.Item>
                            </div>




                            <Button
                                htmlType="submit"
                                block
                                loading={loading}
                                style={{
                                    backgroundColor: "#FF1F3D",
                                    color: "#ffffff",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                    height: "60px",
                                    borderRadius: "20px",
                                    border: "0px solid",
                                    paddingInline: "20px",
                                    marginTop: "20px"
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default UserProfile