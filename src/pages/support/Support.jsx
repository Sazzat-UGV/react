import { useLocation, useNavigate } from "react-router-dom"
import CustomContainer from "../../components/shared/CustomContainer"
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { usePostSupportApiMutation } from "../../redux/web/support/supportApi";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Support = () => {
  const location = useLocation();
  const [formOne] = useForm()
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);


  const [postSupportApi] = usePostSupportApiMutation()



  const onFinishOne = async (values) => {
    const formData = new FormData();

    formData.append("email", values?.email);
    formData.append("full_name", values?.full_name);
    formData.append("subject", values?.subject);
    formData.append("message", values?.message);

    try {
      const res = await postSupportApi(formData).unwrap();

      if (res?.status === true) {
        toast.success(res?.message);
        formOne.resetFields()
      }else{
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleNavigate = () => {
    navigate('/service-book')
  }

  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Suppot";
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Suppot</title>
      </Helmet>
      <section className="pt-20 lg:pt-[120px] pb-[52px] bg-[#f6f6f6]">
        <CustomContainer>
          <div className="w-full flex flex-col md:flex-row justify-between  gap-3 md:gap-0 pt-10 lg:pt-0">
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
            <div className="">
              <button
                onClick={handleNavigate}
                className="text-[#ffffff] text-[20px] font-semibold bg-primary rounded-full py-[7px] md:py-2 lg:py-4 px-[57px] flex justify-center items-center gap-3 lg:w-[400px] ">
                Book Now
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.343277 10.7426L8.53582 2.55003L2.17186 2.55003L2.17185 0.550328H11.9497L11.9497 10.3282L9.95003 10.3282L9.95003 3.96424L1.75749 12.1568L0.343277 10.7426Z" fill="white" />
                </svg>

              </button>
            </div>
          </div>


          <div className="lg:w-[70%] mx-auto  p-4">
            <div >
              <div className="flex flex-col justify-center items-center pb-8">
                <h2 className="text-[24px] lg:text-[50px] font-medium font-degular">Support</h2>
                <p>Have inquiries about our services? Send us a message. We will contact you ASAP.</p>
              </div>
              <div className="">
                <Form form={formOne} onFinish={onFinishOne}>
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
                      name="full_name"
                      rules={[
                        { required: true, message: "Full name is required" },
                      ]}
                    >
                      <Input
                        placeholder="Your full name"
                        style={{
                          height: "60px",
                          borderRadius: "20px",
                          paddingInline: "20px",
                          border: isFocused ? "1px solid #ccc" : "1px solid #ccc",
                        }}
                      />
                    </Form.Item>
                  </div>

                  {/* subject */}
                  <div>
                    <Form.Item
                      name="subject"
                      rules={[
                        { required: true, message: "Subject is required" },
                      ]}
                    >
                      <Input
                        placeholder="Subject"

                        style={{
                          height: "60px",
                          borderRadius: "20px",
                          paddingInline: "20px",
                          border: isFocused ? "1px solid #ccc" : "1px solid #ccc",
                        }}
                      />
                    </Form.Item>
                  </div>

                  {/* description */}
                  <div>
                    <Form.Item
                      name="message"
                      rules={[
                        { required: true, message: "Message is required" },
                      ]}
                    >
                      <TextArea
                        placeholder="Your message"
                        rows={6}
                        style={{
                          borderRadius: "20px",
                          padding: "20px",
                          border: isFocused ? "1px solid #ccc" : "1px solid #ccc",
                          resize: "none",
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      htmlType="submit"
                      style={{
                        width: "200px",
                        backgroundColor: "#0063E5",
                        color: "#ffffff",
                        fontSize: "20px",
                        fontWeight: "600",
                        height: "60px",
                        borderRadius: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",

                      }}
                    >Send <ArrowRightOutlined /></Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  )
}

export default Support