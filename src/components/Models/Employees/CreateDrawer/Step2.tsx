import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import CheckboxList from "@/components/Form/CheckboxList";

// prettier-ignore
const groups = [
  {
    id: 1,
    name: 'Cosmetic Services',
    services: [
      { id: 101, name: 'Teeth Whitening', description: '(in-office and take-home kits)' },
      { id: 102, name: 'Dental Veneers', description: '(porcelain and composite)' },
      { id: 103, name: 'Dental Bonding', description: '' },
      { id: 104, name: 'Dental Crowns', description: '(cosmetic crowns for aesthetic improvements)' },
      { id: 105, name: 'Inlays and Onlays', description: '' },
      { id: 106, name: 'Dental Implants', description: '(single tooth, multiple teeth, full arch)' },
      { id: 107, name: 'Orthodontics', description: '(clear aligners, traditional braces)' },
      { id: 108, name: 'Gum Contouring', description: '(for improved gum appearance)' }
    ]
  },
  {
    id: 2,
    name: 'Restorative Services',
    services: [
      { id: 201, name: 'Dental Fillings', description: '(composite and amalgam)' },
      { id: 202, name: 'Dental Bridges', description: '' },
      { id: 203, name: 'Dental Crowns', description: '(for damage repair)' },
      { id: 204, name: 'Dental Implants', description: '(for tooth replacement)' },
      { id: 205, name: 'Dentures', description: '(full and partial)' },
      { id: 206, name: 'Tooth Extractions', description: '(including wisdom teeth)' },
      { id: 207, name: 'Bone Grafting', description: '(for implant preparation)' }
    ]
  },
  {
    id: 3,
    name: 'Treatment Services',
    services: [
      { id: 301, name: 'Root Canal Treatment', description: '' },
      { id: 302, name: 'Periodontal Therapy', description: '(for gum disease)' },
      { id: 303, name: 'TMJ/TMD Therapy', description: '(for jaw pain and disorders)' },
      { id: 304, name: 'Oral Surgery', description: '(extraction and lesion removal)' },
      { id: 305, name: 'Endodontics', description: '(advanced root canal procedures)' },
      { id: 306, name: 'Pulp Capping', description: '(for exposed tooth pulp)' },
      { id: 307, name: 'Emergency Dental Care', description: '(pain relief, abscess drainage, etc.)' }
    ]
  },
  {
    id: 4,
    name: 'Preventive Services',
    services: [
      { id: 401, name: 'Dental Cleanings', description: '(routine and deep cleaning)' },
      { id: 402, name: 'Oral Exams', description: '(routine check-ups)' },
      { id: 403, name: 'Dental Sealants', description: '(for cavity prevention)' },
      { id: 404, name: 'Fluoride Treatments', description: '(to strengthen teeth)' },
      { id: 405, name: 'Oral Cancer Screening', description: '' },
      { id: 406, name: 'X-rays and Digital Imaging', description: '' },
      { id: 407, name: 'Mouthguards', description: '(sports and night guards for grinding)' }
    ]
  },
  {
    id: 5,
    name: 'Orthodontic Services',
    services: [
      { id: 501, name: 'Traditional Braces', description: '(metal and ceramic)' },
      { id: 502, name: 'Clear Aligners', description: '(Invisalign, ClearCorrect)' },
      { id: 503, name: 'Retainers', description: '(post-treatment retainers)' },
      { id: 504, name: 'Space Maintainers', description: '(for children)' }
    ]
  },
  {
    id: 6,
    name: 'Pediatric Services',
    services: [
      { id: 601, name: 'Pediatric Cleanings and Exams', description: '' },
      { id: 602, name: 'Fluoride Treatments and Sealants', description: '(for children)' },
      { id: 603, name: 'Space Maintainers', description: '(preventing crowding)' },
      { id: 604, name: 'Pediatric Fillings', description: '' },
      { id: 605, name: 'Early Orthodontic Evaluations', description: '' }
    ]
  }
];

const schema = z.object({
  services: z.number().array(),
});

export type Data = z.infer<typeof schema>;

type Props = {
  formId?: string;
  data?: Data;
  onFinish: (form: Data) => void;
};

export default function Step2({ formId, data, onFinish }: Props) {
  const methods = useForm<Data>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: data ?? { services: [] },
  });

  const onSubmit = methods.handleSubmit(onFinish);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        id={formId}
        className="flex flex-col gap-4 animate-in fade-in duration-500"
      >
        {groups.map((group) => (
          <CheckboxList
            key={group.id}
            name="services"
            title={group.name}
            checkboxes={group.services.map((service) => ({
              value: service.id,
              label: service.name,
            }))}
          />
        ))}
      </form>
    </FormProvider>
  );
}
