import React from "react";
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  FileAudio,
  FileVideo,
  File,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define the allowed file extensions
type FileExtension =
  // Documents
  | "pdf"
  | "doc"
  | "docx"
  | "txt"
  // Spreadsheets
  | "xls"
  | "xlsx"
  | "csv"

  // Media
  | "mp3"
  | "wav"
  | "mp4"
  | "mov"
  | "jpg"
  | "jpeg"
  | "png"
  | "gif";

export default function FilePreview({
  file,
  imageClassName,
  iconClassName,
}: {
  file: File;
  imageClassName?: string;
  iconClassName?: string;
}) {
  // Extract extension from filename or use MIME type
  const fileType = file.type;
  const extension = file.name.split(".").pop()?.toLowerCase() || fileType;

  // If it's an image and we have a preview URL, show the actual image
  if (file.type.startsWith("image/")) {
    return (
      /* eslint-disable @next/next/no-img-element */
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className={cn("w-full h-full object-cover", imageClassName)}
        onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
      />
    );
  }

  // For other file types, show an appropriate icon
  const iconProps = {
    className: iconClassName,
  };

  // Map file extensions to icons
  const iconMap: Record<FileExtension, JSX.Element> = {
    // Documents
    pdf: <FileText {...iconProps} />,
    doc: <FileText {...iconProps} />,
    docx: <FileText {...iconProps} />,
    txt: <FileText {...iconProps} />,

    // Spreadsheets
    xls: <FileSpreadsheet {...iconProps} />,
    xlsx: <FileSpreadsheet {...iconProps} />,
    csv: <FileSpreadsheet {...iconProps} />,

    // Media
    mp3: <FileAudio {...iconProps} />,
    wav: <FileAudio {...iconProps} />,
    mp4: <FileVideo {...iconProps} />,
    mov: <FileVideo {...iconProps} />,
    jpg: <FileImage {...iconProps} />,
    jpeg: <FileImage {...iconProps} />,
    png: <FileImage {...iconProps} />,
    gif: <FileImage {...iconProps} />,
  };

  return iconMap[extension as FileExtension] || <File {...iconProps} />;
}
