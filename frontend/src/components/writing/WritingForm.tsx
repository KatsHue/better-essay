import type { User } from "@/types/index";
import { Briefcase } from "lucide-react";

type WritingFormProps = {
  data: User;
};

export default function WritingForm({ data }: WritingFormProps) {
  return (
    <div className="mx-auto max-w-5xl mt-10 px-4">
      <div
        className="bg-gradient-to-r from-sky-50 to-indigo-50 
                      border border-gray-200 rounded-3xl p-10 flex flex-col md:flex-row 
                      items-start gap-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 animate-fadeIn"
      >
        {/* Columna izquierda: saludo y nombre */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:w-1/3">
          <Briefcase className="w-12 h-12 text-sky-500" />
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-snug">
              Hola
            </h1>
            <span
              className="mt-1 inline-block text-2xl sm:text-3xl text-orange-500 
                             bg-indigo-100 border border-orange-500 rounded-lg py-1 px-4 uppercase"
            >
              {data.name}
            </span>
          </div>
        </div>

        {/* Columna derecha: descripción */}
        <div className="md:w-2/3">
          <p className="text-lg sm:text-2xl font-light text-gray-700 leading-relaxed text-justify">
            En el siguiente apartado podrás ingresar la oferta de trabajo y tu
            experiencia profesional para recibir recomendaciones personalizadas
            y un ejemplo de CV adaptado a la vacante. Nuestro asistente analiza
            la información y genera resultados claros y útiles, tanto en inglés
            como en español.
          </p>
        </div>
      </div>
    </div>
  );
}
