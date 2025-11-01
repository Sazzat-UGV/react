import { Button, Flex, Form, Input } from "antd"
import CustomContainer from "../../../components/shared/CustomContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForgetPasswordApiMutation, useOtpSendApiMutation } from "../../../redux/authontication/authApi";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const OtpCode = () => {
    const navigate = useNavigate()
    const [forgetPasswordForm] = Form.useForm();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryEmail = queryParams.get('email');
    const verifyText = queryParams.get('verify');


    const [otpSendApi] = useOtpSendApiMutation()
    const [forgetPasswordApi] = useForgetPasswordApiMutation()



    const forgetPasswordFinish = async (values) => {

        const formData = new FormData();
        formData.append("otp", values?.otp);

        try {
            const res = await otpSendApi(formData).unwrap();
            const token = res?.data?.access_token
            const role = res?.data?.user?.role
            const email = res?.data?.user?.email

            if (res?.status === true) {
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                toast.success(res?.message);
                if (verifyText === 'create_account') {
                    navigate(`/`)
                } else {
                    navigate(`/create-new-password?email=${email}`)
                }
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleResentOtp = async () => {
        const formData = new FormData();
        formData.append("email", queryEmail);

        try {
            const res = await forgetPasswordApi(formData).unwrap();
            console.log(res)
            if (res?.status === true) {
                toast.success(res?.message);
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
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        document.title = "FULL CIRCLE Detailing~Otp Code";
    }, [location.pathname]);

    return (
        <>
            <Helmet>
                <title>FULL CIRCLE Detailing~Otp Code</title>
            </Helmet>
            <section className="pt-20 lg:pt-[120px] pb-[52px] bg-[#f6f6f6]">
                <CustomContainer>
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-3">
                        <div className="w-full p-4">
                            <div>
                                <div>
                                    <span onClick={() => navigate(-1)}>
                                        <svg
                                            className="w-[30px] md:w-[40px] lg:w-[60px] h-auto"
                                            viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="60" height="60" rx="30" fill="#0063E6" />
                                            <path d="M37.707 31.0001H26.121L30.621 35.5001L29.207 36.9141L22.293 30.0001L29.207 23.0861L30.621 24.5001L26.121 29.0001H37.707V31.0001Z" fill="white" />
                                        </svg>
                                    </span>
                                    <div className="pt-[20px] lg:pt-[105px]">
                                        <h2 className="text-[28px] md:text-[48px] font-degular font-medium">Enter Code</h2>
                                        <p className="text-[20px] font-degular pt-[6px] py-[19px] text-[#00000] text-wrap">Enter the code that we sent to your email.</p>
                                    </div>
                                </div>



                                <Form form={forgetPasswordForm} onFinish={forgetPasswordFinish}>
                                    {/* otp code */}
                                    <div>
                                        {/* <Flex gap="middle" align="flex-start" vertical className="pb-8">
                                        <Input.OTP />
                                    </Flex> */}
                                        <Form.Item name="otp" rules={[{ required: true, message: "Please enter the OTP code" }]}>
                                            <Input.OTP />
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
                                        Verify Code
                                    </Button>
                                </Form>


                                <p className="text-center mt-10 text-sm font-normal mb-6 text-[#5C5C5C]">
                                    I have not received the email.
                                    <Button onClick={() => handleResentOtp()} className="pl-1 text-primary " type="link">
                                        Resend
                                    </Button>
                                </p>
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

export default OtpCode