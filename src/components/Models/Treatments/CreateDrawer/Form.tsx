import { CreateTreatmentFormData } from "@/zod/Treatment";

type Props = {
  formId?: string;
  data?: CreateTreatmentFormData;
  onFinish: (data: CreateTreatmentFormData) => void;
};

export default function Create({ formId, data, onFinish }: Props) {
  return (
    <div className="flex flex-col gap-14">
      <div>This is the form</div>
    </div>
  );
}
