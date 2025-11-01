import { useNavigate } from "react-router-dom";


const ErrorPage = () => {
  const navigate = useNavigate();



  return <div className="h-screen flex justify-center ">
    <div className="space-y-4">
      <img src="/404.png" alt="" />
      <div className="text-center">
        <p className="text-[26px]">!Oops</p>
        <h2 className="text-[34px] font-bold">Page not found</h2>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-[#fff] font-semiboldbold text-[20px] flex justify-center items-center w-[500px] gap-2 py-4 rounded-2xl">
          <span>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8.36839H3.97353L8.64461 12.9244L7.17685 14.356L0 7.35596L7.17685 0.355956L8.64461 1.78754L3.97353 6.34352H16V8.36839Z" fill="white" />
            </svg>
          </span>
          <h2>Back</h2>
        </button>
      </div>
    </div>
  </div>;
};

export default ErrorPage;
