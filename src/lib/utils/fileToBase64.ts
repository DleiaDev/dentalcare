export default function fileToBase64(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    if (typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    } else {
      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const base64Uri = `data:${file.type};base64,${base64}`;
      resolve(base64Uri);
    }
  });
}
