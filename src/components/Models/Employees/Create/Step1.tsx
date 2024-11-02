"use client";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import AvatarUpload from "@/components/Form/AvatarUpload";
import Button from "@/components/Button";

type Props = {
  //
};

const MAXIMUM_MB = 5;
const MAXIMUM_SIZE = MAXIMUM_MB * 1000000;

export default function Step1({}: Props) {
  const schema = z.object({
    avatar: z
      .instanceof(FileList)
      .optional()
      .superRefine((fileList, ctx) => {
        if (!fileList) return z.NEVER;
        if (fileList.length < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File list is empty",
          });
          return z.NEVER;
        }
        if (fileList.length > 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File list contains more then 1 file",
          });
          return z.NEVER;
        }
        const [file] = fileList;
        if (file.size > MAXIMUM_SIZE)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File is too large, the limit is ${MAXIMUM_MB}MB`,
          });
      }),
  });

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = methods.handleSubmit(
    (data) => {
      console.log(data);
    },
    (errors) => {
      console.log(errors);
    },
  );

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <AvatarUpload name="avatar" />
          <Button type="submit" className="mt-10">
            Next
          </Button>
        </form>
      </FormProvider>
      <DevTool control={methods.control} placement="bottom-left" />
    </>
  );
}
