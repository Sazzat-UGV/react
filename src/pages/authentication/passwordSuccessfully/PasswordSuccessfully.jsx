import { Button } from "antd"
import CustomContainer from "../../../components/shared/CustomContainer"
import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";


const PasswordSuccessfully = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Password Successfull";
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Password Successfull</title>
      </Helmet>
      <section className="pt-20 lg:pt-[140px] pb-[60px] bg-[#f6f6f6]">
        <CustomContainer>
          <div className="flex justify-center items-center">
            <div>
              <div className="w-full flex justify-center">
                <motion.img
                  src="/createAccountImage/successCar1.png"
                  alt="car"
                  initial={{ x: 400, y: 50, opacity: 0 }} // Start from right and bottom
                  animate={{ x: 0, y: 0, opacity: 1 }}     // Animate to center
                  transition={{ duration: 1 }}     // Smooth 1 second animation
                  className="w-[200px] md:w-[250px]" // Adjust image width if needed
                />
              </div>
              <h1 className="text-[28px] md:text-[36px] font-degular font-semibold text-[#04AC20] py-4">Password Changed Successfully</h1>
              <Link to='/login'>
                <Button
                  block
                  style={{
                    backgroundColor: "#0063E5",
                    color: "#ffffff",
                    fontSize: "20px",
                    fontWeight: "600",
                    height: "50px",
                    borderRadius: "20px",
                    paddingInline: "20px",
                  }}
                >
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  )
}

export default PasswordSuccessfully 