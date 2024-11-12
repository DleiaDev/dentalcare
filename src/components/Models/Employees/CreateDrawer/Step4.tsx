import { Clinic } from "@/zod/Clinic";

export type Data = {};

type Props = {
  formId?: string;
  data?: Data;
  clinic: Clinic;
  onFinish: (data: Data) => void;
};

export default function Step4(props: Props) {
  return (
    <div>
      <div>This is step 4</div>
    </div>
  );
}
