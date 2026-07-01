import io
import os
import json
import torch
import logging
from PIL import Image
from contextlib import asynccontextmanager
from torchvision import models, transforms
from fastapi import FastAPI, UploadFile, HTTPException

# === Config ===
MODEL_PATH = "./binbuddy_model_best.pth"
CLASSES_PATH = "./binbuddy_classes.json"
IMAGE_SIZE = 384

TRANSFORM = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# === Initialization ===
logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

# === API ===
@asynccontextmanager
async def lifespan(app: FastAPI):
    LOGGER.info(f"Initializing resources...")
    app.state.device = torch.device("cpu")

    # Initialize classes
    if not os.path.exists(CLASSES_PATH):
        raise FileNotFoundError(f"{CLASSES_PATH} not found")
    
    with open(CLASSES_PATH, "r") as f:
        app.state.classes = json.load(f)
    
    # Initialize model
    LOGGER.info(f"Initializing model...")
    model = models.efficientnet_v2_s(weights=None)
    num_features = model.classifier[1].in_features
    model.classifier[1] = torch.nn.Linear(num_features, len(app.state.classes))
    model.load_state_dict(torch.load(MODEL_PATH, map_location=app.state.device))
    model.eval()
    app.state.model = model

    LOGGER.info(f"Application ready! Loaded {len(app.state.classes)} classes")
    yield

app = FastAPI(lifespan=lifespan)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "hello world"
    }

@app.post("/api/classify/")
async def upload(file: UploadFile):
    # File validations
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image")
    
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        input_tensor = TRANSFORM(image).unsqueeze(0)

        with torch.no_grad():
            outputs = app.state.model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        
        predictions = {app.state.classes[i]: float(probabilities) for i, probabilities in enumerate(probabilities)}
        return {
            "category": max(predictions, key=predictions.get),
            "conf-scores": predictions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model inference failed: {str(e)}")