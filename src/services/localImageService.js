// Reduz a foto antes de guardá-la neste navegador, sem enviar a terceiros.
export const saveImageLocally = async (file) => {
  if (!file) throw new Error('Selecione uma imagem.');
  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * ratio);
  canvas.height = Math.round(bitmap.height * ratio);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/jpeg', 0.68);
};
