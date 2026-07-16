export async function validateImage(file) {
    if (!file) {
        throw new Error("No file provided");
    }

    const validTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!validTypes.includes(file.type)) {
        throw new Error("Invalid file type");
    }

    const url = URL.createObjectURL(file);

    try {
        const img = new Image();
        img.src = url;

        await img.decode();

        if (img.width < 100 || img.height < 100) {
            throw new Error("Image too small");
        }

        return true;
    } finally {
        URL.revokeObjectURL(url);
    }
}

export function uploadImage(file) {
    if (!file) return;

    if (!isValidImage(file)) {
        throw new Error("Invalid Image");
    }
}

export function pickImage() {
    return new Promise((resolve, reject) => {
        console.log("OPENING FILE PICKER");
        const input = document.createElement("input");

        input.type = "file";
        input.accept = "image/jpeg,image/png,.jpg,.jpeg,.png,webp";

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return reject("No file selected");
            resolve(file);
        };

        input.click();
    });
}