import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "./validationSchemas";
import { useMyContext } from "./MyContext";

type FormField = {
  gender: string;
  country: string;
  hobbies: string[];
  contactMethod: string;
};

const Step2 = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const {formData,setFormData} = useMyContext()
  console.log(formData)

  const defaultValues = {
    gender: formData.gender,
    country: formData.country,
    hobbies: formData.hobbies,
    contactMethod: formData.contactMethod,
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormField>({ resolver: zodResolver(step2Schema), defaultValues });

  const onSubmit: SubmitHandler<FormField> = (data) => {
    // console.log("Success : ", data);
    setFormData((item:any) => ({ ...item, ...data }));
    nextStep();
  };

  const onError: SubmitErrorHandler<FormField> = (data) => {
    console.log("ERRORS : ", data);
  };

  const handlePrev = () => {
    const values = getValues();
    setFormData((item:any) => ({ ...item, ...values }));
    prevStep();
  }

  const genderList = ["Male", "Female", "Other"];
  const hobbiesList = ["Reading", "Sports", "Music", "Travel"];

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <fieldset className="custom-fieldset">
        <legend>Gender</legend>
        <div className="flex">
          {genderList.map((gender) => (
            <div key={gender}>
              <input
                type="radio"
                {...register("gender")}
                id={gender}
                value={gender}
                className={`${
                  errors.gender ? "custom-input-error" : "custom-input"
                }`}
              />
              <label htmlFor={gender} className="ml-1 mr-3">
                {gender}
              </label>
            </div>
          ))}
        </div>

        {errors.gender && (
          <p className="custom-error">{errors.gender.message}</p>
        )}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Country</legend>
        <select
          {...register("country")}
          className={`${
            errors.country ? "custom-input-error" : "custom-input"
          }`}
        >
          <option value="">Select</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Germany">Germany</option>
        </select>
        {errors.country && (
          <p className="custom-error">{errors.country.message}</p>
        )}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Hobbies</legend>
        <div className="flex">
          {hobbiesList.map((hobby) => (
            <div key={hobby}>
              <input
                type="checkbox"
                id={hobby}
                value={hobby}
                {...register("hobbies")}
                className={`${
                  errors.hobbies ? "custom-input-error" : "custom-input"
                }`}
              />
              <label htmlFor={hobby} className="ml-1 mr-3">
                {hobby}
              </label>
            </div>
          ))}
        </div>

        {errors.hobbies && (
          <p className="custom-error">{errors.hobbies.message}</p>
        )}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Contact Method</legend>
        <select
          {...register("contactMethod")}
          className={`${
            errors.contactMethod ? "custom-input-error" : "custom-input"
          }`}
        >
          <option value="">Select</option>
          <option value="Phone">Phone</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Email">Email</option>
        </select>
        {errors.contactMethod && (
          <p className="custom-error">{errors.contactMethod.message}</p>
        )}
      </fieldset>

      <div className="flex items-center justify-between mt-6">
        <button onClick={handlePrev} className="bg-blue-500 px-5 py-1 rounded-lg text-zinc-100">Prev</button>
        <input
          type="submit"
          value="Next"
          className="bg-blue-500 px-5 py-1 rounded-lg text-zinc-100 cursor-pointer"
        />
      </div>
    </form>
  );
};

export default Step2;
