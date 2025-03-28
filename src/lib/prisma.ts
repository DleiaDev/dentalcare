import { PrismaClient } from "@prisma/client";
import deleteFiles from "./utils/deleteFiles";

const prismaClientSingleton = () => {
  const client = new PrismaClient().$extends({
    query: {
      // peripheralAttachment: {
      //   async deleteMany({ args, query }) {
      //     const fileIds = await client.peripheralAttachment
      //       .findMany(args)
      //       .then((rows) => rows.map((r) => r.fileId));
      //
      //     console.log(fileIds);
      //
      //     const res = await query(args);
      //
      //     if (fileIds.length > 0)
      //       await deleteFiles(fileIds, {
      //         type: "upload",
      //         resourceType: "image",
      //       });
      //
      //     return res;
      //   },
      // },
    },
  });

  return client;
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
