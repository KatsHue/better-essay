import { useForm } from "react-hook-form";
import { type UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = { email: "", password: "" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => toast.error(error.message),
    onSuccess: () => navigate("/"),
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 px-4">
      {/* Contenedor formulario */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-sky-700 text-center">
          Iniciar Sesión
        </h1>
        <p className="mt-2 text-center text-gray-600 text-lg">
          Mejora tus ensayos y resúmenes con IA{" "}
          <span className="text-sky-500 font-semibold">iniciando sesión</span>
        </p>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-6 space-y-5"
          noValidate
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email de registro"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-500 placeholder-gray-400 transition"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password de registro"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-500 placeholder-gray-400 transition"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          {/* Botón */}
          <input
            type="submit"
            value="Iniciar Sesión"
            className="w-full py-3 mt-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 cursor-pointer"
          />
        </form>

        {/* Links */}
        <div className="mt-4 flex flex-col space-y-2 text-center">
          <Link
            to={"/auth/register"}
            className="text-sky-600 font-medium hover:text-sky-700 transition-colors"
          >
            ¿No tienes cuenta? Crea una
          </Link>

          <Link
            to={"/auth/forgot-password"}
            className="text-sky-600 font-medium hover:text-sky-700 transition-colors"
          >
            ¿Olvidaste tu contraseña? Reestablecer
          </Link>
        </div>
      </div>
    </div>
  );
}
