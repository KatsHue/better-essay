import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getResponseIA } from "@/api/AIAPI";
import { useEffect, useState } from "react";
import { formatResponse } from "@/utils/format";
import { ClipboardCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type IAForm = {
  essayTopic: string;
  essayContent: string;
};

export default function SendIAView() {
  const initialValues: IAForm = {
    essayTopic: "",
    essayContent: "",
  };

  const [ia, setIA] = useState({
    text: "",
    response: false,
    loading: false,
  });

  const [sections, setSections] = useState<string[][]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: getResponseIA,
    onError: (error: any) => toast.error(error.message),
    onSuccess: (data) => {
      setIA({ ...ia, text: data!, response: true, loading: false });
    },
  });

  useEffect(() => {
    if (ia.text) {
      const formatted = formatResponse(ia.text);
      setSections(formatted);
    }
  }, [ia.text]);

  const handleSubmitIA = (formData: IAForm) => {
    setIA({ ...ia, loading: true, response: false });
    mutate(formData);
  };

  function renderContent(content: string | undefined) {
    if (!content) return null;
    return (
      <div className="prose prose-sky max-w-full text-justify">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-5xl font-black text-gray-900">
        Asistente de Ensayos con IA
      </h1>
      <p className="text-lg sm:text-2xl font-light text-gray-600 mt-4 text-justify">
        Ingresa el tema de tu ensayo y tu texto. Nuestro asistente te dará
        correcciones, sugerencias y un ejemplo mejorado del ensayo, además de
        recomendaciones para futuros escritos.
      </p>

      <form
        onSubmit={handleSubmit(handleSubmitIA)}
        className="mt-8 space-y-6 bg-white shadow-lg p-8 rounded-2xl border border-gray-100 transition-all duration-300"
        noValidate
      >
        {/* Tema del ensayo */}
        <div>
          <label className="text-sm font-bold tracking-wide text-gray-700 mb-1 block">
            Tema del ensayo:
          </label>
          <textarea
            {...register("essayTopic", {
              required: "El tema es obligatorio",
            })}
            id="essayTopic"
            placeholder="Escribe aquí el tema de tu ensayo..."
            className="w-full p-4 min-h-[6rem] bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 placeholder-gray-400 text-gray-800 resize-none"
          />
          {errors.essayTopic && (
            <ErrorMessage>{errors.essayTopic.message}</ErrorMessage>
          )}
        </div>

        {/* Ensayo del usuario */}
        <div>
          <label className="text-sm font-bold tracking-wide text-gray-700 mb-1 block">
            Tu ensayo:
          </label>
          <textarea
            {...register("essayContent", {
              required: "El ensayo es obligatorio",
            })}
            id="essayContent"
            placeholder="Escribe aquí tu ensayo..."
            className="w-full p-4 min-h-[10rem] bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 placeholder-gray-400 text-gray-800 resize-none"
          />
          {errors.essayContent && (
            <ErrorMessage>{errors.essayContent.message}</ErrorMessage>
          )}
        </div>

        {/* Botón submit con loader */}
        <button
          type="submit"
          disabled={ia.loading}
          className={`w-full py-3 px-6 text-white font-bold uppercase rounded-xl bg-sky-600 hover:bg-sky-700 transition-all duration-300 flex items-center justify-center ${
            ia.loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {ia.loading ? (
            <>
              <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              Generando...
            </>
          ) : (
            "Generar recomendaciones"
          )}
        </button>
      </form>

      {/* Resultados */}
      <AnimatePresence>
        {ia.response && sections.length > 0 && (
          <div className="mt-10 space-y-6">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 flex items-start gap-4"
              >
                <ClipboardCheck className="w-6 h-6 text-sky-500 mt-1 flex-shrink-0" />

                <div>
                  <h2 className="text-lg font-bold text-sky-700 mb-2">
                    {section[0]}
                  </h2>
                  {renderContent(section.slice(1).join("\n"))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
