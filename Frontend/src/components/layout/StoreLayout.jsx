import { Outlet } from "react-router-dom";
import TopAnnouncementBar from "../home/TopAnnouncementBar";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

function StoreLayout() {
  return (
    <>
      <TopAnnouncementBar />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default StoreLayout;
