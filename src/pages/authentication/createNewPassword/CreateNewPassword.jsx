import { Link, useLocation, useNavigate } from "react-router-dom"
import CustomContainer from "../../../components/shared/CustomContainer"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPasswordApiMutation } from "../../../redux/authontication/authApi";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const CreateNewPassword = () => {
  const [createNewPasswordForm] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryEmail = queryParams.get('email');



  const [resetPasswordApi] = useResetPasswordApiMutation()


  const createNewPasswordFinish = async (values) => {

    const formData = new FormData();
    formData.append("email", queryEmail);
    formData.append("password", values?.password);
    formData.append("c_password", values?.c_password);

    try {
      const res = await resetPasswordApi(formData).unwrap();

      if (res?.status === true) {
        toast.success(res?.message);
        navigate('/password-successfull')

      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error)
    }
  };



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Create New Password";
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Create New Password</title>
      </Helmet>
      <section className="pt-28 lg:pt-[120px] pb-[52px] bg-[#f6f6f6]">
        <CustomContainer>
          <div className="flex flex-col lg:flex-row justify-between items-end gap-3">
            <div className="w-full p-4">
              <div>
                <div>
                  <Link to='/otp-code'>
                    <span>
                      <svg
                        className="w-[30px] md:w-[40px] lg:w-[60px] h-auto"
                        viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="60" height="60" rx="30" fill="#0063E6" />
                        <path d="M37.707 31.0001H26.121L30.621 35.5001L29.207 36.9141L22.293 30.0001L29.207 23.0861L30.621 24.5001L26.121 29.0001H37.707V31.0001Z" fill="white" />
                      </svg>
                    </span>
                  </Link>

                  <div className="pt-[20px] lg:pt-[105px]">
                    <h2 className="text-[28px] md:text-[48px] font-degular font-medium">Change Password</h2>
                    <p className="text-[20px] font-degular md:w-[748px] pt-[6px] py-[19px] text-[#00000] text-wrap">at least 8 characters.</p>
                  </div>
                </div>



                <Form form={createNewPasswordForm} onFinish={createNewPasswordFinish}>
                  {/* password */}
                  <div>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter Your Password"
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
                        iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
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
                      label=""
                      dependencies={["password"]}
                      rules={[
                        { required: true, message: "Please input Confirm new password" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                      colon={false}
                    >
                      <Input.Password
                        placeholder="Enter Your Confirm Password"
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
                        iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
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
                    Change Password
                  </Button>
                </Form>
              </div>
            </div>

            {/* right side image */}
            <div className="w-full md:flex md:justify-center md:items-center">
              <img src="/createAccountImage/car1.png" alt="car" />
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  )
}

export default CreateNewPassword