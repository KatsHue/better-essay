import { Link, Navigate, Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";

export const AppLayout = () => {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return "cargando...";

  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (data)
    return (
      <>
        <header className="bg-[#B5C7DB] py-5">
          <div className=" max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="w-16 m-3">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            <NavMenu name={data.name} />
          </div>
        </header>
        <section className="max-w-screen-2xl mx-auto mt-0 p-5">
          <Outlet />
        </section>

        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
    );
};
