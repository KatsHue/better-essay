import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getSummaryIA } from "@/api/SummaryAPI";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck } from "lucide-react";

export type SummaryForm = {
  textToSummarize: string;
};

export default function SendSummaryView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SummaryForm>({
    defaultValues: { textToSummarize: "" },
  });

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: getSummaryIA,
    onError: (error: any) => toast.error(error.message),
    onSuccess: (data) => {
      setSummary(data);
      setLoading(false);
    },
  });

  const handleSubmitSummary = (formData: SummaryForm) => {
    setSummary("");
    setLoading(true);
    mutate(formData);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-5xl font-black text-gray-900">Resúmenes con IA</h1>
      <p className="text-lg sm:text-2xl font-light text-gray-600 mt-4 text-justify">
        Escribe o pega un texto y nuestra IA generará un resumen conciso y
        claro.
      </p>

      <form
        onSubmit={handleSubmit(handleSubmitSummary)}
        className="mt-8 space-y-6 bg-white shadow-lg p-8 rounded-2xl border border-gray-100"
        noValidate
      >
        <div>
          <label className="text-sm font-bold tracking-wide text-gray-700 mb-1 block">
            Texto a resumir:
          </label>
          <textarea
            {...register("textToSummarize", {
              required: "Este campo es obligatorio",
            })}
            placeholder="Pega aquí tu texto..."
            className="w-full p-4 min-h-[12rem] bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 placeholder-gray-400 text-gray-800 resize-none"
          />
          {errors.textToSummarize && (
            <p className="text-red-500 text-sm mt-1">
              {errors.textToSummarize.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 text-white font-bold uppercase rounded-xl bg-sky-600 hover:bg-sky-700 transition-all duration-300 flex items-center justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              Resumiendo...
            </>
          ) : (
            "Generar resumen"
          )}
        </button>
      </form>

      <AnimatePresence>
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-10 p-6 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl shadow-md border border-gray-200"
          >
            <div className="flex gap-3">
              <ClipboardCheck className="w-6 h-6 text-sky-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-sky-700 mb-2">
                  Resumen generado:
                </h2>
                <p className="text-gray-800 text-justify leading-relaxed">
                  {summary}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
