import CustomContainer from "../../../components/shared/CustomContainer";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePostAuthApiMutation } from "../../../redux/authontication/authApi";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation()
  const from = location.state?.from || "/";





  const [postAuthApi] = usePostAuthApiMutation()



  const onFinish = async (values) => {
    const authInfo = {
      email: values?.email,
      password: values?.password
    }

    try {
      const res = await postAuthApi(authInfo).unwrap()
      const token = res.data?.access_token;
      const role = res?.data?.user?.role
      console.log(res);

      if (res.status === true) {
        toast.success(res?.message)
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        navigate(from, { replace: true, state: location?.state?.data },);
      } else {
        toast.error(res?.message)
      }
      if (res.need_verificaiton) {
        toast.error(res?.message)
        navigate('/otp-code?verify=create_account')
      }


    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Login";
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Login</title>
      </Helmet>

      
      <section className="pt-20 lg:pt-[120px] pb-[52px] bg-[#f6f6f6]">
        {/* <CustomContainer> */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
          {/* left side  */}
          <div className="w-full lg:w-[50%] ">
            {/* <img src="/createAccountImage/photo6.png" alt="car" className="object-cover w-full" /> */}
            <motion.img
              src="/createAccountImage/photo6.png" alt="car" className="w-full"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* <div className="w-full lg:hidden">
            <img src="/createAccountImage/photo3.png" alt="car" className="object-cover" />
          </div> */}

          {/* right side image */}
          <div className="w-full p-4 lg:w-[50%] lg:mr-[200px]">
            <h1 className="text-[48px] font-medium font-degular text-[#000000] pb-4">Login</h1>
            <div>
              <Form form={form} onFinish={onFinish}>
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

                {/* password */}
                <div>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter your password"
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

                <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-6">
                  <div className=" pb-2 pr-1">
                    <Checkbox className="font-degular text-[20px]">
                      Remember me
                    </Checkbox>
                  </div>
                  <Link to='/forgot-password'>
                    <p className="font-degular text-[20px] cursor-pointer">
                      Forgot password ?
                    </p>
                  </Link>
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
                  Login
                </Button>

                {/* <div className="md:pt-[20px]">
                <Divider style={{ borderColor: '#ccc' }}>or</Divider>
              </div>

              <div className="flex flex-col gap-3 md:mt-8">
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
        </div>
        {/* </CustomContainer> */}
      </section>
    </>
  );
};

export default Login;
