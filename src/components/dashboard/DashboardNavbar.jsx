import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { FiMenu } from "react-icons/fi";


const DashboardNavbar = ({ showDrawer, setShowDrawer }) => {

    const handleMenu = () => {
        setShowDrawer(!showDrawer)
    }
    const getTitle = () => {
        switch (location.pathname) {
            case "/admin/dashboard":
                return (
                    <>
                        <h1 className="text-[#333333] font-roboto font-semibold text-[30px]">
                            Dashboard Overview
                        </h1>
                        <p className="font-normal text-lg -mt-3 mb-4">
                            You can see all of the overview of your site and app from here.
                        </p>
                    </>
                );
            case "/admin/dashboard/bookings":
                return (
                    <>
                        <h1 className="text-[#333333] font-semibold text-[30px]">Bookings</h1>
                        <p className="font-normal text-lg -mt-3 mb-4">
                            You can see all of the bookings of your site and app from here.</p>
                    </>
                );
            case "/admin/dashboard/services":
                return (
                    <>
                        <h1 className="text-[#333333] font-semibold text-[30px]">
                            Services
                        </h1>
                        <p className="font-normal text-lg -mt-3 mb-4">
                            You can see & manage all of the services of your site and app from here.
                        </p>
                    </>
                );
            case "/admin/dashboard/manage-images":
                return (
                    <>
                        <h1 className="text-[#333333] font-semibold text-[30px]">
                            Manage Images
                        </h1>
                        <p className="font-normal text-lg -mt-3 mb-4">
                            You can manage all of your images of your website and app from here.
                        </p>
                    </>
                );
            case "/admin/dashboard/manage-dates":
                return (
                    <>
                        <h1 className="text-[#333333] font-semibold text-[30px]">Manage Dates</h1>
                        <p className="font-normal text-lg -mt-3 mb-4">
                            You can manage the dates of your service from here.
                        </p>
                    </>
                );
            case "/admin/dashboard/transactions":
                return (
                    <>
                        <h1 className="text-[#333333] font-semibold text-[30px]">
                            Transactions
                        </h1>
                        <p className="font-normal text-lg -mt-3 mb-4">
                            You can see all of the transactions of your site and app from here.
                        </p>
                    </>
                );
            case "/admin/dashboard/feedbacks":
                return (
                    <>
                        <h1 className="text-[#333333] font-semibold text-[30px]">
                            Feedback
                        </h1>
                        <p className="font-normal text-lg -mt-3 mb-4">
                            You can see all of the feedback of your site and app from here.
                        </p>
                    </>
                );
            case "/admin/dashboard/change-password":
                return (
                    <>
                        <h1 className="text-[#333333] font-semibold text-[30px]">
                            Change Password
                        </h1>
                        <p className="font-normal text-lg -mt-3 mb-4">
                            You can change your admin panel password from here.
                        </p>
                    </>
                );
            case "/admin/dashboard/privacy&policy":
                return (
                    <h1 className="text-[#333333] font-semibold text-[24px]">
                        <>
                            <h1 className="text-[#333333] font-semibold text-[30px]">
                                Privacy policy
                            </h1>
                            <p className="font-normal text-lg -mt-3 mb-4">
                                You can change your privacy policy section of your website and app from here.
                            </p>
                        </>
                    </h1>
                );
            case "/admin/dashboard/terms-conditions":
                return (
                    <h1 className="text-[#333333] font-semibold text-[24px]">
                        <>
                            <h1 className="text-[#333333] font-semibold text-[30px]">
                                Terms & Conditions
                            </h1>
                            <p className="font-normal text-lg -mt-3 mb-4">
                                You can change your terms & conditions of your website and app from here.
                            </p>
                        </>
                    </h1>
                );
        }
    };


    return (
        <Layout className="bg-primary opacity-65">
            <div className="flex gap-6 items-center p-2 lg:hidden">
                <FiMenu
                    onClick={handleMenu}
                    className="text-4xl md:text-7xl border border-gray-400 p-1 cursor-pointer" />
                <img src="/dashboardLogo.png" alt="Logo" className="w-[40%] object-cover  " />
            </div>

            <div className="hidden lg:block bg-[#f6f6f6]">
                <Header
                    style={{
                        position: "fixed",
                        width: "calc(100% - 300px)",
                        top: 0,
                        left: 300,
                        height: "100px",
                        paddingTop: "20px",
                        zIndex: 40,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div className="w-full flex justify-between items-center">
                        <div>{getTitle()}</div>
                        <div
                            onClick={() => handleMenu()}

                            className="cursor-pointer"
                            style={{ zIndex: 11 }}
                        >

                            <div className="flex justify-center items-center gap-4">
                                <svg
                                    className="md:w-[30px] h-[30px] lg:w-[42px] lg:h-[42px] rounded-full"
                                    viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="50" height="50" rx="25" fill="#0063E5" />
                                    <path d="M21.645 33.4437C21.861 34.1824 22.3042 34.8302 22.9086 35.2907C23.513 35.7513 24.2464 36 25 36C25.7536 36 26.487 35.7513 27.0914 35.2907C27.6958 34.8302 28.139 34.1824 28.355 33.4437H21.645ZM16 32.4203H34V29.3503L32 26.2802V21.1635C32 20.2227 31.8189 19.2912 31.4672 18.4221C31.1154 17.553 30.5998 16.7633 29.9497 16.0981C29.2997 15.4329 28.5281 14.9053 27.6788 14.5453C26.8295 14.1853 25.9193 14 25 14C24.0807 14 23.1705 14.1853 22.3212 14.5453C21.4719 14.9053 20.7003 15.4329 20.0503 16.0981C19.4002 16.7633 18.8846 17.553 18.5328 18.4221C18.1811 19.2912 18 20.2227 18 21.1635V26.2802L16 29.3503V32.4203Z" fill="white" />
                                </svg>

                                <img src="/privacyPolicy/photo1.png" className="w-[40px] h-[40px] rounded-full object-cover" />
                                <h2 className="font-degular font-semibold text-[28px]">
                                    John Doe
                                </h2>
                            </div>
                        </div>
                    </div>
                </Header>
            </div>
        </Layout>
    )
}

export default DashboardNavbar