import os
import torch
from torchvision import models, transforms, datasets
from collections import Counter

# === Training Config ===
DATA_DIR = "./master_dataset"
MODEL = models.efficientnet_v2_s(weights=models.EfficientNet_V2_S_Weights.DEFAULT)
IMAGE_SIZE = 384
BATCH_SIZE = 64

EPOCHS = 15
LEARNING_RATE = 0.001
WEIGHT_DECAY = 1e-4

MODEL_FILE_NAME = "binbuddy_model_best.pth"

# === Data Transforms ===
BASE_TRANSFORMS = [
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
]

TRAINING_TRANSFORMS = [
    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.RandomRotation(degrees=20),
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.2),
    *BASE_TRANSFORMS
]

if __name__ == "__main__":
    # Initialize data for training
    base_transforms = transforms.Compose(BASE_TRANSFORMS)
    train_transforms = transforms.Compose(TRAINING_TRANSFORMS)

    train_dataset = datasets.ImageFolder(os.path.join(DATA_DIR, "train"), transform=train_transforms)
    val_dataset = datasets.ImageFolder(os.path.join(DATA_DIR, "val"), transform=base_transforms)

    train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=8, pin_memory=True)
    val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=BATCH_SIZE, num_workers=8, pin_memory=True)

    # Initialize training device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Traininng on device: {device}\n")
    print(f"Target classes: {train_dataset.classes}\n")
    print(f"Loaded {len(train_dataset)} training images and {len(val_dataset)} validation images\n")

    # Calculate class weights
    class_counts = dict(Counter(train_dataset.targets))
    total_samples = sum(class_counts.values())

    weights = [total_samples / class_counts[i] for i in range(len(class_counts))]
    weights_tensor = torch.FloatTensor(weights).to(device)
    print(f"Calculated the following weights to balance training:\n{weights}\n")

    # Set up model
    for param in MODEL.parameters():
        param.requires_grad = False
    
    num_features = MODEL.classifier[1].in_features
    MODEL.classifier[1] = torch.nn.Linear(num_features, len(train_dataset.classes))
    MODEL.to(device)

    criterion = torch.nn.CrossEntropyLoss(weight=weights_tensor)
    optimizer = torch.optim.Adam(MODEL.classifier.parameters(), lr = LEARNING_RATE, weight_decay=WEIGHT_DECAY)

    # Training loop
    best_accuracy = 0.0
    for epoch in range(EPOCHS):
        print(f"\n=== EPOCH {epoch + 1}/{EPOCHS} ===\n")

        # Training
        running_loss = 0.0
        MODEL.train()

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = MODEL(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        print(f"Training Loss: {running_loss/len(train_loader):.4f}")

        # Validation
        MODEL.eval()
        correct = 0
        total = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = MODEL(images)

                tensor, predicted = torch.max(outputs.data, 1)
                total += labels.size(0)
                correct  += (predicted == labels).sum().item()
        
        val_accuracy = (correct / total) * 100
        print(f"Validation Accuracy: {val_accuracy:.2f}%\n")

        if val_accuracy > best_accuracy:
            best_accuracy = val_accuracy
            torch.save(MODEL.state_dict(), MODEL_FILE_NAME)
            print(f"New best model saved as \"{MODEL_FILE_NAME}\"\n")

    print(f"Training complete! Best accuracy: {best_accuracy:.2f}%")