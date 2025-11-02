from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
import nltk
from nltk.corpus import stopwords

app = FastAPI(title="API de Resúmenes IA")

nltk.download('stopwords')

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

class TextRequest(BaseModel):
    texto: str

def limpiar_texto(texto):
    """Limpieza básica del texto"""
    texto = texto.lower().replace("\n", " ")
    palabras = texto.split()
    palabras = [p for p in palabras if p not in stopwords.words('spanish')]
    return " ".join(palabras)

def resumir_texto_largo(texto, max_length=130, min_length=30, chunk_size=500):
    """
    Divide texto en bloques y genera resumen final.
    """
    palabras = texto.split()
    chunks = [" ".join(palabras[i:i+chunk_size]) for i in range(0, len(palabras), chunk_size)]
    
    resumen_parcial = []
    for idx, chunk in enumerate(chunks):
        try:
            r = summarizer(chunk, max_length=max_length, min_length=min_length, do_sample=False)
            resumen_parcial.append(r[0]['summary_text'])
        except Exception as e:
            print(f"Error en chunk {idx}: {e}")
            continue
    
    texto_resumen = " ".join(resumen_parcial)
    
    # Resumir nuevamente si es muy largo
    if len(texto_resumen.split()) > chunk_size:
        texto_resumen = summarizer(texto_resumen, max_length=max_length, min_length=min_length, do_sample=False)[0]['summary_text']
    
    return texto_resumen

@app.post("/resumir")
def generar_resumen(req: TextRequest):
    if not req.texto.strip():
        return {"error": "No se recibió texto."}
    
    texto_limpio = limpiar_texto(req.texto)
    resumen_final = resumir_texto_largo(texto_limpio)
    
    return {"resumen": resumen_final}
