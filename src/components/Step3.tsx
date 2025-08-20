import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { step3Schema } from "./validationSchemas";
import { useMyContext } from "./MyContext";

type FormField = {
  photo: FileList;
  time: string;
  date: string;
  prof: string;
  company?: string;
};

const Step3 = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { formData, setFormData } = useMyContext();

  const defaultValues = {
    photo: formData.photo,
    time: formData.time,
    date: formData.date,
    prof: formData.prof,
    company: formData.company,
  };

  const {
    handleSubmit,
    register,
    watch,
    resetField,
    getValues,
    formState: { errors },
  } = useForm<FormField>({
    resolver: zodResolver(step3Schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormField> = (data) => {
    // console.log(data);
    setFormData((item: any) => ({ ...item, ...data }));
    nextStep();
  };

  const onError: SubmitErrorHandler<FormField> = (err) => {
    console.log(err);
  };

  const handlePrev = () => {
    const values = getValues();
    setFormData((item:any) => ({ ...item, ...values }));
    prevStep();
  }

  const profList = ["Fresher", "Experience"];
  const profWatched = watch("prof");

  useEffect(() => {
    if (profWatched == "Fresher") resetField("company");
  }, [profWatched]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <fieldset className="custom-fieldset">
        <legend>Select your photo</legend>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          {...register("photo")}
          className={`${errors.photo ? "custom-input-error" : "custom-input"}`}
        />
        {errors.photo && <p className="custom-error">{errors.photo.message}</p>}
      </fieldset>

      <div className="flex">
        <fieldset className="custom-fieldset">
          <legend>Time Availability</legend>
          <input
            type="time"
            {...register("time")}
            className={`${errors.time ? "custom-input-error" : "custom-input"}`}
          />
          {errors.time && <p className="custom-error">{errors.time.message}</p>}
        </fieldset>

        <fieldset className="custom-fieldset">
          <legend>Date Availability</legend>
          <input
            type="date"
            {...register("date")}
            className={`${errors.date ? "custom-input-error" : "custom-input"}`}
          />
          {errors.date && <p className="custom-error">{errors.date.message}</p>}
        </fieldset>
      </div>

      <fieldset className="custom-fieldset">
        <legend>What describes your professional status?</legend>
        <div className="flex">
          {profList.map((prof) => (
            <div key={prof}>
              <input
                type="radio"
                {...register("prof")}
                id={prof}
                value={prof}
                className={`${
                  errors.prof ? "custom-input-error" : "custom-input"
                }`}
              />
              <label htmlFor={prof} className="ml-1 mr-3">
                {prof}
              </label>
            </div>
          ))}
        </div>

        {errors.prof && <p className="custom-error">{errors.prof.message}</p>}
      </fieldset>

      {profWatched == "Experience" && (
        <fieldset className="custom-fieldset">
          <legend>Company</legend>
          <input
            {...register("company")}
            className={`${
              errors.company ? "custom-input-error" : "custom-input"
            }`}
          />
          {errors.company && (
            <p className="custom-error">{errors.company.message}</p>
          )}
        </fieldset>
      )}

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrev}
          className="bg-blue-500 px-5 py-1 rounded-lg text-zinc-100"
        >
          Prev
        </button>
        <input
          type="submit"
          value="Submit"
          className="bg-blue-500 px-5 py-1 rounded-lg text-zinc-100 cursor-pointer"
        />
      </div>
    </form>
  );
};

export default Step3;
