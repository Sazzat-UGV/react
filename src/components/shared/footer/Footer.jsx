import CustomContainer from "../CustomContainer";

const Footer = () => {
  return (
    <footer className="relative h-auto xl:h-[406px] flex items-center bg-[#000000] text-[#ffffff] font-degular">
      <div className="absolute inset-0 bg-[#000000]/50 z-0"></div>
      <CustomContainer>
        <div className="grid gap-8 md:gap-0  md:gap-y-28 lg:gap-y-0 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-[54px] lg:pt-10">
          <div className="relative z-10  ">
            <img src="/logoWhite1.png" alt="" className="w-[300px] p-4 lg:p-0" />
            <p className="md:w-[340px] text-wrap pt-[11px]">
              Transforming challenges into shining successes.
            </p>
            <div className="flex items-center gap-6 pt-[23px] pb-[14px]">
              <span>
                <svg
                  width="25"
                  height="21"
                  viewBox="0 0 25 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.5 0.5H2.5C1.125 0.5 0.0125 1.625 0.0125 3L0 18C0 19.375 1.125 20.5 2.5 20.5H22.5C23.875 20.5 25 19.375 25 18V3C25 1.625 23.875 0.5 22.5 0.5ZM22.5 5.5L12.5 11.75L2.5 5.5V3L12.5 9.25L22.5 3V5.5Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </span>
              <p className="text-[20px]"><a href="mailto:fullcircledetailinglwr@gmail.com">fullcircledetailinglwr@gmail.com</a></p>
            </div>

            <div className="flex items-center gap-3 ">
              
              <a href="https://apps.apple.com/us/app/full-circle-detailing/id6748556315"
                className="border border-slate-800 rounded-lg p-1"
              >
                <img src="/footerPhoto/apple.png" alt="photo" className="rounded-lg" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.richard.fullcircledetailing "
                className="border border-slate-800 rounded-lg p-1"
              >
                <img src="/footerPhoto/google.png" alt="photo" className="rounded-lg" />
              </a>
            </div>
          </div>

          <div className="relative z-10 md:place-self-end lg:place-self-start md:flex md:flex-col lg:items-start md:items-end ">
            <h3 className="text-[20px] font-medium underline underline-offset-2">
              Quick Access
            </h3>
            <div className="flex flex-col  space-y-3 pt-4">
              <a href="/" className="text-[18px] font-degular">
                Home
              </a>
              <a href="/about" className="text-[18px] font-degular">
                About Us
              </a>
              <a href="/services" className="text-[18px] font-degular">
                Services
              </a>
              <a href="/pricing" className="text-[18px] font-degular">
                Pricing
              </a>
              <a href="/photo-gallery" className="text-[18px] font-degular">
                Photo Gallery
              </a>
            </div>
          </div>

          <div className="relative z-10 ">
            <h3 className="text-[20px] font-medium underline underline-offset-2">
              Others
            </h3>
            <div className="flex flex-col  space-y-3 pt-4">
              <a href="/privacy-policy" className="text-[18px] font-degular">
                Privacy Policy
              </a>
              <a href="/terms-conditions" className="text-[18px] font-degular">
                Terms & Conditions
              </a>
              <a href="/support" className="text-[18px] font-degular">
                Support
              </a>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img
              src="/footerImage/car1.png"
              alt="car"
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 ">
          <div className="flex flex-wrap items-center justify-center text-[16px] md:text-[18px] gap-1 md:gap-2 text-center">
            Copyright 2025<span className="px-1 flex items-center">
              <svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.38 7.14C11.66 7.2 11.99 8.29 12.01 8.8H13.8C13.72 6.82 12.31 5.61 10.35 5.61C8.14 5.61 6.5 7 6.5 10.14C6.5 12.08 7.43 14.38 10.34 14.38C12.56 14.38 13.75 12.73 13.78 11.43H11.99C11.96 12.02 11.54 12.81 10.36 12.87C9.05 12.83 8.5 11.81 8.5 10.14C8.5 7.25 9.78 7.16 10.38 7.14ZM10.5 0C4.98 0 0.5 4.48 0.5 10C0.5 15.52 4.98 20 10.5 20C16.02 20 20.5 15.52 20.5 10C20.5 4.48 16.02 0 10.5 0ZM10.5 18C6.09 18 2.5 14.41 2.5 10C2.5 5.59 6.09 2 10.5 2C14.91 2 18.5 5.59 18.5 10C18.5 14.41 14.91 18 10.5 18Z" fill="white" />
              </svg>
            </span>Reserved by FULL CIRCLE Detailing
          </div>
        </div>


      </CustomContainer>
    </footer>
  );
};

export default Footer;