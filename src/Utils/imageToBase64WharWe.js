// utils/imageToBase64.js
export const compressImageToWebpBase64 = (file, maxWidth = 100, quality = 0.3) => {
  // maxWidth: smaller => smaller size
  // quality: lower => smaller size
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, maxWidth / img.width);

        canvas.width = img.width * scale;
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
