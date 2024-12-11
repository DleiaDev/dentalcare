import { publicProcedure, router } from "../trpc";

export const peripheralsRouter = router({
  getAllTags: publicProcedure.query(async () => {
    return [
      {
        id: "4a3d59b3-67c3-4b29-b0f6-06bcf6b91b24",
        name: "Dental",
        updatedAt: new Date("2024-01-07"),
        createdAt: new Date("2024-01-07"),
      },
      {
        id: "d63b9a4d-a848-4b76-bbe6-984ea87ca832",
        name: "Tools",
        updatedAt: new Date("2024-01-07"),
        createdAt: new Date("2024-01-07"),
      },
      {
        id: "ef29df6d-a300-449e-944d-38e4f6bcf5d5",
        name: "Scaling",
        updatedAt: new Date("2024-01-07"),
        createdAt: new Date("2024-01-07"),
      },
      {
        id: "e892375f-4722-42a4-94dd-1bcf17a6c87a",
        name: "Cosmetic",
        updatedAt: new Date("2024-01-07"),
        createdAt: new Date("2024-01-07"),
      },
      {
        id: "8cdfca36-3768-488e-bcd7-4159b74509f5",
        name: "Surgeries",
        updatedAt: new Date("2024-01-07"),
        createdAt: new Date("2024-01-07"),
      },
    ];
  }),
});
