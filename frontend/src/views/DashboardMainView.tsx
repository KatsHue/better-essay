import { useEffect, useState } from "react";

export default function DashboardMainView() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animación de aparición gradual
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-20 text-center">
      <h1
        className={`text-5xl md:text-6xl font-extrabold text-sky-800 mb-6 transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        } drop-shadow-lg`}
      >
        ¡Bienvenido a Better | Essay!
      </h1>

      <p
        className={`text-lg md:text-2xl text-[#001F54] max-w-2xl leading-relaxed transition-opacity duration-1000 delay-300 ${
          visible ? "opacity-100" : "opacity-0"
        } drop-shadow-sm`}
      >
        Better | Essay es tu asistente inteligente para mejorar la escritura y
        la comprensión de textos. Corrige ensayos de forma automática y genera
        resúmenes precisos utilizando inteligencia artificial, para ayudarte a
        comunicar tus ideas con claridad y profesionalismo.
      </p>
    </div>
  );
}
