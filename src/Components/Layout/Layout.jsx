import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container pb-10 pt-24 text-[clamp(0.95rem,1vw+1rem,1.25rem)]px-[max(1rem,2vw)] min-h-[calc(100vh-120px)] box-border">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
