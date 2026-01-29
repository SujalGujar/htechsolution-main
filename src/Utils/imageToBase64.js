// utils/compressImage.js
export const compressImageToBase64 = (file, maxWidth = 100, quality = 0.6) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;

        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/webp", quality);
        resolve(compressedBase64);
      };
    };

    reader.readAsDataURL(file);
  });
};
