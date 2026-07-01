import os
import random
import shutil
from PIL import Image
from rich.progress import track

# === Config ===
RAW_DATA_DIR = "./raw_dataset"
MASTER_DATA_DIR = "./master_dataset"

MAX_IMAGE_SIZE = 1024
TRAIN_SPLIT_RATIO = 0.8

TARGET_CATEGORIES = [
    "paper",
    "cardboard",
    "glass",
    "plastic",
    "metal",
    "landfill"
]

def process_image (source_path, destination_path):
    """Ensures training and validation images are properly formatted"""
    try:
        with Image.open(source_path) as img:
            img = img.convert("RGB")

            if max(img.size) > MAX_IMAGE_SIZE:
                img.thumbnail((MAX_IMAGE_SIZE, MAX_IMAGE_SIZE), Image.Resampling.LANCZOS)

            img.save(destination_path, "JPEG", quality=90)
            return True
    except Exception as e:
        print(f"Failed to process image {source_path}: {e}")
        return False

if __name__ == "__main__":
    # Initialize directories
    if not os.path.exists(RAW_DATA_DIR):
        print(f"Raw dataset directory not found at {RAW_DATA_DIR}")
        exit()
    
    if os.path.exists(MASTER_DATA_DIR):
        print(f"Clearing existing master dataset to prevent duplicates...")
        shutil.rmtree(MASTER_DATA_DIR)
    
    for dir in ["train", "val"]:
        for target_class in TARGET_CATEGORIES:
            os.makedirs(os.path.join(MASTER_DATA_DIR, dir, target_class), exist_ok=True)
    
    # Discover and categorize raw files
    categorized_images = {category : [] for category in TARGET_CATEGORIES}

    print(f"Scanning raw dataset...")
    for path, dir_names, file_names in os.walk(RAW_DATA_DIR):
        folder_name = os.path.basename(path)

        if folder_name in TARGET_CATEGORIES:
            for file in file_names:
                if file.endswith((".png", ".jpg", ".jpeg")):
                    categorized_images[folder_name].append(os.path.join(path, file))
    
    # Split, resize, and save images
    total_images_processed = 0

    for target_category, image_paths in categorized_images.items():
        # Split images of each category based on training and validation split sizes
        random.shuffle(image_paths)
        split_index = int(len(image_paths) * TRAIN_SPLIT_RATIO)
        train_images = image_paths[:split_index]
        val_images = image_paths[split_index:]
        print(f"Processing \"{target_category}\": {len(train_images)} training images, {len(val_images)} validation images")

        # Process training set
        for image_path in track(train_images, description="Processing training images..."):
            destination_file_name = f"train_{os.path.basename(image_path)}"
            destination_path = os.path.join(MASTER_DATA_DIR, "train", target_category, destination_file_name)
            if process_image(image_path, destination_path):
                total_images_processed += 1
        
        # Process validation set
        for image_path in track(val_images, description="Processing validation images..."):
            destination_file_name = f"val_{os.path.basename(image_path)}"
            destination_path = os.path.join(MASTER_DATA_DIR, "val", target_category, destination_file_name)
            if process_image(image_path, destination_path):
                total_images_processed += 1

    print(f"\n{total_images_processed} images were processed and categorized into {MASTER_DATA_DIR}")