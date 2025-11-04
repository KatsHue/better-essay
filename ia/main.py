from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API de Resúmenes IA")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

class TextRequest(BaseModel):
    texto: str

def limpiar_texto(texto: str) -> str:
    return " ".join(texto.split())

def resumir_texto_largo(texto: str, max_length=150, min_length=50, chunk_size=500) -> str:
    palabras = texto.split()
    # Crear chunks de tamaño chunk_size
    chunks = [" ".join(palabras[i:i+chunk_size]) for i in range(0, len(palabras), chunk_size)]
    
    resumen_parcial = []
    for idx, chunk in enumerate(chunks):
        try:
            r = summarizer(chunk, max_length=max_length, min_length=min_length, do_sample=False)
            resumen_parcial.append(r[0]["summary_text"])
        except Exception as e:
            print(f"Error en chunk {idx}: {e}")
            continue

    texto_resumen = " ".join(resumen_parcial)

    # Si el resumen final sigue siendo muy largo, resumir una vez más
    if len(texto_resumen.split()) > chunk_size:
        texto_resumen = summarizer(
            texto_resumen, max_length=max_length, min_length=min_length, do_sample=False
        )[0]["summary_text"]

    return texto_resumen

@app.post("/resumir")
def generar_resumen(req: TextRequest):
    if not req.texto.strip():
        return {"error": "No se recibió texto válido."}

    texto_limpio = limpiar_texto(req.texto)
    resumen_final = resumir_texto_largo(texto_limpio)

    return {"resumen": resumen_final}
