import os

from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from openai import OpenAI


# =========================
# LOAD ENVIRONMENT
# =========================

load_dotenv()


API_KEY = os.getenv("OPENAI_API_KEY")

MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-5.5"
)


if not API_KEY:

    raise RuntimeError(
        "OPENAI_API_KEY is not configured."
    )


# =========================
# OPENAI CLIENT
# =========================

client = OpenAI(
    api_key=API_KEY
)


# =========================
# FASTAPI
# =========================

app = FastAPI(
    title="AI Chatbot API",
    description="Backend API for an AI chatbot.",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:3000",
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================
# DATA MODELS
# =========================

class Message(BaseModel):

    role: str
    content: str


class ChatRequest(BaseModel):

    message: str

    history: list[Message] = []


class ChatResponse(BaseModel):

    response: str


# =========================
# ROOT
# =========================

@app.get("/")
async def root():

    return {
        "message": "AI Chatbot API is running."
    }


# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
async def health():

    return {
        "status": "healthy"
    }


# =========================
# CHAT
# =========================

@app.post(
    "/chat",
    response_model=ChatResponse
)
async def chat(request: ChatRequest):

    try:

        conversation = []

        for message in request.history:

            if message.role not in {
                "user",
                "assistant"
            }:
                continue

            conversation.append({
                "role": message.role,
                "content": message.content
            })


        conversation.append({
            "role": "user",
            "content": request.message
        })


        response = client.responses.create(

            model=MODEL,

            instructions=(
                "You are a helpful, accurate and concise AI assistant. "
                "Answer clearly and naturally. "
                "If you are uncertain, say so rather than inventing facts."
            ),

            input=conversation
        )


        answer = response.output_text


        if not answer:

            raise HTTPException(
                status_code=500,
                detail="The AI returned an empty response."
            )


        return ChatResponse(
            response=answer
        )


    except HTTPException:

        raise


    except Exception as error:

        print(
            f"OpenAI API error: {error}"
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to generate AI response."
        )
