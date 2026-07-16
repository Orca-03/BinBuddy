import io
import os
import json
import torch
import logging
from PIL import Image
from contextlib import asynccontextmanager
from torchvision import models, transforms
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# === Config ===
MODEL_PATH = "./binbuddy_model_best.pth"
CLASSES_PATH = "./binbuddy_classes.json"
IMAGE_SIZE = 384

def load_waste_data():

    current_dir = os.path.dirname(os.path.abspath(__file__))

    waste_data_path = os.path.join(current_dir, "waste_data.json")

    if not os.path.exists(waste_data_path):
        raise FileNotFoundError(
            f"waste_data.json not found at {waste_data_path}"
        )

    with open(waste_data_path, "r") as f:
        return json.load(f)
    
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
    app.state.waste_data = load_waste_data()

    print("Waste categories loaded:", app.state.waste_data.keys())

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

@app.get("/api/waste/{category}")
def get_waste_info(category: str):
    # This endpoint allows the frontend to request
    # disposal information for any category.
    # independent of the model's prediction

    if category not in app.state.waste_data:
        raise HTTPException(
            status_code=404,
            detail="Waste category not found"
        )

    return app.state.waste_data[category]

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
        category = max(predictions, key=predictions.get)
        return {
            "category": category,
            "conf-scores": predictions,
            "disposal-instructions": app.state.waste_data.get(category, {})
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model inference failed: {str(e)}")
    
frontend_dist_dir = os.path.abspath("../frontend/dist")
assets_dir = os.path.join(frontend_dist_dir, "assets")

if os.path.exists(assets_dir):
    app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

@app.get("/{full_path:path}")
async def serve_spa_frontend(full_path: str):
    specific_file_path = os.path.join(frontend_dist_dir, full_path)
    if os.path.isfile(specific_file_path):
        return FileResponse(specific_file_path)
        
    index_html_path = os.path.join(frontend_dist_dir, "index.html")
    if os.path.exists(index_html_path):
        return FileResponse(index_html_path)
    
    return {"error": "Frontend build files not found. Ensure 'npm run build' was executed."}