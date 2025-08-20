import z from "zod";

export const step1Schema = z.object({
  name: z.string().trim().min(3, "Name must have at least 3 characters"),
  email: z.email({
    pattern: z.regexes.email,
    message: "Invalid email address",
  }),
  phone: z
    .string()
    .regex(/^\d+$/, { message: "Must number" })
    .length(10, "Must 10"),
  dob: z.string().nonempty({ message: "Require date" }),
});

export const step2Schema = z.object({
  gender: z.string().min(1, "Gender is require"),
  country: z.string().min(1, "Country is require"),
  hobbies: z
    .array(z.string())
    .min(1, { message: "Please select at least one hobby" }),
  contactMethod: z.string().min(1, "Contact Method is require"),
});

export const step3Schema = z
  .object({
    photo: z.any().refine((files) => files?.length === 1, "Image is required."),
    time: z.string().nonempty({ message: "Require time" }),
    date: z.string().nonempty({ message: "Require date" }),
    prof: z.string().min(1, "Select any one"),
    company: z.string().trim().optional(),
  })
  .refine(
    (input) => {
      if (input.prof == "Fresher") return true;
      return false;
    },
    {
      message: "Company is required field",
      path: ["company"],
    }
  );
