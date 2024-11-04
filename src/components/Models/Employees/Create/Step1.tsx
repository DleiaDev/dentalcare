"use client";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AvatarUpload from "@/components/Form/AvatarUpload";
import Button from "@/components/Button";
import RadioGroup from "@/components/Form/RadioGroup";
import { EmploymentTypeEnum } from "@/zod/utils/employmentType";
import TextInput from "@/components/Form/TextInput";
import Select from "@/components/Form/Select";

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
        if (!fileList || fileList?.length < 1) return z.NEVER;
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
    employmentType: EmploymentTypeEnum,
    name: z.string().min(2),
    profession: z.string(),
  });

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      employmentType: "FULL_TIME",
    },
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
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <AvatarUpload name="avatar" />
        <RadioGroup
          name="employmentType"
          label="Type"
          options={[
            { label: "Full-time", value: "FULL_TIME" },
            { label: "Part-time", value: "PART_TIME" },
          ]}
        />
        <TextInput name="name" label="Name" />
        <Select
          name="profession"
          label="Profession"
          placeholder="Select a profession"
          groups={[
            {
              label: "Clinical roles",
              options: [
                { label: "General Dentist", value: "General Dentist" },
                { label: "Oral Surgeon", value: "Oral Surgeon" },
                { label: "Orthodontist", value: "Orthodontist" },
                { label: "Endodontist", value: "Endodontist" },
                { label: "Periodontist", value: "Periodontist" },
                { label: "Prosthodontist", value: "Prosthodontist" },
                { label: "Pediatric Dentist", value: "Pediatric Dentist" },
                { label: "Dental Hygienist", value: "Dental Hygienist" },
                { label: "Dental Assistant", value: "Dental Assistant" },
                {
                  label: "Expanded Function Dental Assistant (EFDA)",
                  value: "Expanded Function Dental Assistant (EFDA)",
                },
                { label: "Oral Pathologist", value: "Oral Pathologist" },
                { label: "Oral Radiologist", value: "Oral Radiologist" },
                {
                  label: "Maxillofacial Surgeon",
                  value: "Maxillofacial Surgeon",
                },
                {
                  label: "Dental Anesthesiologist",
                  value: "Dental Anesthesiologist",
                },
                {
                  label: "Public Health Dentist",
                  value: "Public Health Dentist",
                },
                { label: "Geriatric Dentist", value: "Geriatric Dentist" },
              ],
            },
            {
              label: "Specialized Roles",
              options: [
                { label: "Implantologist", value: "Implantologist" },
                { label: "Cosmetic Dentist", value: "Cosmetic Dentist" },
                { label: "Laser Dentist", value: "Laser Dentist" },
                { label: "Sedation Dentist", value: "Sedation Dentist" },
                {
                  label: "Sleep Apnea Specialist",
                  value: "Sleep Apnea Specialist",
                },
                { label: "TMJ Specialist", value: "TMJ Specialist" },
                {
                  label: "Forensic Odontologist",
                  value: "Forensic Odontologist",
                },
              ],
            },
            {
              label: "Administrative Roles",
              options: [
                { label: "Office Manager", value: "Office Manager" },
                { label: "Receptionist", value: "Receptionist" },
                { label: "Patient Coordinator", value: "Patient Coordinator" },
                { label: "Billing Specialist", value: "Billing Specialist" },
                {
                  label: "Insurance Coordinator",
                  value: "Insurance Coordinator",
                },
                {
                  label: "Dental Clinic Administrator",
                  value: "Dental Clinic Administrator",
                },
                { label: "Practice Manager", value: "Practice Manager" },
                {
                  label: "Appointment Scheduler",
                  value: "Appointment Scheduler",
                },
                {
                  label: "Front Desk Coordinator",
                  value: "Front Desk Coordinator",
                },
              ],
            },
            {
              label: "Support Staff",
              options: [
                {
                  label: "Sterilization Technician",
                  value: "Sterilization Technician",
                },
                { label: "Lab Technician", value: "Lab Technician" },
                {
                  label: "Dental Laboratory Manager",
                  value: "Dental Laboratory Manager",
                },
                {
                  label: "Dental Supply Coordinator",
                  value: "Dental Supply Coordinator",
                },
                {
                  label: "Equipment Technician",
                  value: "Equipment Technician",
                },
              ],
            },
            {
              label: "Marketing & Outreach Roles",
              options: [
                {
                  label: "Patient Outreach Coordinator",
                  value: "Patient Outreach Coordinator",
                },
                {
                  label: "Community Health Specialist",
                  value: "Community Health Specialist",
                },
                {
                  label: "Dental Clinic Marketing Specialist",
                  value: "Dental Clinic Marketing Specialist",
                },
                {
                  label: "Patient Experience Manager",
                  value: "Patient Experience Manager",
                },
                {
                  label: "Social Media Coordinator",
                  value: "Social Media Coordinator",
                },
              ],
            },
            {
              label: "IT and Technical Support",
              options: [
                {
                  label: "Dental IT Specialist",
                  value: "Dental IT Specialist",
                },
                {
                  label: "Radiology Technician",
                  value: "Radiology Technician",
                },
                {
                  label: "Digital Imaging Specialist",
                  value: "Digital Imaging Specialist",
                },
              ],
            },
          ]}
        />
        <Button type="submit">Next</Button>
      </form>
    </FormProvider>
  );
}
