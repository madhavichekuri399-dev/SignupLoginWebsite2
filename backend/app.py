import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuth


# Load environment variables
load_dotenv()


# Create FastAPI app
app = FastAPI()


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Session configuration
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET")
)


# Google OAuth configuration
oauth = OAuth()

oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile"
    }
)


# Backend home
@app.get("/")
def home():
    return {
        "message": "Signup Login Backend is running"
    }


# Google Login
@app.get("/auth/login")
async def google_login(request: Request):
    redirect_uri = "http://127.0.0.1:8000/auth/callback"

    return await oauth.google.authorize_redirect(
        request,
        redirect_uri
    )


# Google OAuth Callback
@app.get("/auth/callback")
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)

    user_info = token.get("userinfo")

    request.session["user"] = {
        "email": user_info.get("email"),
        "name": user_info.get("name"),
        "picture": user_info.get("picture")
    }

    return RedirectResponse(
        url="http://localhost:3000/home.html"
    )


# Get Logged-in User Information
@app.get("/auth/user")
async def get_auth_user(request: Request):
    user = request.session.get("user")

    if not user:
        return {
            "logged_in": False
        }

    return {
        "logged_in": True,
        "name": user.get("name"),
        "email": user.get("email"),
        "picture": user.get("picture")
    }