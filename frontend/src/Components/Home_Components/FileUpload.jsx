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
