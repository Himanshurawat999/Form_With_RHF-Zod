import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "./validationSchemas";
import { useMyContext } from "./MyContext";

type FormField = {
  name: string;
  email: string;
  phone: string;
  dob: string;
};

const Step1 = ({ nextStep }: { nextStep: () => void }) => {
  const { formData, setFormData } = useMyContext();

  const defaultValues = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    dob: formData.dob,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    resolver: zodResolver(step1Schema),
    defaultValues,
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormField> = (data) => {
    // console.log(data);
    setFormData((item: any) => ({ ...item, ...data }));
    nextStep();
  };

  const onError: SubmitErrorHandler<FormField> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <fieldset className="custom-fieldset">
        <legend>Full Name</legend>
        <input
          {...register("name")}
          className={`${errors.name ? "custom-input-error" : "custom-input"}`}
        />
        {errors.name && <p className="custom-error">{errors.name.message}</p>}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Email</legend>
        <input
          {...register("email")}
          className={`${errors.email ? "custom-input-error" : "custom-input"}`}
        />
        {errors.email && <p className="custom-error">{errors.email.message}</p>}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Phone No.</legend>
        <input
          type="tel"
          {...register("phone")}
          className={`${errors.phone ? "custom-input-error" : "custom-input"}`}
        />
        {errors.phone && <p className="custom-error">{errors.phone.message}</p>}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>DOB</legend>
        <input
          type="date"
          {...register("dob")}
          className={`${errors.dob ? "custom-input-error" : "custom-input"}`}
        />
        {errors.dob && <p className="custom-error">{errors.dob.message}</p>}
      </fieldset>

      <input
        type="submit"
        value="Next"
        className="bg-blue-500 px-5 py-1 rounded-lg text-zinc-100 cursor-pointer"
      />
    </form>
  );
};

export default Step1;
