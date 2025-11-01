
import { Button, Form, Input, Tabs, Upload } from "antd";
import { useEffect, useState } from "react";
import { useGetAuthProfileApiQuery, useUpdateAuthProfileApiMutation, useUpdatePasswordApiMutation } from "../../../../redux/dashboardFeatures/setting/dashboardSettingApi";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ChangePassword = () => {
  const location = useLocation();
  const [formOne] = Form.useForm();
  const [formTwo] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [activeTab, setActiveTab] = useState("1"); // default Tab 1





  const { data: getAuthData, isLoading } = useGetAuthProfileApiQuery()
  const authData = getAuthData?.data

  const [updateAuthProfileApi] = useUpdateAuthProfileApiMutation()
  const [updatePasswordApi] = useUpdatePasswordApiMutation()


  // defaut user
  useEffect(() => {
    if (authData) {
      formOne.setFieldsValue({
        ...authData,
        name: authData?.name,
        email: authData?.email,
      });
      if (authData?.photo) {
        setPreviewImage(authData.photo);
      }
    }
  }, [authData, formOne]);



  const handleUpload = ({ file, onSuccess }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result); // For preview
      setSelectedImageFile(file);     // For form submission
      onSuccess("ok"); // Ant Design expects this callback
    };
    reader.readAsDataURL(file);
  };












  // Form submission handlers
  const onFinishOne = async (values) => {

    const formData = new FormData();
    formData.append("name", values?.name);
    if (selectedImageFile) {
      formData.append("photo", selectedImageFile);
    }


    formData.forEach((value, key) => {
      console.log(key, value);
    });



    try {
      const res = await updateAuthProfileApi(formData).unwrap()
      console.log(res)

      if (res?.status === true) {
        toast.success(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const onFinishTwo = async (values) => {

    const formData = new FormData();
    formData.append("current_password", values?.current_password);
    formData.append("new_password", values?.new_password);
    formData.append("c_password", values?.c_password);


    formData.forEach((value, key) => {
      console.log(key, value);
    });


    try {
      const res = await updatePasswordApi(formData).unwrap()
      console.log(res)

      if (res?.status === true) {
        toast.success(res?.message)
        formTwo.resetFields()
      }
      else{
        toast.error(res?.message);
      }
    } catch (error) {
    console.log(error)
    }
  };



  const onChangeTab = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: "1",
      label: "Edit profile",
      children: (
        <Form
          form={formOne}
          onFinish={onFinishOne}
          layout="vertical"
          initialValues={{ name: '', email: '' }}
        >
          {/* Name input */}
          <Form.Item
            name="name"
            label={<span className="font-semibold font-degular text-lg">Name</span>}
            className="mb-7"
          >
            <Input
              placeholder="John Doe"
              className="p-4 border-none w-full bg-[#ffffff]"
            />
          </Form.Item>

          {/* Email input */}
          <Form.Item
            name="email"
            label={<span className="font-semibold font-degular text-lg">Email</span>}
          >
            <Input
              readOnly
              placeholder="example@gmail.com"
              className="p-4 border-none w-full bg-[#ffffff]"
            />
          </Form.Item>

          {/* Save button */}
          <Form.Item>
            <div className="text-center mt-5 ">
              <button className="text-white bg-primary  font-semibold font-degular text-xl py-2 px-10 rounded-md ">
                Save
              </button>
            </div>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      children: (
        <Form
          form={formTwo}
          onFinish={onFinishTwo}
          layout="vertical"
        >
          {/* Current Password */}
          <div>
            <p className="font-semibold font-degular text-lg">Current password</p>
            <Form.Item
              name="current_password"
              className="mb-7"
            >
              <Input.Password
                placeholder="**********"
                className="p-4 border-none w-[1112px] bg-[#ffffff]"
                iconRender={(visible) => (
                  visible ? (
                    <FaEye className="cursor-pointer " />
                  ) : (
                    <IoMdEyeOff className="cursor-pointer" />
                  )
                )}
              />
            </Form.Item>
          </div>

          {/* New Password */}
          <div>
            <p className="font-semibold font-degular text-lg">New password</p>
            <Form.Item
              name="new_password"
              rules={[{ required: true, message: "Please Input New Password" }]}
              colon={false}
            >
              <Input.Password
                placeholder="**********"
                className="p-4 border-none w-[1112px] bg-[#ffffff]"
                iconRender={(visible) => (
                  visible ? (
                    <FaEye className="cursor-pointer " />
                  ) : (
                    <IoMdEyeOff className="cursor-pointer" />
                  )
                )}
              />
            </Form.Item>
          </div>

          { /* Confirm Password */}
          <div>
            <p className="font-semibold font-degular text-lg">Confirm new password</p>
            <Form.Item
              name="c_password"
              label=""
              dependencies={["new_password"]}
              rules={[
                { required: true, message: "Please input Confirm new password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
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
                placeholder="**********"
                className="p-4 border-none w-[1112px] bg-[#ffffff]"
                iconRender={(visible) => (
                  visible ? (
                    <FaEye className="cursor-pointer " />
                  ) : (
                    <IoMdEyeOff className="cursor-pointer" />
                  )
                )}
              />
            </Form.Item>
          </div>

          {/* Save button */}
          <Form.Item>
            <div className="text-center mt-5 ">
              <button className="text-white bg-primary  font-semibold font-degular text-xl py-2 px-10 rounded-md ">
                Save
              </button>
            </div>
          </Form.Item>
        </Form>
      ),
    },
  ];


  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Dashboard Change Password";
  }, [location.pathname]);



  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Dashboard Change Password</title>
      </Helmet>
      <div>
        {/* Profile section */}
        <div className="bg-white mx-52 mt-5 rounded-lg flex flex-col justify-center items-center py-8">
          <div className="relative">
            {previewImage ? (
              <img src={previewImage} alt="" className="w-[100px] rounded-full h-[100px] object-cover" />
            ) : (
              <img src={previewImage} alt="" className="w-[100px] rounded-full h-[100px] object-cover" />
            )}
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              customRequest={handleUpload}
              disabled={activeTab !== "1"}
            >
              {
                activeTab === '1' && <button className="w-8 bg-white flex justify-center items-center p-2 shadow-lg rounded-full absolute right-0 bottom-5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.90918 1.40552C8.08669 1.40555 8.25728 1.47533 8.38281 1.60083C8.50833 1.72634 8.57904 1.89697 8.5791 2.07446C8.5791 2.25196 8.50827 2.42254 8.38281 2.5481C8.25727 2.67364 8.08672 2.74436 7.90918 2.74438H2.31348V13.9358H13.5049V8.34009C13.5049 8.16251 13.5756 7.99202 13.7012 7.86646C13.8267 7.74099 13.9973 7.67017 14.1748 7.67017C14.3521 7.67029 14.522 7.74112 14.6475 7.86646C14.773 7.99202 14.8438 8.16251 14.8438 8.34009V14.6057C14.8436 14.7831 14.7729 14.9529 14.6475 15.0784C14.522 15.2038 14.3522 15.2745 14.1748 15.2747H1.64355C1.46606 15.2746 1.29544 15.2039 1.16992 15.0784C1.0447 14.9529 0.974729 14.783 0.974609 14.6057V2.07446C0.974672 1.89697 1.04441 1.72634 1.16992 1.60083C1.29544 1.47532 1.46606 1.40558 1.64355 1.40552H7.90918Z" fill="#B7A481" stroke="#B7A481" stroke-width="0.2" />
                    <path d="M13.4707 0.974854C13.8745 0.974854 14.2635 1.11068 14.5791 1.35571V1.33228L14.75 1.50317C14.9179 1.67107 15.0507 1.87073 15.1416 2.09009C15.2325 2.30957 15.2793 2.54489 15.2793 2.78247C15.2793 3.02001 15.2325 3.25541 15.1416 3.47485C15.0507 3.6942 14.9179 3.8939 14.75 4.06177L8.84277 9.96704C8.74038 10.0698 8.60746 10.1378 8.46387 10.1584L6.58496 10.427C6.48211 10.4418 6.37692 10.4324 6.27832 10.3997C6.17962 10.3668 6.08919 10.3111 6.01562 10.2375C5.94224 10.1641 5.88733 10.0743 5.85449 9.97583C5.82165 9.87718 5.8124 9.77211 5.82715 9.66919L6.0957 7.78931C6.11604 7.64599 6.18197 7.51291 6.28418 7.4104L12.1924 1.50415C12.5315 1.16516 12.9912 0.974883 13.4707 0.974854ZM13.4736 2.30591C13.4113 2.30646 13.3493 2.3194 13.292 2.34399C13.2348 2.3686 13.1829 2.40469 13.1396 2.44946L13.1387 2.45044L7.3877 8.19849L7.27734 8.97388L8.05273 8.86255L13.8027 3.1145L13.8037 3.11353C13.8485 3.07022 13.8846 3.01845 13.9092 2.96118C13.9338 2.90389 13.9467 2.84189 13.9473 2.77954C13.9478 2.71731 13.9357 2.6555 13.9121 2.5979C13.8885 2.54027 13.8536 2.48764 13.8096 2.4436C13.7655 2.39962 13.7129 2.36463 13.6553 2.34106C13.5977 2.31755 13.5359 2.30537 13.4736 2.30591Z" fill="#B7A481" stroke="#B7A481" stroke-width="0.2" />
                  </svg>

                </button>
              }
            </Upload>
          </div>
          <h3 className="font-degular font-medium text-[30px]">{authData?.name}</h3>
          <p className="text-[#B1A8A8] font-degular font-medium text-xl">
            {authData?.email}
          </p>
        </div>

        {/* Tabs section */}
        <div className="mx-52">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChangeTab}
            className="custom-tabs px-2"
          />
        </div>
      </div>
    </>
  );
};

export default ChangePassword;