import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineArrowOutward } from "react-icons/md";
import { BsFacebook } from "react-icons/bs";
import CustomContainer from "../../../components/shared/CustomContainer";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useRegisterApiMutation } from "../../../redux/authontication/authApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const CreateAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [createAccountForm] = Form.useForm();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonTextChange, setButtonTextChange] = useState(false);



  const [registerApi] = useRegisterApiMutation(); // register 





  const handleButtonChange = () => {
    setButtonTextChange(!buttonTextChange);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const createAccountFinish = async (values) => {


    const formData = new FormData();

    formData.append("name", values?.name);
    formData.append("email", values?.email);
    formData.append("phone", values?.phone);
    formData.append("car_brand", values?.car_brand);
    formData.append("car_model", values?.car_model);
    formData.append("password", values?.password);
    formData.append("c_password", values?.c_password);



    try {
      const res = await registerApi(formData).unwrap();
      console.log(res)

      if (res?.status === true) {
        toast.success(res?.message);
        navigate('/otp-code?verify=create_account')

      } else {
        toast.error(res?.messages);
      }
    } catch (error) {
     console.log(error)
    }




    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });


  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Create Account";
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Create Account</title>
      </Helmet>

      
      <section className=" pt-20 lg:pt-[120px] pb-[52px] bg-[#f6f6f6]">
        {/* <CustomContainer> */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-20">
          <div className="w-full lg-w-[20%] p-4 lg:ml-[200px] order-2 lg:order-1">
            <div>
              <Form form={createAccountForm} onFinish={createAccountFinish}>
                {/* email */}
                <div>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Email is required" },
                      { type: "email", message: "Enter a valid email" },
                    ]}
                  >
                    <Input
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

                {/* full name */}
                <div>
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Full name is required" },
                    ]}
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

                {/* phone  */}
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

                {/*========= skip and fill button component========= */}
                <div className="">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
                    <div className="flex  items-center gap-2">
                      <svg
                        width="26"
                        height="21"
                        viewBox="0 0 26 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.1333 8.32609H23.9633L20.9538 1.53261C20.8176 1.22525 20.5955 0.964108 20.3144 0.780831C20.0333 0.597554 19.7052 0.500004 19.37 0.5H6.63C6.29475 0.500004 5.9667 0.597554 5.68558 0.780831C5.40447 0.964108 5.18236 1.22525 5.04617 1.53261L2.03667 8.32609H0.866667C0.636812 8.32609 0.416372 8.4177 0.253841 8.58078C0.0913092 8.74385 0 8.96503 0 9.19565C0 9.42628 0.0913092 9.64745 0.253841 9.81053C0.416372 9.9736 0.636812 10.0652 0.866667 10.0652H1.73333V18.7609C1.73333 19.2221 1.91595 19.6645 2.24101 19.9906C2.56608 20.3168 3.00696 20.5 3.46667 20.5H6.06667C6.52638 20.5 6.96726 20.3168 7.29232 19.9906C7.61738 19.6645 7.8 19.2221 7.8 18.7609V17.8913H18.2V18.7609C18.2 19.2221 18.3826 19.6645 18.7077 19.9906C19.0327 20.3168 19.4736 20.5 19.9333 20.5H22.5333C22.993 20.5 23.4339 20.3168 23.759 19.9906C24.084 19.6645 24.2667 19.2221 24.2667 18.7609V10.0652H25.1333C25.3632 10.0652 25.5836 9.9736 25.7462 9.81053C25.9087 9.64745 26 9.42628 26 9.19565C26 8.96503 25.9087 8.74385 25.7462 8.58078C25.5836 8.4177 25.3632 8.32609 25.1333 8.32609ZM7.8 13.5435H5.2C4.97015 13.5435 4.74971 13.4519 4.58717 13.2888C4.42464 13.1257 4.33333 12.9045 4.33333 12.6739C4.33333 12.4433 4.42464 12.2221 4.58717 12.059C4.74971 11.896 4.97015 11.8043 5.2 11.8043H7.8C8.02985 11.8043 8.25029 11.896 8.41283 12.059C8.57536 12.2221 8.66667 12.4433 8.66667 12.6739C8.66667 12.9045 8.57536 13.1257 8.41283 13.2888C8.25029 13.4519 8.02985 13.5435 7.8 13.5435ZM20.8 13.5435H18.2C17.9701 13.5435 17.7497 13.4519 17.5872 13.2888C17.4246 13.1257 17.3333 12.9045 17.3333 12.6739C17.3333 12.4433 17.4246 12.2221 17.5872 12.059C17.7497 11.896 17.9701 11.8043 18.2 11.8043H20.8C21.0299 11.8043 21.2503 11.896 21.4128 12.059C21.5754 12.2221 21.6667 12.4433 21.6667 12.6739C21.6667 12.9045 21.5754 13.1257 21.4128 13.2888C21.2503 13.4519 21.0299 13.5435 20.8 13.5435ZM3.93358 8.32609L6.63 2.23913H19.37L22.0664 8.32609H3.93358Z"
                          fill="#888888"
                        />
                      </svg>

                      <span className="text-[20px] font-degular">
                        Enter your car details
                      </span>
                    </div>

                    {/* skip */}
                    <div
                      onClick={() => handleButtonChange()}
                      className="cursor-pointer"
                    >
                      {buttonTextChange ? (
                        <button
                          type="button"
                          className="border border-[#ccc] py-4 px-6 rounded-2xl text-[20px] font-degular"
                        >
                          Fill
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="border border-[#ccc] py-4 px-6 rounded-2xl text-[20px] font-degular"
                        >
                          Skip for now
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between items-center md:gap-4 pt-6">
                    {/* brand name */}
                    <div
                      disabled={buttonTextChange}
                      className="w-full md:w-[50%]"
                    >
                      <Form.Item name="car_brand">
                        <Input
                          placeholder="Car Make"
                          disabled={buttonTextChange}
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
                            cursor: buttonTextChange
                              ? "not-allowed"
                              : "pointer",
                            backgroundColor: buttonTextChange
                              ? "oklch(92.8% 0.006 264.531)"
                              : "",
                          }}
                        />
                      </Form.Item>
                    </div>

                    {/* Car Model*/}
                    <div className="w-full md:w-[50%]">
                      <Form.Item name="car_model">
                        <Input
                          placeholder="Car Model"
                          disabled={buttonTextChange}
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
                            cursor: buttonTextChange
                              ? "not-allowed"
                              : "pointer",
                            backgroundColor: buttonTextChange
                              ? "oklch(92.8% 0.006 264.531)"
                              : "",
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {/* password */}
                <div>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      prefix={
                        <svg
                          width="16"
                          height="22"
                          viewBox="0 0 16 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 21.5C1.45 21.5 0.979333 21.3043 0.588 20.913C0.196666 20.5217 0.000666667 20.0507 0 19.5V9.5C0 8.95 0.196 8.47933 0.588 8.088C0.98 7.69667 1.45067 7.50067 2 7.5H3V5.5C3 4.11667 3.48767 2.93767 4.463 1.963C5.43833 0.988334 6.61733 0.500667 8 0.500001C9.38267 0.499334 10.562 0.987001 11.538 1.963C12.514 2.939 13.0013 4.118 13 5.5V7.5H14C14.55 7.5 15.021 7.696 15.413 8.088C15.805 8.48 16.0007 8.95067 16 9.5V19.5C16 20.05 15.8043 20.521 15.413 20.913C15.0217 21.305 14.5507 21.5007 14 21.5H2ZM8 16.5C8.55 16.5 9.021 16.3043 9.413 15.913C9.805 15.5217 10.0007 15.0507 10 14.5C9.99933 13.9493 9.80367 13.4787 9.413 13.088C9.02233 12.6973 8.55133 12.5013 8 12.5C7.44867 12.4987 6.978 12.6947 6.588 13.088C6.198 13.4813 6.002 13.952 6 14.5C5.998 15.048 6.194 15.519 6.588 15.913C6.982 16.307 7.45267 16.5027 8 16.5ZM5 7.5H11V5.5C11 4.66667 10.7083 3.95833 10.125 3.375C9.54167 2.79167 8.83333 2.5 8 2.5C7.16667 2.5 6.45833 2.79167 5.875 3.375C5.29167 3.95833 5 4.66667 5 5.5V7.5Z"
                            fill="#888888"
                          />
                        </svg>
                      }
                      iconRender={(visible) => (
                        visible ? (
                          <FaEye className="cursor-pointer " />
                        ) : (
                          <IoMdEyeOff className="cursor-pointer" />
                        )
                      )}
                      style={{
                        height: "60px",
                        borderRadius: "20px",
                        paddingInline: "20px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </Form.Item>
                </div>

                {/* confirm password */}
                <div>
                  <Form.Item
                    name="c_password"
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: "Confirm Password is required",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Passwords do not match!");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm Password"
                      prefix={
                        <svg
                          width="16"
                          height="22"
                          viewBox="0 0 16 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 21.5C1.45 21.5 0.979333 21.3043 0.588 20.913C0.196666 20.5217 0.000666667 20.0507 0 19.5V9.5C0 8.95 0.196 8.47933 0.588 8.088C0.98 7.69667 1.45067 7.50067 2 7.5H3V5.5C3 4.11667 3.48767 2.93767 4.463 1.963C5.43833 0.988334 6.61733 0.500667 8 0.500001C9.38267 0.499334 10.562 0.987001 11.538 1.963C12.514 2.939 13.0013 4.118 13 5.5V7.5H14C14.55 7.5 15.021 7.696 15.413 8.088C15.805 8.48 16.0007 8.95067 16 9.5V19.5C16 20.05 15.8043 20.521 15.413 20.913C15.0217 21.305 14.5507 21.5007 14 21.5H2ZM8 16.5C8.55 16.5 9.021 16.3043 9.413 15.913C9.805 15.5217 10.0007 15.0507 10 14.5C9.99933 13.9493 9.80367 13.4787 9.413 13.088C9.02233 12.6973 8.55133 12.5013 8 12.5C7.44867 12.4987 6.978 12.6947 6.588 13.088C6.198 13.4813 6.002 13.952 6 14.5C5.998 15.048 6.194 15.519 6.588 15.913C6.982 16.307 7.45267 16.5027 8 16.5ZM5 7.5H11V5.5C11 4.66667 10.7083 3.95833 10.125 3.375C9.54167 2.79167 8.83333 2.5 8 2.5C7.16667 2.5 6.45833 2.79167 5.875 3.375C5.29167 3.95833 5 4.66667 5 5.5V7.5Z"
                            fill="#888888"
                          />
                        </svg>
                      }
                      iconRender={(visible) => (
                        visible ? (
                          <FaEye className="cursor-pointer " />
                        ) : (
                          <IoMdEyeOff className="cursor-pointer" />
                        )
                      )}
                      style={{
                        height: "60px",
                        borderRadius: "20px",
                        paddingInline: "20px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </Form.Item>
                </div>







                {/* submit button component */}
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
                  }}
                >
                  Create Account
                </Button>

                {/* <div className="flex flex-col gap-3 mt-6">
                <button
                  type="button"
                  className="flex items-center justify-between h-[60px] rounded-[20px] px-[20px] border border-[#ccc] cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-[16px] md:text-[24px] font-degular ">
                    <FcGoogle className="" /> Continue with Google
                  </span>{" "}
                  <MdOutlineArrowOutward className="text-[24px]" />
                </button>
              </div> */}
              </Form>
            </div>
          </div>










          {/* right side image */}
          <div className="w-full lg:w-[80%] order-1 lg:order-2 pt-16 md:pt-0">
            <motion.img
              src="/createAccountImage/photo1.png" alt="car" className="w-full"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
        {/* </CustomContainer> */}
      </section>
    </>
  );
};

export default CreateAccount;
