import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomContainer from "../CustomContainer";
import { TfiClose } from "react-icons/tfi";
import { VscMenu } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useGetProfileApiQuery } from "../../../redux/authontication/authApi";
import CustomLoading from "../CustomLoading";

const Navbar = () => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // =============== conditionali loaction set=========
  const location = useLocation()
  const hideNavbarButton = ["/forgot-password", "/otp-code", "/create-new-password", "/password-successfull",];
  const shouldHideNavbarButton = hideNavbarButton.includes(location.pathname);

  const isCreateAccountRoute = location.pathname === "/create-account";




  const token = localStorage.getItem('token')
  const { data: userProfileData, isLoading, } = useGetProfileApiQuery({}, {
    refetchOnFocus: true,
    skip: !token
  })






  // Background color change on scroll
  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 32) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const handleCreateAccount = () => {
     setMenuOpen(false);
    navigate("/create-account");
  };

  const handleNavigate = () => {
     setMenuOpen(false);
    navigate("/");
  };

  const handleServiceBookPage = () => {
     setMenuOpen(false);
    navigate("/service-book");
  };

  const handleLogin = () => {
      setMenuOpen(false);
    navigate("/login");
  };

  const handleNotification = () => {
      setMenuOpen(false);
    navigate("/notification");
  };
  const handlNavigateUserProfile = () => {
      setMenuOpen(false);
    navigate("/user-profile");
  };

  if (isLoading) {
    return <CustomLoading />
  }

  return (
    <nav>
      <div className="font-degular bg-[#f6f6f6] ">
        <div
          className={`hidden lg:flex py-3  ${navbar ? "fixed top-0 left-0 right-0 z-[999] bg-[#f6f6f6] shadow-md" : "fixed bg-transparent w-full "
            }`}
        >
          <CustomContainer>
            {/* large devie */}
            <div className={`lg:flex items-center transition-all duration-500 ease-in-out  px-4 ${!shouldHideNavbarButton ? "justify-between" : "justify-start gap-10 "}`}>
              <div onClick={handleNavigate} className="cursor-pointer ">
                <img src="/logo1.png" alt="" className="w-[150px] h-[80px] xl:w-[200px] xl:h-[100px] object-contain" />
              </div>
              <div
                className={`flex transition-colors duration-500 ease-in-out ${shouldHideNavbarButton ? "justify-start items-center " : "justify-end items-center"} rounded-full space-x-10  font-medium xl:text-[20px] pl-6 mx-4 ${navbar ? "bg-[#ffff] " : "bg-[#ffffff] "
                  }`}
              >
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? "active text-primary font-bold"
                        : ""
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/services"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? "active text-primary font-bold"
                        : ""
                  }
                >
                  Services
                </NavLink>
                <NavLink
                  to="/pricing"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? "active text-primary font-bold"
                        : ""
                  }
                >
                  Pricing
                </NavLink>
                <NavLink
                  to="/photo-gallery"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? "active text-primary font-bold "
                        : " "
                  }
                >
                  Photo Gallery
                </NavLink>

                <div className="p-2">
                  <button onClick={() => handleServiceBookPage()} className="cursor-pointer text-[#ffffff] xl:text-[20px] font-semibold bg-primary rounded-full h-[40px] xl:h-[50px] w-[100px] xl:w-[160px]">
                    Book Now
                  </button>
                </div>
              </div>

              {
                !shouldHideNavbarButton && <div className="flex justify-center items-center gap-8 xl:gap-8 ">
                  {
                    userProfileData?.data?.role === 'USER' && <span onClick={handleNotification} className="bg-primary rounded-full p-3 xl:p-4 cursor-pointer">
                      <svg
                        className="w-[16px] h-[16px] xl:w-[24px] xl:h-[24px]"
                        width="22"
                        height="22"
                        viewBox="0 0 18 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.645 19.4437C5.86103 20.1824 6.30417 20.8302 6.90858 21.2907C7.513 21.7513 8.24645 22 9 22C9.75355 22 10.487 21.7513 11.0914 21.2907C11.6958 20.8302 12.139 20.1824 12.355 19.4437H5.645ZM0 18.4203H18V15.3503L16 12.2802V7.16345C16 6.22273 15.8189 5.29123 15.4672 4.42212C15.1154 3.55301 14.5998 2.76331 13.9497 2.09813C13.2997 1.43294 12.5281 0.905282 11.6788 0.545285C10.8295 0.185288 9.91925 0 9 0C8.08075 0 7.17049 0.185288 6.32122 0.545285C5.47194 0.905282 4.70026 1.43294 4.05025 2.09813C3.40024 2.76331 2.88463 3.55301 2.53284 4.42212C2.18106 5.29123 2 6.22273 2 7.16345V12.2802L0 15.3503V18.4203Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  }
                  <button
                    className={`${isCreateAccountRoute
                      ? ""
                      : "flex items-center rounded-full gap-2 xl:p-4 "
                      }`}
                  >
                    {isCreateAccountRoute ? (
                      <p
                        onClick={() => {
                          handleLogin();
                          setMenuOpen(false);
                        }}
                        className="xl:text-[20px] font-semibold tracking-wider flex items-center gap-2 border h-[40px] xl:h-[50px]  px-8 rounded-full ">
                        Have an Account?
                        Log In
                      </p>

                    ) : (
                      <>
                        {
                          userProfileData?.data?.role === 'USER' ? <span
                            onClick={handlNavigateUserProfile}
                            className="flex justify-center items-center gap-1 bg-primary rounded-full xl:gap-1 h-[40px] xl:h-[50px] px-2 xl:px-4"
                          >
                            <img src={userProfileData?.data?.photo} alt="" className="w-[20px] h-[20px] rounded-full object-cover " />
                            <p className="flex items-center text-[#ffffff] xl:text-[20px] font-semibold tracking-wider">
                              {userProfileData?.data?.name}
                            </p>
                          </span>
                            :
                            <span
                              onClick={() => handleCreateAccount()}
                              className="flex justify-center items-center gap-2 px-2 xl:text-[20px] font-semibold tracking-wider  border h-[40px] xl:h-[50px] w-[250px] text-center  rounded-full bg-primary text-[#ffffff]"
                            >
                              <svg
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.5 0C9.56087 0 10.5783 0.421427 11.3284 1.17157C12.0786 1.92172 12.5 2.93913 12.5 4C12.5 5.06087 12.0786 6.07828 11.3284 6.82843C10.5783 7.57857 9.56087 8 8.5 8C7.43913 8 6.42172 7.57857 5.67157 6.82843C4.92143 6.07828 4.5 5.06087 4.5 4C4.5 2.93913 4.92143 1.92172 5.67157 1.17157C6.42172 0.421427 7.43913 0 8.5 0ZM8.5 10C12.92 10 16.5 11.79 16.5 14V16H0.5V14C0.5 11.79 4.08 10 8.5 10Z"
                                  fill="white"
                                />
                              </svg>
                              <p className="">
                                Create Account/Log In
                              </p>
                            </span>
                        }
                      </>
                    )}
                  </button>
                </div>
              }
            </div>
          </CustomContainer>
        </div>




        {/* =============== small and medium device start ==========*/}
        <div className="fixed w-full shadow-md z-40 lg:hidden">
          <div className="bg-[#f6f6f6] py-4 md:py-2  text-center w-full flex items-center justify-between pr-6 md:pr-3">
            <div onClick={handleNavigate} className="cursor-pointer">
              {/* small device image */}
              <img
                src="/logo1.png"
                alt=""
                className="w-[180px] h-[60px] object-contain md:hidden"
              />

              {/* medium device image */}
              <img
                src="/logo1.png"
                alt=""
                className="w-[200px] h-[80px] object-contain hidden md:block"
              />
            </div>
            <div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="border border-gray-700 rounded-lg px-3 py-[6px] transition-all ease-in-out duration-300"
              >
                {menuOpen ? (
                  <TfiClose className="text-2xl" />
                ) : (
                  <VscMenu className="text-2xl" />
                )}
              </button>
            </div>
          </div>






          {/* Sidebar (Mobile Menu) */}
          <div
            className={`fixed top-0 right-0 h-full  p-4 bg-[#f6f6f6] shadow-lg z-[200] transition-transform overflow-y-auto ${menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <TfiClose className="text-2xl" />
            </button>
            <div className="flex flex-col space-y-4 mt-8">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                      ? "active text-primary font-bold"
                      : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                onClick={() => setMenuOpen(false)}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                      ? "active text-primary font-bold"
                      : ""
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/pricing"
                onClick={() => setMenuOpen(false)}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                      ? "active text-primary font-bold"
                      : ""
                }
              >
                Pricing
              </NavLink>
              <NavLink
                to="/photo-gallery"
                onClick={() => setMenuOpen(false)}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                      ? "active text-primary font-bold"
                      : ""
                }
              >
                Photo Gallery
              </NavLink>

              <div className="flex flex-col space-y-4">
                <div className="w-full ">
                  <button onClick={() => handleServiceBookPage()} className="w-full cursor-pointer text-[#ffffff] text-[20px] font-semibold bg-primary rounded py-2 px-10">
                    Book Now
                  </button>
                </div>

                <div >
                  {
                    !shouldHideNavbarButton && <div className="flex flex-col space-y-4">
                      {
                        userProfileData?.data?.role === 'USER' && <span
                          onClick={() => {
                            handleNotification();
                            setMenuOpen(false);
                          }}
                          className="border border-primary rounded px-2 py-2 cursor-pointer flex items-center gap-1 text-[20px] font-semibold text-primary">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 18 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.645 19.4437C5.86103 20.1824 6.30417 20.8302 6.90858 21.2907C7.513 21.7513 8.24645 22 9 22C9.75355 22 10.487 21.7513 11.0914 21.2907C11.6958 20.8302 12.139 20.1824 12.355 19.4437H5.645ZM0 18.4203H18V15.3503L16 12.2802V7.16345C16 6.22273 15.8189 5.29123 15.4672 4.42212C15.1154 3.55301 14.5998 2.76331 13.9497 2.09813C13.2997 1.43294 12.5281 0.905282 11.6788 0.545285C10.8295 0.185288 9.91925 0 9 0C8.08075 0 7.17049 0.185288 6.32122 0.545285C5.47194 0.905282 4.70026 1.43294 4.05025 2.09813C3.40024 2.76331 2.88463 3.55301 2.53284 4.42212C2.18106 5.29123 2 6.22273 2 7.16345V12.2802L0 15.3503V18.4203Z"
                              fill="#0063E5"
                            />
                          </svg>
                          Notifications
                        </span>
                      }
                      <button
                        className={`${isCreateAccountRoute
                          ? ""
                          : "flex items-center rounded-full gap-2 "
                          }`}
                      >
                        {isCreateAccountRoute ? (

                          <p
                            onClick={() => {
                              handleLogin();
                              setMenuOpen(false);
                            }}
                            className="xl:text-[20px] font-semibold tracking-wider flex items-center gap-2 border py-2  px-[5px] xl:px-8 rounded">
                            Have an Account?
                            Log In
                          </p>

                        ) : (
                          <>
                            {
                              userProfileData?.data?.role === 'USER' ? <span
                                onClick={() => {
                                  handlNavigateUserProfile();
                                  setMenuOpen(false);
                                }}

                                className="flex items-center bg-primary rounded gap-2 py-2 px-3 w-full"
                              >
                                <img src={userProfileData?.data?.photo} alt="" className="w-[30px] h-[30px]  object-cover" />
                                <p className="text-[#ffffff] text-[16px] md:text-[20px] font-semibold tracking-wider">
                                  {userProfileData?.data?.name}
                                </p>
                              </span>
                                :
                                <span
                                  onClick={() => {
                                    handleCreateAccount();
                                    setMenuOpen(false);
                                  }}

                                  className="w-full flex items-center gap-[2px] md:gap-2 text-[16px] md:text-[20px] font-semibold tracking-wider  border py-3 md:py-4 px-2 md:px-8 rounded bg-primary text-[#ffffff]"
                                >
                                  <svg
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.5 0C9.56087 0 10.5783 0.421427 11.3284 1.17157C12.0786 1.92172 12.5 2.93913 12.5 4C12.5 5.06087 12.0786 6.07828 11.3284 6.82843C10.5783 7.57857 9.56087 8 8.5 8C7.43913 8 6.42172 7.57857 5.67157 6.82843C4.92143 6.07828 4.5 5.06087 4.5 4C4.5 2.93913 4.92143 1.92172 5.67157 1.17157C6.42172 0.421427 7.43913 0 8.5 0ZM8.5 10C12.92 10 16.5 11.79 16.5 14V16H0.5V14C0.5 11.79 4.08 10 8.5 10Z"
                                      fill="white"
                                    />
                                  </svg>
                                  <p className="">
                                    Create Account/Log In
                                  </p>
                                </span>
                            }
                          </>
                        )}
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* =============== small and medium device end ==========*/}
      </div>
    </nav>
  );
};

export default Navbar;
