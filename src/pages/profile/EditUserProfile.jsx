import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import CustomContainer from "../../components/shared/CustomContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAuthProfileApiQuery } from "../../redux/dashboardFeatures/setting/dashboardSettingApi";
import { useGetProfileApiQuery, useUpdateProfileApiMutation, useUpdateSinglePhotoApiMutation } from "../../redux/authontication/authApi";
import toast from "react-hot-toast";
import CustomLoading from "../../components/shared/CustomLoading";
import { PlusOutlined } from "@ant-design/icons";
import { useAddCarPhotoApiMutation, useUpdatePhotoApiMutation } from "../../redux/web/profile/profileApi";
import { Helmet } from "react-helmet-async";

const EditUserProfile = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const [ImageFileList, setImageFileList] = useState([]);
  const [formOne] = Form.useForm();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonTextChange, setButtonTextChange] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const [addCarPhotoApi] = useAddCarPhotoApiMutation()
  const { data: userProfileData, isLoading, refetch } = useGetAuthProfileApiQuery();
  const userProfile = userProfileData?.data
  const carPhoto = userProfile?.car_photos

  console.log(userProfile, 'userProfile')

  const [updatePhotoApi] = useUpdatePhotoApiMutation()
  const [updateProfileApi] = useUpdateProfileApiMutation()
  const [updateSinglePhotoApi] = useUpdateSinglePhotoApiMutation()



  const handleImageUpload = (index, isUpdate = false, photoId) => async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingIndex(index);


    const formData = new FormData();
    formData.append('photo', file);

    try {
      let res;
      if (isUpdate && photoId) {
        formData.append('_method', 'PUT');
        res = await updatePhotoApi({
          updateInfo: formData,
          id: photoId
        }).unwrap();
      } else {
        // If adding a new photo
        res = await addCarPhotoApi(formData).unwrap();
      }

      if (res?.status === true) {
        toast.success(res?.message);
        await refetch()
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setUploadingIndex(null);
    }
  };





  const [imageUrl, setImageUrl] = useState("");

useEffect(() => {
  if (userProfile) {
    // Keep only fields with valid values
    const validProfile = Object.fromEntries(
      Object.entries(userProfile).filter(([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "undefined" &&
        value !== "null"
      )
    );

    // Set only valid fields
    formOne.setFieldsValue(validProfile);
  }

  // Handle image separately
  if (userProfile?.photo) {
    setImageUrl(userProfile.photo);
  }
}, [userProfile]);




  // only image upload function
  const handleUpload = async ({ file }) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("photo", file);

    // formData.forEach((value, key) => {
    //   console.log('key------>', key, 'value------>', value);
    // });



    try {
      const res = await updateSinglePhotoApi(formData).unwrap()
      console.log(res)
      if (res?.status === true) {
        toast.success(res?.message)
        refetch()
      } else {
        toast.error(res?.message);
      }
    }
    catch (errors) {
      toast.error(errors.message);
    } finally {
      setLoading(false)
    }
  };


  const createAccountFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values?.name);
    formData.append("phone", values?.phone);
    formData.append("car_brand", values?.car_brand);
    formData.append("car_model", values?.car_model);

    try {
      const res = await updateProfileApi(formData).unwrap()

      if (res?.status === true) {
        toast.success(res?.message)
        refetch()
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
    document.title = "FULL CIRCLE Detailing~Edit User Profile";
  }, [location.pathname]);


  if (isLoading) {
    return <CustomLoading />
  }

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Edit User Profile</title>
      </Helmet>

      <section className="pt-20 lg:pt-[120px] bg-[#f6f6f6] pb-8">
        <CustomContainer>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 pt-10 lg:pt-0 pb-[24px]">
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

            <div className="flex justify-center w-full">
              <h2 className='text-[20px] md:text-[50px] font-medium font-degular'>Edit Your Profile</h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* left side */}
            <div className=" w-full lg:w-[60%]">

              <Form form={formOne} onFinish={createAccountFinish}>
                <div className="rounded-lg flex justify-center items-center w-full mx-auto">
                  <div className="relative cursor-pointer mb-16">
                    <Upload
                      accept="image/*"
                      maxCount={1}
                      showUploadList={false}
                      customRequest={handleUpload}
                    >
                      <img
                        src={imageUrl}
                        alt=""
                        className="h-[200px] w-[200px] object-cover rounded-full"
                      />
                      <span className="absolute bottom-0 right-0">
                        <svg width="53" height="45" viewBox="0 0 53 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g filter="url(#filter0_d_87_1388)">
                            <rect x="6.5" y="6" width="40" height="33" rx="3" fill="white" shape-rendering="crispEdges" />
                            <g filter="url(#filter1_d_87_1388)">
                              <path d="M33.5 13.5C34.2956 13.5 35.0587 13.8161 35.6213 14.3787C36.1839 14.9413 36.5 15.7044 36.5 16.5V28.5C36.5 29.2956 36.1839 30.0587 35.6213 30.6213C35.0587 31.1839 34.2956 31.5 33.5 31.5H19.5C18.7044 31.5 17.9413 31.1839 17.3787 30.6213C16.8161 30.0587 16.5 29.2956 16.5 28.5V16.5C16.5 15.7044 16.8161 14.9413 17.3787 14.3787C17.9413 13.8161 18.7044 13.5 19.5 13.5H33.5ZM26.5 17.5C25.1739 17.5 23.9021 18.0268 22.9645 18.9645C22.0268 19.9021 21.5 21.1739 21.5 22.5C21.5 23.8261 22.0268 25.0979 22.9645 26.0355C23.9021 26.9732 25.1739 27.5 26.5 27.5C27.8261 27.5 29.0979 26.9732 30.0355 26.0355C30.9732 25.0979 31.5 23.8261 31.5 22.5C31.5 21.1739 30.9732 19.9021 30.0355 18.9645C29.0979 18.0268 27.8261 17.5 26.5 17.5ZM26.5 19.5C27.2956 19.5 28.0587 19.8161 28.6213 20.3787C29.1839 20.9413 29.5 21.7044 29.5 22.5C29.5 23.2956 29.1839 24.0587 28.6213 24.6213C28.0587 25.1839 27.2956 25.5 26.5 25.5C25.7044 25.5 24.9413 25.1839 24.3787 24.6213C23.8161 24.0587 23.5 23.2956 23.5 22.5C23.5 21.7044 23.8161 20.9413 24.3787 20.3787C24.9413 19.8161 25.7044 19.5 26.5 19.5ZM33.5 16.5H32.5C32.2451 16.5003 32 16.5979 31.8146 16.7728C31.6293 16.9478 31.5178 17.187 31.5028 17.4414C31.4879 17.6958 31.5707 17.9464 31.7343 18.1418C31.8979 18.3373 32.1299 18.4629 32.383 18.493L32.5 18.5H33.5C33.7549 18.4997 34 18.4021 34.1854 18.2272C34.3707 18.0522 34.4822 17.813 34.4972 17.5586C34.5121 17.3042 34.4293 17.0536 34.2657 16.8582C34.1021 16.6627 33.8701 16.5371 33.617 16.507L33.5 16.5Z" fill="black" />
                            </g>
                          </g>
                          <defs>
                            <filter id="filter0_d_87_1388" x="0.5" y="0" width="52" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset />
                              <feGaussianBlur stdDeviation="3" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_87_1388" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_87_1388" result="shape" />
                            </filter>
                            <filter id="filter1_d_87_1388" x="12.5" y="13.5" width="28" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dy="4" />
                              <feGaussianBlur stdDeviation="2" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_87_1388" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_87_1388" result="shape" />
                            </filter>
                          </defs>
                        </svg>
                      </span>
                    </Upload>
                  </div>
                </div>

                {/* full name */}
                <div>
                  <Form.Item
                    name="name"
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
                {/* email */}
                <div>
                  <Form.Item
                    name="email"
                  >
                    <Input
                      readOnly
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

                {/* Phone number */}
                <div>
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
                </div>

                {/*========= skip and fill button component========= */}
                <div className="">


                  <div className="flex flex-col md:flex-row md:justify-between items-center md:gap-4 pt-6">
                    {/* brand name */}
                    <div
                      disabled={buttonTextChange}
                      className="w-full md:w-[50%]"
                    >
                      <p className="text-[16px] font-semibold font-degular">Car Make</p>
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
                            // cursor: buttonTextChange
                            //   ? "not-allowed"
                            //   : "pointer",
                            backgroundColor: buttonTextChange
                              ? "oklch(92.8% 0.006 264.531)"
                              : "",
                          }}
                        />
                      </Form.Item>
                    </div>

                    {/* Car Model*/}
                    <div className="w-full md:w-[50%]">
                      <p className="text-[16px] font-semibold font-degular">Car Model</p>
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
                            // cursor: buttonTextChange
                            //   ? "not-allowed"
                            //   : "pointer",
                            backgroundColor: buttonTextChange
                              ? "oklch(92.8% 0.006 264.531)"
                              : "",
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
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
                  Save changes
                </Button>
              </Form>
            </div>


            {/* right side */}
            <div className="w-full lg:w-[40%]">
              <p className="text-[28px] font-medium font-degular text-[#000000 py-2">Pictures</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[...Array(6)].map((_, index) => {
                  const photo = carPhoto?.[index];
                  return (
                    <div key={index} className="relative col-span-1 h-[146px] rounded-2xl border border-[#ccc] flex justify-center items-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload(index, !!photo, photo?.id)}
                        className="hidden"
                        id={`image-upload-${index}`}
                        disabled={uploadingIndex === index}
                      />

                      <label
                        htmlFor={`image-upload-${index}`}
                        className={`w-full h-full flex justify-center items-center cursor-pointer ${uploadingIndex === index ? 'opacity-50' : ''
                          }`}
                      >
                        {uploadingIndex === index ? (
                          <span className="text-lg">Uploading...</span>
                        ) : photo ? (
                          <>
                            <img
                              src={photo.photo}
                              alt={`Car ${index + 1}`}
                              className="w-full h-full object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <span className="text-white font-semibold">Update Photo</span>
                            </div>
                          </>
                        ) : (
                          <span className="text-7xl">+</span>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  )
}

export default EditUserProfile