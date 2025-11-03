import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { type ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) =>
    mutate(formData);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 px-4 py-16">
      {/* Contenedor formulario */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 mb-6">
        <h1 className="text-4xl font-extrabold text-sky-700 text-center">
          Reestablecer Password
        </h1>
        <p className="mt-2 text-center text-gray-600 text-lg">
          ¿Olvidaste tu password? Coloca tu email para{" "}
          <span className="text-sky-500 font-semibold">reestablecer</span>
        </p>

        <form
          onSubmit={handleSubmit(handleForgotPassword)}
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
                required: "El Email de registro es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          {/* Botón */}
          <input
            type="submit"
            value="Enviar Instrucciones"
            className="w-full py-3 mt-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 cursor-pointer"
          />
        </form>

        {/* Links */}
        <div className="mt-4 flex flex-col space-y-2 text-center">
          <Link
            to="/auth/login"
            className="text-sky-600 font-medium hover:text-sky-700 transition-colors"
          >
            ¿Ya tienes cuenta? Iniciar Sesión
          </Link>
          <Link
            to="/auth/register"
            className="text-sky-600 font-medium hover:text-sky-700 transition-colors"
          >
            ¿No tienes cuenta? Crea una
          </Link>
        </div>
      </div>
    </div>
  );
}
