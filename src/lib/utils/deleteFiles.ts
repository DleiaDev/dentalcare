"use server";

import { ResourceApiOptions } from "cloudinary";
import cloudinary from "../cloudinary";

type Options = {
  type: Exclude<ResourceApiOptions["type"], undefined>;
  resourceType: Exclude<ResourceApiOptions["resource_type"], undefined>;
};

export default async function deleteFiles(
  id: string | string[],
  options: Options,
) {
  const ids = typeof id === "string" ? [id] : id;
  return cloudinary.api.delete_resources(ids, {
    type: options.type,
    resource_type: options.resourceType,
  });
}
