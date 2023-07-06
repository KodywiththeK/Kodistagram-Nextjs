export async function urlToFileData(url:string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], 'image.webp', { type: blob.type });

  return file;
}