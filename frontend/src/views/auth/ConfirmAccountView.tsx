import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data),
  });

  const handleChange = (token: ConfirmToken["token"]) => setToken(token);
  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 px-4 py-16">
      {/* Contenedor */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-sky-700 text-center">
          Confirma tu Cuenta
        </h1>
        <p className="mt-2 text-center text-gray-600 text-lg">
          Ingresa el código que recibiste{" "}
          <span className="text-sky-500 font-semibold">por e-mail</span>
        </p>

        {/* Pin Input */}
        <form className="mt-6 space-y-5">
          <label className="font-medium text-gray-700 text-center block mb-3">
            Código de 6 dígitos
          </label>
          <div className="flex justify-center gap-3">
            <PinInput
              value={token}
              onChange={handleChange}
              onComplete={handleComplete}
            >
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <PinInputField
                    key={idx}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-500"
                  />
                ))}
            </PinInput>
          </div>
        </form>

        {/* Link */}
        <div className="mt-6 text-center">
          <Link
            to="/auth/request-code"
            className="text-sky-600 font-medium hover:text-sky-700 transition-colors"
          >
            Solicitar un nuevo Código
          </Link>
        </div>
      </div>
    </div>
  );
}
