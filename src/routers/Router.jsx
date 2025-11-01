import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Pricing from "../pages/pricing/Pricing";
import CreateAccount from "../pages/authentication/createAccount/CreateAccount";
import Login from "../pages/authentication/login/Login";
import ForgetPassword from "../pages/authentication/forgetPassword/ForgetPassword";
import OtpCode from "../pages/authentication/otpCode/OtpCode";
import CreateNewPassword from "../pages/authentication/createNewPassword/CreateNewPassword";
import PasswordSuccessfully from "../pages/authentication/passwordSuccessfully/PasswordSuccessfully";
import About from "../pages/about/About";
import PhotoGallery from "../pages/photoGallery/PhotoGallery";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";
import TermsConditions from "../pages/termsConditions/TermsConditions";
import ServiceBook from "../pages/serviceBook/ServiceBook";
import UserProfile from "../pages/profile/UserProfile";
import EditUserProfile from "../pages/profile/EditUserProfile";
import Notification from "../pages/notification/Notification";
import Support from "../pages/support/Support";
import ServiceAviablity from "../pages/serviceAviablity/ServiceAviablity";
import Dashboard from "../layout/Dashboard";
import ManageImages from "../pages/dashboardPage/manageImages/ManageImages";
import ManageDates from "../pages/dashboardPage/manageDates/ManageDates";
import Transactions from "../pages/dashboardPage/transactions/Transactions";
import Feedbacks from "../pages/dashboardPage/feedbacks/Feedbacks";
import ChangePassword from "../pages/dashboardPage/settings/changePassword/ChangePassword";
import TermsAndConditions from "../pages/dashboardPage/settings/termsAndConditions/TermsAndConditions";
import CommonDashboard from "../pages/dashboardPage/commonDashboard/CommonDashboard";
import PrivacyAndPolicy from "../pages/dashboardPage/settings/privacyPolicy/PrivacyAndPolicy";
import Service from "../pages/service/Service";
import DashboardService from "../pages/dashboardPage/dashboardService/DashboardService";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import DashboardLogin from "../pages/dashboardPage/dashboardAuthentication/DashboardLogin";
import DashboardForgetPassword from "../pages/dashboardPage/dashboardAuthentication/DashboardForgetPassword";
import DashboardOtpCode from "../pages/dashboardPage/dashboardAuthentication/DashboardOtpCode";
import DashboardCreateNewPassword from "../pages/dashboardPage/dashboardAuthentication/DashboardCreateNewPassword";
import DashboardBookings from "../pages/dashboardPage/dashboardBookings/DashboardBookings";
import DashboardNotification from "../pages/dashboardPage/dashboardNotification/DashboardNotification";
import DashboardUsers from "../pages/dashboardPage/dashboardUsers/DashboardUsers";
import PrivatRoutes from "./PrivatRoutes";
import AboutUs from "../pages/dashboardPage/settings/aboutUs/AboutUs";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Service />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/photo-gallery",
        element: <PhotoGallery />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/service-book",
        element: <ServiceBook />,
      },
      {
        path: "/service-availability",
        element: <PrivatRoutes>
          <ServiceAviablity />,
        </PrivatRoutes>
      },
      {
        path: "/checkout",
        element: <PrivatRoutes>
          <CheckoutPage />,
        </PrivatRoutes>
      },
      {
        path: "/user-profile",
        element: <PrivatRoutes>
          <UserProfile />
        </PrivatRoutes>
      },
      {
        path: "/edit-user-profile",
        element:<PrivatRoutes>
           <EditUserProfile />
        </PrivatRoutes>,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "/otp-code",
        element: <OtpCode />,
      },
      {
        path: "/create-new-password",
        element: <CreateNewPassword />,
      },
      {
        path: "/password-successfull",
        element: <PasswordSuccessfully />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  // dashboard routers =========================================
  {
    path: "/admin/dashboard",
    element: <PrivatRoutes>
      <Dashboard />
    </PrivatRoutes>,
    children: [
      {
        path: "/admin/dashboard",
        element: <PrivatRoutes>
          <CommonDashboard />
        </PrivatRoutes>
      },
      {
        path: "users",
        element: <PrivatRoutes>
          <DashboardUsers />
        </PrivatRoutes>
      },
      {
        path: "bookings",
        element: <PrivatRoutes>
          <DashboardBookings />
        </PrivatRoutes>
      },
      {
        path: "services",
        element: <PrivatRoutes>
          <DashboardService />
        </PrivatRoutes>
      },
      {
        path: "manage-images",
        element: <PrivatRoutes>
          <ManageImages />
        </PrivatRoutes>
      },
      {
        path: "manage-dates",
        element: <PrivatRoutes>
          <ManageDates />
        </PrivatRoutes>
      },
      {
        path: "transactions",
        element: <PrivatRoutes>
          <Transactions />
        </PrivatRoutes>
      },
      {
        path: "feedback",
        element: <PrivatRoutes>
          <Feedbacks />
        </PrivatRoutes>
      },
      {
        path: "change-password",
        element: <PrivatRoutes>
          <ChangePassword />
        </PrivatRoutes>
      },
      {
        path: "aboutUs",
        element: <PrivatRoutes>
          <AboutUs />
        </PrivatRoutes>
      },
      {
        path: "privacy&policy",
        element: <PrivatRoutes>
          <PrivacyAndPolicy />
        </PrivatRoutes>
      },
      {
        path: "terms-conditions",
        element: <PrivatRoutes>
          <TermsAndConditions />
        </PrivatRoutes>
      },
      {
        path: "notifications",
        element: <PrivatRoutes>
          <DashboardNotification />
        </PrivatRoutes>
      },

    ]
  },

  // dashboard authentication routes =====================
  {
    path: "/admin/dashboard/login",
    element: <DashboardLogin />
  },
  {
    path: "/admin/dashboard/forgot-password",
    element: <DashboardForgetPassword />
  },
  {
    path: "/admin/dashboard/otp-code",
    element: <DashboardOtpCode />
  },
  {
    path: "/admin/dashboard/create-new-password",
    element: <DashboardCreateNewPassword />
  },
  
]);

export default router;


