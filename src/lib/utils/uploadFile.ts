"use server";

import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import fileToBase64 from "./fileToBase64";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Options = {
  folder: Exclude<UploadApiOptions["folder"], undefined>;
};

export default async function uploadFile(file: File, options: Options) {
  const base64 = await fileToBase64(file);
  const result = await cloudinary.uploader.upload(base64, {
    folder: options.folder,
    use_asset_folder_as_public_id_prefix: true,
    resource_type: "auto",
  });

  return result.public_id;
}
