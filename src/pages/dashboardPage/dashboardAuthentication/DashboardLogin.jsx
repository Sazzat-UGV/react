import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthWrapper from "./AuthWrapper";
import { usePostAuthApiMutation } from "../../../redux/authontication/authApi";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";



const DashboardLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [postAuthApi] = usePostAuthApiMutation()



    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token && role === "ADMIN") {
            navigate("/admin/dashboard");
        }

        document.title = "FULL CIRCLE Detailing~Dashboard Login";
    }, [location.pathname]);



    const onFinish = async (values) => {
        const authInfo = {
            email: values?.email,
            password: values?.password
        }

        try {
            const res = await postAuthApi(authInfo).unwrap()
            const token = res.data?.access_token;
            const role = res?.data?.user?.role
            if (res.status === true) {
                toast.success(res?.message)
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                navigate('/admin/dashboard')
            } else if (res.status === false) {
                toast.error(res?.message)
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        document.title = "FULL CIRCLE Detailing~Dashboard Login";
    }, [location.pathname]);


    return (
        <>
            <Helmet>
                <title>FULL CIRCLE Detailing~Dashboard Login</title>
            </Helmet>
            <AuthWrapper>
                <div className="text-center mb-12 font-degular">
                    {/* <Title>Login</Title> */}
                    <div className="flex py-6 justify-center">
                        <h3 className="font-semibold text-2xl text-[#333333]">
                            Log in to your account
                        </h3>
                    </div>
                    <p className="text-[16px] font-normal mb-6 text-[#5C5C5C] ">
                        Please enter your email and password to continue
                    </p>
                </div>
                <Form layout="vertical" onFinish={onFinish}>
                    <div>
                        <p className="text-[24px] font-degular">Email</p>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Please enter your email" }]}
                        >
                            <Input
                                placeholder="example@gmail.com"
                                style={{ height: "50px", width: "481px", backgroundColor: "#fefefe" }}
                                className="bg-[#fefefe]"
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <p className="text-[24px] font-degular">Password</p>
                        <Form.Item
                            name="password"
                        // rules={[{ required: true, message: "Please enter your password" }]}
                        >
                            <Input.Password
                                iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
                                placeholder="**********"
                                style={{ height: "50px", width: "481px", cursor: "pointer", }}
                            />
                        </Form.Item>
                    </div>


                    <Form.Item>
                        <div className="flex justify-between items-center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-[#818181]">Remember me</Checkbox>
                            </Form.Item>

                            <Link
                                className="login-form-forgot text-[#4B5320]"
                                to="/admin/dashboard/forgot-password"
                            >
                                Forgot password
                            </Link>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="flex justify-center">
                            <Button
                                className="bg-primary h-12 text-sm text-white font-bold  mt-6"
                                htmlType="submit"
                            >
                                Sign in
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </AuthWrapper>
        </>
    )
}

export default DashboardLogin