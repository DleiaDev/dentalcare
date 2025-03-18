"use server";

import { UploadApiOptions } from "cloudinary";
import cloudinary from "../cloudinary";
import fileToBase64 from "./fileToBase64";

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
