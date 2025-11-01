import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";

const MainLayout = () => {
  const location = useLocation()
  const hideNavbarPaths = ["/about", "/privacy-policy", "/terms-conditions","/service-availability", "/service-book", "/user-profile", "/edit-user-profile", "/support", "/checkout",];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <>
      <div>
        {/* Navbar conditionally show */}
        {!shouldHideNavbar && <Navbar />}
      </div>
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
