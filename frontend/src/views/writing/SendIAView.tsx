// SendIAView.tsx
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getResponseIA } from "@/api/AIAPI";
import { useEffect, useState } from "react";
import { formatResponse } from "@/utils/format";

export type IAForm = {
  jobDescription: string;
  userInfo: string;
};

export default function SendIAView() {
  const initialValues: IAForm = {
    jobDescription: "",
    userInfo: "",
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
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      setIA({
        ...ia,
        text: data!,
        response: true,
        loading: false,
      });
    },
  });

  useEffect(() => {
    if (ia.text) {
      const formatted = formatResponse(ia.text);
      setSections(formatted);
    }
  }, [ia.text]);

  const handleSubmitIA = (formData: IAForm) => {
    setIA({ ...ia, loading: true });
    mutate(formData);
  };

  function renderContent(content: string) {
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    if (lines.every((l) => /^(\d+\.\s|\-\s|\*\s)/.test(l.trim()))) {
      const isOrdered = lines.every((l) => /^\d+\./.test(l.trim()));
      return isOrdered ? (
        <ol className="list-decimal list-inside space-y-1">
          {lines.map((line, i) => (
            <li key={i}>{line.replace(/^\d+\.\s/, "")}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {lines.map((line, i) => (
            <li key={i}>{line.replace(/^(\-|\*)\s/, "")}</li>
          ))}
        </ul>
      );
    }
    return <p className="whitespace-pre-line">{content}</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-5xl font-black">Asistente de Empleo con IA</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Ingresa una oferta de trabajo y tu información personal para recibir
        recomendaciones y un CV adaptado a la vacante.
      </p>

      <form
        onSubmit={handleSubmit(handleSubmitIA)}
        className="mt-10 space-y-5 bg-white shadow-xl p-10 rounded-2xl mb-5 border border-gray-100"
        noValidate
      >
        {/* Campo de oferta de trabajo */}
        <div>
          <label
            className="text-sm uppercase font-bold tracking-wide text-gray-700"
            htmlFor="jobDescription"
          >
            Oferta de trabajo:
          </label>
          <textarea
            id="jobDescription"
            placeholder="Pega aquí la descripción del empleo..."
            className="w-full p-4 mt-2 h-44 bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 placeholder-gray-400 text-gray-800 resize-none"
            {...register("jobDescription", {
              required: "La oferta de trabajo es obligatoria",
            })}
          />
          {errors.jobDescription && (
            <ErrorMessage>{errors.jobDescription.message}</ErrorMessage>
          )}
        </div>

        {/* Campo de información del usuario */}
        <div>
          <label
            className="text-sm uppercase font-bold tracking-wide text-gray-700"
            htmlFor="userInfo"
          >
            Tu experiencia e información:
          </label>
          <textarea
            id="userInfo"
            placeholder="Describe tu experiencia, educación, habilidades, logros, etc."
            className="w-full p-4 mt-2 h-44 bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 placeholder-gray-400 text-gray-800 resize-none"
            {...register("userInfo", {
              required: "Tu información es obligatoria",
            })}
          />
          {errors.userInfo && (
            <ErrorMessage>{errors.userInfo.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value={ia.loading ? "Generando..." : "Generar recomendaciones"}
          className={`bg-sky-600 w-full p-3 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors rounded-md ${
            ia.loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={ia.loading}
        />
      </form>

      {ia.loading && (
        <div className="flex items-center justify-center mt-10 space-x-2 text-sky-600">
          <div className="w-5 h-5 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium">Procesando información...</p>
        </div>
      )}

      {ia.text && (
        <div className="space-y-6 mt-10">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <h1 className="font-bold text-lg mb-2 text-sky-700">
                {section[0]}
              </h1>
              {renderContent(section.slice(1).join("\n"))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
