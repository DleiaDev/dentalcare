const map = {
  "image/png": true,
  "image/jpeg": true,
  "image/webp": true,
  "image/avif": true,
} as Record<string, true>;

export default function isImage(file: File) {
  return map[file.type] !== undefined;
}
