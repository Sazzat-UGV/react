
import AuthWrapper from "./AuthWrapper"
import { Button, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPasswordApiMutation } from "../../../redux/authontication/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const DashboardCreateNewPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryEmail = queryParams.get('email');

    const [resetPasswordApi] = useResetPasswordApiMutation()



    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append("email", queryEmail);
        formData.append("password", values?.password);
        formData.append("c_password", values?.c_password);


        try {
            const res = await resetPasswordApi(formData).unwrap();
            console.log(res)

            if (res?.status === true) {
                toast.success(res?.message);
                navigate('/admin/dashboard/login')

            }
            else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error)
        }
    };



    useEffect(() => {
        document.title = "FULL CIRCLE Detailing~Dashboard Create New Password";
    }, [location.pathname]);


    return (
        <>
            <Helmet>
                <title>FULL CIRCLE Detailing~Dashboard Create New Password</title>
            </Helmet>
            <AuthWrapper>
                <div className="text-center mb-12 font-degular">
                    <div className="flex py-6 justify-center">
                        <h3 className="font-semibold text-2xl text-[#333333]">
                            Set a new password
                        </h3>
                    </div>
                    <p className="text-[16px] font-normal mb-6 text-[#5C5C5C]">
                        Create a new password. Ensure it differs from <br /> previous ones for security
                    </p>
                </div>

                <Form layout="vertical" onFinish={onFinish} className="font-degular">
                    {/* New Password Field */}
                    <div>
                        <p className="text-[24px] font-degular">New password</p>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please Input New Password" }]}
                            colon={false}
                        >
                            <Input.Password
                                placeholder="Write new password"
                                iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
                                style={{ height: "50px", width: "481px", cursor: "pointer", }}
                            />
                        </Form.Item>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <p className="text-[24px] font-degular">Confirm Password</p>
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
                                placeholder="Write confirm password"
                                iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
                                style={{ height: "50px", width: "481px", cursor: "pointer", }}
                            />
                        </Form.Item>
                    </div>

                    {/* Submit Button */}
                    <Form.Item>
                        <div className="flex justify-center">

                            <Button
                                className="bg-primary h-12 text-sm text-white font-bold mt-6 px-10"
                                htmlType="submit"
                            >
                                Update Password
                            </Button>

                        </div>
                    </Form.Item>
                </Form>
            </AuthWrapper>
        </>
    )
}

export default DashboardCreateNewPassword