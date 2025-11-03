import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="py-10 lg:py20 mx-auto w-[450px]">
          <Logo />
          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
