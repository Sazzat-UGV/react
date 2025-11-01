
import CustomContainer from "../../../components/shared/CustomContainer"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForgetPasswordApiMutation } from "../../../redux/authontication/authApi";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";



const ForgetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [forgetPasswordForm] = Form.useForm();
    const [isFocused, setIsFocused] = useState(false);


    const [forgetPasswordApi] = useForgetPasswordApiMutation()



    const forgetPasswordFinish = async (values) => {
        const formData = new FormData();
        formData.append("email", values?.email);


        // formData.forEach((value, key) => {
        //     console.log('key------>', key, 'value------>', value);
        // });



        try {
            const res = await forgetPasswordApi(formData).unwrap()
            console.log(res)
            if (res.status === true) {
                toast.success(res?.message)
                navigate(`/otp-code?email=${values?.email}`);
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
        document.title = "FULL CIRCLE Detailing~Forgot Password";
    }, [location.pathname]);

    return (
        <>
            <Helmet>
                <title>FULL CIRCLE Detailing~Forgot Password</title>
            </Helmet>
            <section className="pt-20 lg:pt-[120px] pb-[52px] bg-[#f6f6f6]">
                <CustomContainer>
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-3">
                        <div className="w-full p-4">
                            <div>
                                <div>
                                    <Link to='/login'>
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
                                        <h2 className="text-[28px] md:text-[48px] font-degular font-medium">Forgot your Password?</h2>
                                        <p className="text-[20px] font-degular md:w-[748px] pt-[6px] py-[19px] text-[#00000] text-wrap">Enter the email address that you used to create your account .</p>
                                    </div>
                                </div>



                                <Form form={forgetPasswordForm} onFinish={forgetPasswordFinish}>
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
                                        Send Code
                                    </Button>
                                </Form>
                            </div>
                        </div>

                        {/* right side image */}
                        <div className="w-full md:flex justify-center items-center">
                            <img src="/createAccountImage/car1.png" alt="car" />
                        </div>
                    </div>
                </CustomContainer>
            </section>
        </>
    )
}

export default ForgetPassword