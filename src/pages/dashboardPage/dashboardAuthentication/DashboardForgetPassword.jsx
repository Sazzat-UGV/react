import AuthWrapper from "./AuthWrapper"
import { Button, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForgetPasswordApiMutation } from "../../../redux/authontication/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";


const DashboardForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [forgetPasswordApi] = useForgetPasswordApiMutation()

  const onFinish = async (values) => {
    const formData = new FormData();

    formData.append("email", values?.email);
    try {
      const res = await forgetPasswordApi(formData).unwrap()
      console.log(res)
      if (res.status === true) {
        toast.success(res?.message)
        navigate(`/admin/dashboard/otp-code?email=${values?.email}`);
      }
      else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Dashboard Forgot Password";
  }, [location.pathname]);


  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Dashboard Forgot Password</title>
      </Helmet>
      <AuthWrapper>
        <p className="font-popping font-semibold text-2xl text-[#333333 mb-6 font-degular]">
          Forgot password ?
        </p>
        <Form layout="vertical" onFinish={onFinish} className="font-degular">
          <Form.Item
            label="Email"
            name="email"
          // rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              placeholder="example@gmail.com"
              style={{ height: "50px", width: "481px" }}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-center">
              <Button
                className="bg-primary h-12 text-sm text-white font-bold  mt-6"
                htmlType="submit"
              >
                Send Code
              </Button>
            </div>
          </Form.Item>
        </Form>
      </AuthWrapper>
    </>
  )
}

export default DashboardForgetPassword